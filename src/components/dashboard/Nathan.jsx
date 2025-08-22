import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare as MessageSquareText, ExternalLink, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Nathan = ({ user }) => {
  const userName = user?.user_metadata?.firstName || user?.raw_user_meta_data?.firstName || 'User';

  return (
    <motion.div 
      className="h-full flex flex-col bg-gradient-to-br from-slate-800 via-slate-900 to-blue-900 text-white rounded-xl shadow-2xl overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white/5 backdrop-blur-md p-6 border-b border-white/10 shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center ring-2 ring-yellow-300/50">
            <Zap className="w-7 h-7 text-black" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">AI Mortgage Mentor</h1>
            <p className="text-sm text-blue-200">Powered by RE360</p>
          </div>
        </div>
      </div>

      <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
        <div className="max-w-lg">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
            className="p-8 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 mb-8"
          >
            <MessageSquareText className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-3">
              Hello, {userName}!
            </h2>
            <p className="text-blue-100 text-lg mb-6">
              Your AI assistant is ready to help you with all your mortgage and real estate questions.
            </p>
            <p className="text-sm text-blue-200 mb-2">
              Use the chat interface to start a conversation.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button 
              variant="outline" 
              className="text-yellow-400 border-yellow-400/50 hover:bg-yellow-400/10 hover:text-yellow-300 group"
              onClick={() => {
                const chatComponent = document.getElementById('nathan-ai-chat');
                if (chatComponent) {
                  chatComponent.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Go to AI Chat
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="p-4 bg-black/20 text-center border-t border-white/10">
        <p className="text-xs text-blue-300">
          RE360 provides you with top-tier AI assistance.
        </p>
      </div>
    </motion.div>
  );
};

export default Nathan;