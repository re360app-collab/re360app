import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import { Bell } from 'lucide-react';

const UpcomingReminders = ({ user }) => {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] = useState(true);

  useEffect(() => {
    const fetchUpcomingAppointments = async () => {
      if (user) {
        setLoadingAppointments(true);
        const now = new Date();
        const inOneWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

        const { data, error } = await supabase
          .from('appointments')
          .select(`
            id,
            title,
            appointment_date,
            realestateleads (buyer_first_name, buyer_last_name),
            agent_registrations (first_name, last_name)
          `)
          .eq('user_id', user.id)
          .gt('appointment_date', now.toISOString())
          .lt('appointment_date', inOneWeek.toISOString())
          .order('appointment_date', { ascending: true })
          .limit(3);

        if (error) {
          console.error("Error fetching upcoming appointments:", error);
        } else {
          setUpcomingAppointments(data || []);
        }
        setLoadingAppointments(false);
      }
    };
    fetchUpcomingAppointments();
  }, [user]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <Bell className="w-6 h-6 mr-3 text-purple-600" />
        Upcoming Reminders
      </h2>
      {loadingAppointments ? (
        <p className="text-gray-500 dark:text-gray-400">Loading reminders...</p>
      ) : upcomingAppointments.length > 0 ? (
        <div className="space-y-4">
          {upcomingAppointments.map(apt => {
            const aptDate = new Date(apt.appointment_date);
            const clientName = apt.realestateleads ? `${apt.realestateleads.buyer_first_name} ${apt.realestateleads.buyer_last_name}` :
                               apt.agent_registrations ? `${apt.agent_registrations.first_name} ${apt.agent_registrations.last_name}` :
                               '';
            return (
              <div key={apt.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white">{apt.title}</p>
                  {clientName && <p className="text-sm text-gray-600 dark:text-gray-400">With: {clientName}</p>}
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <p className="font-medium text-purple-600 dark:text-purple-400">{aptDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{aptDate.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No appointments in the next 7 days.</p>
      )}
    </motion.div>
  );
};

export default UpcomingReminders;