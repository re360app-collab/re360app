import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

const NathanInput = ({ input, setInput, handleSendMessage, isTyping }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage(e);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-3">
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask Nathan anything about mortgages..."
        className="flex-1 bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 focus:ring-blue-500 focus:border-blue-500 rounded-full px-5 py-3"
        disabled={isTyping}
      />
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          type="submit"
          size="icon"
          className="rounded-full w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white"
          disabled={isTyping || !input.trim()}
        >
          <Send size={20} />
        </Button>
      </motion.div>
    </form>
  );
};

export default NathanInput;