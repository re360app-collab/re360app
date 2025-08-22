import React from 'react';
import { Target, Mail, Phone, Globe } from 'lucide-react';

const GoalsAndPreferencesSection = ({ profileData, isEditing, onGoalToggle, onSettingToggle }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Target className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Goals & Preferences</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Your Goals</h3>
          <div className="space-y-3">
            {[
              { key: 'becomeLoanOfficer', label: 'Become a Loan Officer' },
              { key: 'increaseClosings', label: 'Increase Closings' },
              { key: 'growTeam', label: 'Grow My Team' }
            ].map(goal => (
              <label htmlFor={goal.key} key={goal.key} className="flex items-center space-x-3 cursor-pointer">
                <input
                  id={goal.key}
                  type="checkbox"
                  checked={profileData.goals?.[goal.key] || false}
                  onChange={() => onGoalToggle(goal.key)}
                  disabled={!isEditing}
                  className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                />
                <span className="text-gray-900 dark:text-gray-100">{goal.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Notification Settings</h3>
          <div className="space-y-3">
            {[
              { key: 'emailNotifications', label: 'Email Notifications', icon: Mail },
              { key: 'smsNotifications', label: 'SMS Notifications', icon: Phone },
              { key: 'autoPostContent', label: 'Auto-post RE360 promotional content', icon: Globe }
            ].map(setting => {
              const Icon = setting.icon;
              return (
                <label htmlFor={setting.key} key={setting.key} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    id={setting.key}
                    type="checkbox"
                    checked={profileData.settings?.[setting.key] || false}
                    onChange={() => onSettingToggle(setting.key)}
                    disabled={!isEditing}
                    className="w-5 h-5 text-blue-600 bg-white border-gray-300 rounded focus:ring-blue-500 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  />
                  <Icon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-900 dark:text-gray-100">{setting.label}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalsAndPreferencesSection;