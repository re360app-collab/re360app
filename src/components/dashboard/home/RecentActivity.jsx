import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { coursesData } from '@/data/learningCourses';
import { Calendar, CheckCircle, BookOpen, UserPlus, FileText, MessageSquarePlus, MessageSquare as MessageSquareText } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const timeAgo = (date) => {
  if (!date) return '';
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
};

const ActivitySkeleton = () => (
  Array.from({ length: 4 }).map((_, index) => (
    <div key={index} className="flex items-start space-x-4 animate-pulse">
      <div className="w-8 h-8 bg-gray-200 dark:bg-slate-700 rounded-full flex-shrink-0"></div>
      <div className="flex-1 min-w-0 space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-slate-600 rounded w-3/4"></div>
        <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-1/4"></div>
      </div>
    </div>
  ))
);

const RecentActivity = () => {
  const { user, userProfile } = useAuth();
  const { toast } = useToast();
  const [recentActivity, setRecentActivity] = useState([]);
  const [loadingActivity, setLoadingActivity] = useState(true);

  const fetchRecentActivity = useCallback(async () => {
    if (!user || !userProfile) return;
    setLoadingActivity(true);

    try {
      let allActivities = [];
      const isAdmin = userProfile.position === 'System Admin' || userProfile.position === 'NMB Admin';

      if (isAdmin) {
        const { data: newLeads, error: leadsError } = await supabase
          .from('realestateleads')
          .select('id, created_at, buyer_first_name, buyer_last_name')
          .order('created_at', { ascending: false })
          .limit(3);
        if (leadsError) throw leadsError;

        const { data: newRegistrations, error: regError } = await supabase
          .from('agent_registrations')
          .select('id, created_at, first_name, last_name')
          .order('created_at', { ascending: false })
          .limit(3);
        if (regError) throw regError;
        
        const { data: newMessages, error: messagesError } = await supabase
          .from('sms_messages')
          .select('id, created_at, phone, body, direction')
          .order('created_at', { ascending: false })
          .limit(5);
        if (messagesError) throw messagesError;

        const formattedLeads = newLeads.map(l => ({
          type: 'lead',
          action: `New lead: ${l.buyer_first_name} ${l.buyer_last_name}`,
          time: new Date(l.created_at),
          icon: FileText
        }));

        const formattedRegistrations = newRegistrations.map(r => ({
          type: 'registration',
          action: `New realtor: ${r.first_name} ${r.last_name}`,
          time: new Date(r.created_at),
          icon: UserPlus
        }));
        
        const formattedMessages = newMessages.map(m => ({
          type: 'message',
          action: `SMS ${m.direction === 'in' ? 'from' : 'to'} ${m.phone}: "${(m.body || '').slice(0, 30)}..."`,
          time: new Date(m.created_at),
          icon: m.direction === 'in' ? MessageSquarePlus : MessageSquareText
        }));

        allActivities = [...formattedLeads, ...formattedRegistrations, ...formattedMessages];
      } else {
        const { data: appointments, error: appointmentsError } = await supabase
          .from('appointments')
          .select('title, created_at')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })
          .limit(3);
        if (appointmentsError) throw appointmentsError;

        const { data: buyers, error: buyersError } = await supabase
          .from('buyers')
          .select('first_name, last_name, updated_at')
          .eq('agent_id', user.id)
          .eq('status', 'Pre-approved')
          .order('updated_at', { ascending: false })
          .limit(3);
        if (buyersError) throw buyersError;

        const { data: learning, error: learningError } = await supabase
          .from('learning_progress')
          .select('course_id, completed_date')
          .eq('user_id', user.id)
          .eq('completed', true)
          .not('completed_date', 'is', null)
          .order('completed_date', { ascending: false })
          .limit(3);
        if (learningError) throw learningError;

        const formattedAppointments = appointments.map(a => ({
          type: 'appointment',
          action: `Scheduled: ${a.title}`,
          time: new Date(a.created_at),
          icon: Calendar,
        }));

        const formattedBuyers = buyers.map(b => ({
          type: 'buyer',
          action: `Qualified buyer: ${b.first_name} ${b.last_name}`,
          time: new Date(b.updated_at),
          icon: CheckCircle,
        }));

        const formattedLearning = learning.map(l => {
          const course = coursesData.find(c => c.id === l.course_id);
          return {
            type: 'learning',
            action: `Completed: ${course ? course.title : 'a course'}`,
            time: new Date(l.completed_date),
            icon: BookOpen,
          };
        });
        
        allActivities = [...formattedAppointments, ...formattedBuyers, ...formattedLearning];
      }

      const sortedActivities = allActivities
        .sort((a, b) => b.time - a.time)
        .slice(0, 5);

      setRecentActivity(sortedActivities);

    } catch (error) {
      console.error("Error fetching recent activity:", error);
      toast({
        title: "Could not load recent activity",
        description: "There was an issue fetching your recent activity data.",
        variant: "destructive",
      });
    } finally {
      setLoadingActivity(false);
    }
  }, [user, userProfile, toast]);

  useEffect(() => {
    if (user && userProfile) {
      fetchRecentActivity();
    }
  }, [user, userProfile, fetchRecentActivity]);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg h-full">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Recent Activity</h2>
      <div className="space-y-4">
        {loadingActivity ? (
          <ActivitySkeleton />
        ) : recentActivity.length > 0 ? (
          recentActivity.map((activity, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                <activity.icon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.action}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{timeAgo(activity.time)}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 dark:text-gray-400 text-sm">No recent activity to display.</p>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;