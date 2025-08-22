import React from 'react';
import { motion } from 'framer-motion';
import { User, Award, Building2, Share2 } from 'lucide-react';

const ProfileStats = () => {
  const stats = [
    { label: 'Buyers Qualified', value: '12', icon: User },
    { label: 'Courses Completed', value: '8', icon: Award },
    { label: 'Days Active', value: '45', icon: Building2 },
    { label: 'Profile Views', value: '156', icon: Share2 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-xl p-6 shadow-lg"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-6">Your Stats</h3>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <Icon className="text-blue-600" size={24} />
              </div>
              <h4 className="text-2xl font-bold text-gray-900">{stat.value}</h4>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ProfileStats;