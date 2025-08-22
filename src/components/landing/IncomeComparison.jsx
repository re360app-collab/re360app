import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Zap } from 'lucide-react';

const IncomeComparison = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-gradient-to-r from-green-400/20 to-yellow-400/20 backdrop-blur-sm rounded-2xl p-4 sm:p-8 mb-8 sm:mb-12 border border-white/30 max-w-6xl mx-auto relative overflow-hidden"
    >
      <div className="absolute top-4 right-4 w-20 h-20 bg-yellow-400/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 bg-green-400/10 rounded-full blur-xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-orange-400/5 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
            💰 The Income Reality Check: Why Dual Licensing Changes Everything 💰
          </h2>
          <p className="text-lg sm:text-xl text-blue-200 mb-2">Same deal yet dramatically different paycheck!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8 text-center mb-6 sm:mb-8">
          <div className="space-y-4 bg-red-500/15 rounded-xl p-4 sm:p-8 border border-red-400/40 relative">
            <div className="absolute top-2 left-2 bg-red-500/30 rounded-full px-2 py-1">
              <span className="text-xs font-bold text-red-200">TRADITIONAL</span>
            </div>
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto">
              <DollarSign className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-white">Traditional Realtor</h3>
            <p className="text-3xl sm:text-5xl font-bold text-red-300 mb-2">$15,000</p>
            <p className="text-xs sm:text-sm text-blue-200 mb-4">Commission only on $500K sale (3% split)</p>
            <div className="text-xs sm:text-sm text-red-200 bg-red-500/20 rounded-lg p-2 sm:p-3 space-y-1">
              <div className="flex items-center justify-center gap-2">
                <span>❌</span>
                <span>Single revenue stream</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span>❌</span>
                <span>Limited earning potential</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span>❌</span>
                <span>Market dependent income</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span>❌</span>
                <span>Leaving money on table</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center relative mx-auto">
                <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-green-400 rounded-full flex items-center justify-center animate-bounce">
                  <span className="text-xs sm:text-sm font-bold text-white">+</span>
                </div>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-yellow-300">VS</div>
              <div className="text-sm sm:text-lg text-blue-200">Upgrade Your Income</div>
            </div>
          </div>

          <div className="space-y-4 bg-green-500/15 rounded-xl p-4 sm:p-8 border border-green-400/40 relative">
            <div className="absolute top-2 left-2 bg-green-500/30 rounded-full px-2 py-1">
              <span className="text-xs font-bold text-green-200">DUAL LICENSED</span>
            </div>
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto relative">
              <Zap className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              <div className="absolute -top-1 -right-1 w-4 h-4 sm:w-6 sm:h-6 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
            <h3 className="text-lg sm:text-2xl font-bold text-white">RE360 Dual Licensed</h3>
            <p className="text-3xl sm:text-5xl font-bold text-green-300 mb-2">$20,000+</p>
            <p className="text-xs sm:text-sm text-blue-200 mb-4">Commission + Loan origination fees</p>
            <div className="text-xs sm:text-sm text-green-200 bg-green-500/20 rounded-lg p-2 sm:p-3 space-y-1">
              <div className="flex items-center justify-center gap-2">
                <span>✅</span>
                <span>Dual revenue streams</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span>✅</span>
                <span>Maximum earning potential</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span>✅</span>
                <span>Market-resistant income</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span>✅</span>
                <span>Elite professional status</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
export default IncomeComparison;