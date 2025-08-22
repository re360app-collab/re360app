import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { getDashboardStats } from '@/lib/dashboard';
import { fetchNewAgentRegistrationsCount } from '@/lib/agentRegistrations';
import { getUnreadMessagesCount } from '@/lib/contact';
import { Users, CheckCircle, Calendar, BookOpen, UserPlus, MessageSquare } from 'lucide-react';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const StatCardSkeleton = () => (
  <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg animate-pulse">
    <div className="flex items-center justify-between">
      <div>
        <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
        <div className="h-8 bg-gray-300 dark:bg-slate-600 rounded w-1/2 mt-1"></div>
      </div>
      <div className="w-12 h-12 bg-gray-200 dark:bg-slate-700 rounded-lg"></div>
    </div>
  </div>
);

const StatCardsGrid = ({ onActionClick }) => {
  const { user, userProfile, supabase } = useAuth();
  const [stats, setStats] = useState({
    activeLeads: 0,
    qualifiedBuyers: 0,
    upcomingAppointments: 0,
    learningProgress: '0%',
  });
  const [newRealtorLeads, setNewRealtorLeads] = useState(0);
  const [newMessagesCount, setNewMessagesCount] = useState(0);
  const [loadingStats, setLoadingStats] = useState(true);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const isAdmin = userProfile?.position === 'System Admin' || userProfile?.position === 'NMB Admin';

  const fetchAdminStats = useCallback(async () => {
    if (!supabase) return;
    const promises = [
      getDashboardStats(user.id, userProfile),
      getUnreadMessagesCount(supabase),
      fetchNewAgentRegistrationsCount(supabase)
    ];

    const [dashboardData, unreadMessagesData, newAgentsData] = await Promise.all(promises);

    if (dashboardData) {
      setStats(dashboardData);
    }
    if (unreadMessagesData && !unreadMessagesData.error) {
      setNewMessagesCount(unreadMessagesData.count);
    }
    if (newAgentsData && !newAgentsData.error) {
      setNewRealtorLeads(newAgentsData.count);
    }
  }, [user, userProfile, supabase]);

  const fetchUserStats = useCallback(async () => {
    const data = await getDashboardStats(user.id, userProfile);
    if (data) {
      setStats(data);
    }
  }, [user, userProfile]);

  useEffect(() => {
    const fetchAllStats = async () => {
      if (user && userProfile && supabase) {
        setLoadingStats(true);
        if (isAdmin) {
          await fetchAdminStats();
        } else {
          await fetchUserStats();
        }
        setLoadingStats(false);
      }
    };
    fetchAllStats();
  }, [user, userProfile, isAdmin, supabase, fetchAdminStats, fetchUserStats]);


  const isLoanOfficer = userProfile?.position === 'Loan Officer';

  const statLinks = {
    activeLeads: isAdmin ? 'leads' : isLoanOfficer ? 'assigned-leads' : 'qualify-buyers',
    qualifiedBuyers: 'qualify-buyers',
    upcomingAppointments: 'calendar',
    learningProgress: 'learning',
    newRealtorLeads: 'realtor-leads',
    newMessages: 'inbox',
  };

  const baseStats = [
    { id: 'activeLeads', label: 'Active Leads', value: stats.activeLeads, icon: Users, color: 'bg-blue-500', action: statLinks.activeLeads },
    { id: 'qualifiedBuyers', label: 'Qualified Buyers', value: stats.qualifiedBuyers, icon: CheckCircle, color: 'bg-green-500', action: statLinks.qualifiedBuyers },
    { id: 'upcomingAppointments', label: 'Upcoming Appointments', value: stats.upcomingAppointments, icon: Calendar, color: 'bg-purple-500', action: statLinks.upcomingAppointments },
    { id: 'learningProgress', label: 'Learning Progress', value: stats.learningProgress, icon: BookOpen, color: 'bg-orange-500', action: statLinks.learningProgress },
  ];
  
  const adminStatsList = [
      { id: 'newRealtorLeads', label: 'New Realtor Leads', value: newRealtorLeads, icon: UserPlus, color: 'bg-teal-500', action: statLinks.newRealtorLeads },
      { id: 'newMessages', label: 'New Inbox Messages', value: newMessagesCount, icon: MessageSquare, color: 'bg-pink-500', action: statLinks.newMessages },
      ...baseStats.filter(s => s.id === 'activeLeads' || s.id === 'qualifiedBuyers')
  ];

  let statData;

  if (isAdmin) {
      if (isMobile) {
        statData = adminStatsList.filter(s => ['newRealtorLeads', 'newMessages', 'activeLeads'].includes(s.id));
      } else {
        statData = adminStatsList.filter(s => s.id !== 'learningProgress' && s.id !== 'upcomingAppointments');
      }
  } else {
      statData = baseStats;
  }
  

  const gridColsClass = `grid-cols-1 md:grid-cols-2 ${isAdmin && !isMobile ? 'lg:grid-cols-4' : 'lg:grid-cols-4'}`;

  return (
    <div className={`grid ${gridColsClass} gap-6`}>
      {loadingStats ? (
        Array.from({ length: isAdmin ? (isMobile ? 3 : 4) : 4 }).map((_, index) => <StatCardSkeleton key={index} />)
      ) : (
        statData.map((stat, index) => (
          <motion.div
            key={stat.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl dark:hover:shadow-slate-700/50 transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
            onClick={() => onActionClick(stat.action)}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
};

export default StatCardsGrid;