import React from 'react';
import { motion } from 'framer-motion';

const AdminLoansOverviewHeader = ({ user }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-800 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl mb-8"
    >
      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <div className="w-16 h-16 bg-white/25 rounded-xl flex items-center justify-center p-2 shadow-md">
              <img 
                src="https://storage.googleapis.com/hostinger-horizons-assets-prod/0b420d02-3d28-409e-bd2c-9abc859f6e58/d058a3ad73e1acd97ecf5e81e1a9c09a.webp" 
                alt="NMB Logo" 
                className="w-full h-full object-contain rounded"
              />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">NMB Loan Officer Dashboard</h1>
              <p className="text-lg sm:text-xl opacity-90">
                Comprehensive overview of all loan submissions
              </p>
            </div>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-md sm:text-lg font-semibold">
              Welcome, {user?.user_metadata?.first_name || 'Admin'}!
            </p>
            <p className="text-sm opacity-80">NMB Loan Officer</p>
          </div>
        </div>
      </div>
      
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-4 right-4 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full animate-pulse" />
        <div className="absolute bottom-4 left-4 w-16 h-16 sm:w-20 sm:h-20 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-12 h-12 bg-white/5 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
      </div>
    </motion.div>
  );
};

export default AdminLoansOverviewHeader;