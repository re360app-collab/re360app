import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Bot, User } from 'lucide-react';

const NathanMessageBubble = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        'flex items-start gap-3 my-4',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
          <Bot size={24} />
        </div>
      )}
      <div
        className={cn(
          'max-w-md lg:max-w-2xl p-4 rounded-2xl shadow-md',
          isUser
            ? 'bg-blue-600 text-white rounded-br-lg'
            : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-bl-lg'
        )}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300">
          <User size={24} />
        </div>
      )}
    </motion.div>
  );
};

export default NathanMessageBubble;