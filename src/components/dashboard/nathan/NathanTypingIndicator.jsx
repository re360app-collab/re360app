import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

const NathanTypingIndicator = () => {
  const dotVariants = {
    initial: { y: 0 },
    animate: {
      y: -5,
      transition: {
        duration: 0.4,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-start gap-3 my-4"
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
        <Bot size={24} />
      </div>
      <div className="max-w-md p-4 rounded-2xl shadow-md bg-white dark:bg-slate-800 rounded-bl-lg flex items-center space-x-1.5">
        <motion.div variants={dotVariants} initial="initial" animate="animate" className="w-2 h-2 bg-slate-400 rounded-full" />
        <motion.div variants={dotVariants} initial="initial" animate="animate" style={{ animationDelay: '0.2s' }} className="w-2 h-2 bg-slate-400 rounded-full" />
        <motion.div variants={dotVariants} initial="initial" animate="animate" style={{ animationDelay: '0.4s' }} className="w-2 h-2 bg-slate-400 rounded-full" />
      </div>
    </motion.div>
  );
};

export default NathanTypingIndicator;