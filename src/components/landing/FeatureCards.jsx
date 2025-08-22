import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, BookOpen, Target, DollarSign, TrendingUp, Zap } from 'lucide-react';
const FeatureCards = () => {
  return <motion.div initial={{
    opacity: 0,
    y: 40
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.8,
    delay: 0.6
  }} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
      <div className="glass-effect rounded-2xl p-6 sm:p-8 text-center hover:transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
        <div className="absolute top-2 right-2 bg-yellow-400/20 rounded-full px-2 sm:px-3 py-1">
          <span className="text-xs font-bold text-yellow-300">AI POWERED</span>
        </div>
        <div className="absolute top-2 left-2 bg-green-400/20 rounded-full px-2 py-1">
          <span className="text-xs font-bold text-green-300">INCOME BOOST</span>
        </div>
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 relative">
          <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-yellow-400 rounded-full flex items-center justify-center">
            <DollarSign className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
          </div>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Nathan AI Loan Officer Assistant</h3>
        <p className="text-blue-100 mb-4 text-sm sm:text-base">Get instant loan recommendations and buyer qualification assistance from your AI powered loan officer assistant. Master both sides of the deal and maximize every opportunity.</p>
        <div className="bg-green-500/20 rounded-lg p-2 sm:p-3 border border-green-400/30">
          <p className="text-green-200 text-xs sm:text-sm font-semibold">💰 Helps identify loan origination opportunities worth $5K-$15K per deal</p>
        </div>
      </div>

      <div className="glass-effect rounded-2xl p-6 sm:p-8 text-center hover:transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
        <div className="absolute top-2 right-2 bg-green-400/20 rounded-full px-2 sm:px-3 py-1">
          <span className="text-xs font-bold text-green-300">INCOME MULTIPLIER</span>
        </div>
        <div className="absolute top-2 left-2 bg-purple-400/20 rounded-full px-2 py-1">
          <span className="text-xs font-bold text-purple-300">FAST TRACK</span>
        </div>
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 relative">
          <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-orange-400 rounded-full flex items-center justify-center">
            <TrendingUp className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
          </div>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Dual Licensing Academy</h3>
        <p className="text-blue-100 mb-4 text-sm sm:text-base">Master loan officer licensing with comprehensive courses designed specifically for realtors. Unlock your earning potential and join the elite dual-licensed professionals.</p>
        <div className="bg-yellow-500/20 rounded-lg p-2 sm:p-3 border border-yellow-400/30">
          <p className="text-yellow-200 text-xs sm:text-sm font-semibold">🚀 Average income increase: 83% more per deal within 90 days</p>
        </div>
      </div>

      <div className="glass-effect rounded-2xl p-6 sm:p-8 text-center hover:transform hover:scale-105 transition-all duration-300 relative overflow-hidden">
        <div className="absolute top-2 right-2 bg-purple-400/20 rounded-full px-2 sm:px-3 py-1">
          <span className="text-xs font-bold text-purple-300">PROFIT MAXIMIZER</span>
        </div>
        <div className="absolute top-2 left-2 bg-orange-400/20 rounded-full px-2 py-1">
          <span className="text-xs font-bold text-orange-300">ELITE TOOL</span>
        </div>
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 relative">
          <Target className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          <div className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-400 rounded-full flex items-center justify-center">
            <Zap className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
          </div>
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-white mb-3">Dual Revenue Pipeline</h3>
        <p className="text-blue-100 mb-4 text-sm sm:text-base">Streamline your dual-income process with intelligent buyer pre-qualification and loan origination management tools. Turn every lead into maximum profit.</p>
        <div className="bg-purple-500/20 rounded-lg p-2 sm:p-3 border border-purple-400/30">
          <p className="text-purple-200 text-xs sm:text-sm font-semibold">💎 Manage both realtor commissions AND loan originator fees seamlessly</p>
        </div>
      </div>
    </motion.div>;
};
export default FeatureCards;