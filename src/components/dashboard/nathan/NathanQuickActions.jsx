import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const quickActions = [
  "What are the latest mortgage rates?",
  "Explain the difference between FHA and Conventional loans.",
  "What documents do I need for pre-approval?",
  "How can I improve my credit score for a mortgage?",
];

const NathanQuickActions = ({ onActionClick, isTyping }) => {
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
      {quickActions.map((action, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
        >
          <Button
            variant="outline"
            className="w-full text-left justify-start h-auto py-3 px-4 bg-white/5 hover:bg-white/10 border-slate-700 text-slate-300 hover:text-white"
            onClick={() => onActionClick(action)}
            disabled={isTyping}
          >
            {action}
          </Button>
        </motion.div>
      ))}
    </div>
  );
};

export default NathanQuickActions;