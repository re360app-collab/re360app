import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Bot, BookOpen } from 'lucide-react';

const WelcomeBanner = ({ user, userProfile, onActionClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-2xl p-8 text-white relative overflow-hidden shadow-2xl"
    >
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://storage.googleapis.com/hostinger-horizons-assets-prod/0b420d02-3d28-409e-bd2c-9abc859f6e58/94156bfa4a04ed145c41181dcdaccc09.jpg"
          alt="Illustration of a house with financial elements like money and a calculator, representing home financing and investment"
          className="w-full h-full object-cover rounded-2xl"
        />
      </div>
      <div className="relative z-10">
        <h1 className="text-3xl font-bold mb-2">
          Welcome to RE360APP, {userProfile?.first_name || user?.email?.split('@')[0] || 'User'}! 🎉
        </h1>
        <p className="text-xl opacity-90 mb-6">
          Your all-in-one platform for real estate success with NMB
        </p>
        <div className="flex flex-wrap gap-4">
          <Button
            variant="secondary"
            className="bg-white/20 hover:bg-white/30 text-white border-white/30 transform hover:scale-105 transition-transform"
            onClick={() => onActionClick('nathan')}
          >
            <Bot className="w-5 h-5 mr-2" />
            Chat with Nathan AI
          </Button>
          <Button
            variant="secondary"
            className="bg-white/20 hover:bg-white/30 text-white border-white/30 transform hover:scale-105 transition-transform"
            onClick={() => onActionClick('learning')}
          >
            <BookOpen className="w-5 h-5 mr-2" />
            Continue Learning
          </Button>
        </div>
      </div>
      <div className="absolute top-4 right-4 w-32 h-32 bg-white/10 rounded-full animate-pulse" />
      <div className="absolute bottom-4 right-16 w-20 h-20 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
    </motion.div>
  );
};

export default WelcomeBanner;