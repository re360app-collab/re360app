import React from 'react';
import { Button } from '@/components/ui/button';
import { Bot, Users, Calendar, BookOpen } from 'lucide-react';

const quickActionsData = [
  { label: 'Chat with Nathan AI', icon: Bot, action: 'nathan' },
  { label: 'Add New Buyer', icon: Users, action: 'qualify-buyers' },
  { label: 'Schedule Appointment', icon: Calendar, action: 'calendar' },
  { label: 'Continue Learning', icon: BookOpen, action: 'learning' },
];

const QuickActions = ({ onActionClick, userProfile }) => {
  const isAdmin = userProfile?.position === 'System Admin' || userProfile?.position === 'NMB Admin';

  const filteredActions = isAdmin 
    ? quickActionsData.filter(action => action.label !== 'Continue Learning') 
    : quickActionsData;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg h-full">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
      <div className="space-y-4">
        {filteredActions.map((action) => (
          <Button
            key={action.label}
            variant="ghost"
            className="w-full justify-start h-14 text-left hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-all duration-200 hover:scale-102 dark:text-white"
            onClick={() => onActionClick(action.action)}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium">{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;