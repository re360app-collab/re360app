import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Clock, TrendingUp, CheckCircle, DollarSign, Users } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, colorClass, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white rounded-xl p-5 sm:p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs sm:text-sm font-medium text-gray-600">{title}</p>
        <p className={`text-2xl sm:text-3xl font-bold ${colorClass}`}>{value}</p>
      </div>
      <div className={`p-2 sm:p-3 rounded-full bg-opacity-10 ${colorClass.replace('text-', 'bg-')}`}>
        <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${colorClass}`} />
      </div>
    </div>
  </motion.div>
);

const AdminLoansStatsGrid = ({ stats }) => {
  const statItems = [
    { title: 'Total Loans', value: stats.totalLoans, icon: FileText, colorClass: 'text-blue-600', delay: 0 },
    { title: 'Pending', value: stats.pendingLoans, icon: Clock, colorClass: 'text-yellow-500', delay: 0.1 },
    { title: 'In Progress', value: stats.inProgressLoans, icon: TrendingUp, colorClass: 'text-indigo-600', delay: 0.2 },
    { title: 'Completed', value: stats.completedLoans, icon: CheckCircle, colorClass: 'text-green-600', delay: 0.3 },
    { title: 'Total Value', value: `$${(stats.totalValue / 1000000).toFixed(1)}M`, icon: DollarSign, colorClass: 'text-teal-600', delay: 0.4 },
    { title: 'Active Realtors', value: stats.activeRealtors, icon: Users, colorClass: 'text-purple-600', delay: 0.5 },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 mb-8">
      {statItems.map(item => (
        <StatCard key={item.title} {...item} />
      ))}
    </div>
  );
};

export default AdminLoansStatsGrid;