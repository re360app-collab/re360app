import React from 'react';
import { motion } from 'framer-motion';
import { Target } from 'lucide-react';

const goalLabels = {
  becomeLoanOfficer: 'Become Loan Officer',
  increaseClosings: 'Increase Closings',
  growTeam: 'Grow Team'
};

const GoalsProgress = ({ userProfile }) => {
  const isAdmin = userProfile?.position === 'System Admin' || userProfile?.position === 'NMB Admin';

  if (isAdmin) {
    return null;
  }

  const hasGoals = userProfile?.goals && Object.values(userProfile.goals).some(value => value);

  if (!hasGoals) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg"
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Learning Progress</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(userProfile.goals).map(([key, value]) => {
          if (!value) return null;
          return (
            <div key={key} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{goalLabels[key]}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">In Progress</p>
              <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 mt-2">
                <div className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default GoalsProgress;