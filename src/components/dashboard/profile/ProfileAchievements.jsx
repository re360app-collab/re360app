import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

const ProfileAchievements = () => {
  const achievements = [
    { title: 'Profile Complete', description: 'Completed your professional profile', earned: true },
    { title: 'First Buyer', description: 'Added your first buyer qualification', earned: true },
    { title: 'Learning Starter', description: 'Started your first course', earned: true },
    { title: 'Nathan Expert', description: 'Had 10+ conversations with Nathan AI', earned: false },
    { title: 'Course Graduate', description: 'Completed 5 courses', earned: false },
    { title: 'Top Performer', description: 'Qualified 25+ buyers', earned: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-xl p-6 shadow-lg"
    >
      <h3 className="text-xl font-bold text-gray-900 mb-6">Achievements</h3>
      <div className="space-y-3">
        {achievements.map((achievement, index) => (
          <div key={index} className={`flex items-center space-x-3 p-3 rounded-lg ${
            achievement.earned ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
          }`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              achievement.earned ? 'bg-green-500' : 'bg-gray-300'
            }`}>
              <Award className="text-white" size={16} />
            </div>
            <div className="flex-1">
              <h4 className={`font-medium ${achievement.earned ? 'text-green-900' : 'text-gray-700'}`}>
                {achievement.title}
              </h4>
              <p className={`text-sm ${achievement.earned ? 'text-green-700' : 'text-gray-500'}`}>
                {achievement.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProfileAchievements;