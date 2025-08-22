import React from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingUp, DollarSign, Crown } from 'lucide-react';
const SuccessStories = () => {
  return <motion.div initial={{
    opacity: 0
  }} animate={{
    opacity: 1
  }} transition={{
    duration: 1,
    delay: 0.8
  }} className="relative z-10 bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-sm border-t border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
            🏆 Real Agents, Real Dual Income, Real Wealth 🏆
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-2">
            See how dual licensing transformed their income and elevated their hustle
          </p>
          <div className="inline-flex items-center bg-yellow-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-3 sm:px-4 py-2">
            <DollarSign className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300 mr-2" />
            <span className="text-yellow-200 font-semibold text-xs sm:text-sm">These agents now earn loan originator fees on EVERY deal</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center mb-8 sm:mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-green-400/30 relative">
            <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-green-400 rounded-full flex items-center justify-center">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-green-300 mb-2">$847K</div>
            <div className="text-blue-100 text-xs sm:text-sm font-semibold">Additional Annual Income</div>
            <div className="text-white/70 text-xs mt-1">Sarah M. - Phoenix Realtor</div>
            <div className="text-green-300 text-xs mt-2 font-bold">+312% Income Increase</div>
            <div className="bg-green-500/20 rounded-lg p-2 mt-3 border border-green-400/30">
              <p className="text-green-200 text-xs">"Now I earn loan fees on every sale. Game changer!"</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-yellow-400/30 relative">
            <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full flex items-center justify-center">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-yellow-300 mb-2">156%</div>
            <div className="text-blue-100 text-xs sm:text-sm font-semibold">Income Increase</div>
            <div className="text-white/70 text-xs mt-1">Mike R. - Dallas Agent</div>
            <div className="text-yellow-300 text-xs mt-2 font-bold">From $180K to $460K</div>
            <div className="bg-yellow-500/20 rounded-lg p-2 mt-3 border border-yellow-400/30">
              <p className="text-yellow-200 text-xs">"Dual licensing doubled my per-deal income!"</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-purple-400/30 relative">
            <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-purple-400 rounded-full flex items-center justify-center">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-purple-300 mb-2">$52K</div>
            <div className="text-blue-100 text-xs sm:text-sm font-semibold">Per Deal Average</div>
            <div className="text-white/70 text-xs mt-1">Lisa T. - Miami Broker</div>
            <div className="text-purple-300 text-xs mt-2 font-bold">vs $18K Traditional</div>
            <div className="bg-purple-500/20 rounded-lg p-2 mt-3 border border-purple-400/30">
              <p className="text-purple-200 text-xs">"I collect both commissions now. Incredible!"</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-blue-400/30 relative">
            <div className="absolute -top-2 -right-2 w-6 h-6 sm:w-8 sm:h-8 bg-blue-400 rounded-full flex items-center justify-center">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <div className="text-2xl sm:text-4xl md:text-5xl font-bold text-blue-300 mb-2">90 Days</div>
            <div className="text-blue-100 text-xs sm:text-sm font-semibold">To Dual Licensed</div>
            <div className="text-white/70 text-xs mt-1">Average Timeline</div>
            <div className="text-blue-300 text-xs mt-2 font-bold">Fast Track Available</div>
            <div className="bg-blue-500/20 rounded-lg p-2 mt-3 border border-blue-400/30">
              <p className="text-blue-200 text-xs">"Quick licensing = faster income boost!"</p>
            </div>
          </div>
        </div>

        {/* Enhanced Success Metrics */}
        <div className="bg-gradient-to-r from-yellow-400/10 to-orange-500/10 rounded-2xl p-4 sm:p-8 border border-yellow-400/20 mb-6 sm:mb-8">
          <div className="text-center mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">The Dual Licensing Income Advantage</h3>
            <p className="text-blue-200 text-sm sm:text-base">Why top agents are making the switch to dual revenue streams</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 text-center">
            <div className="bg-white/10 rounded-lg p-3 sm:p-4">
              <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-300 mx-auto mb-2" />
              <div className="text-lg sm:text-2xl font-bold text-yellow-300 mb-1">2.8x</div>
              <div className="text-blue-100 text-xs sm:text-sm">Higher Annual Earnings</div>
              <div className="text-blue-200 text-xs mt-1">From dual income streams</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 sm:p-4">
              <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-green-300 mx-auto mb-2" />
              <div className="text-lg sm:text-2xl font-bold text-green-300 mb-1">94%</div>
              <div className="text-blue-100 text-xs sm:text-sm">Client Retention Rate</div>
              <div className="text-blue-200 text-xs mt-1">Full-service advantage</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 sm:p-4">
              <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-purple-300 mx-auto mb-2" />
              <div className="text-lg sm:text-2xl font-bold text-purple-300 mb-1">67%</div>
              <div className="text-blue-100 text-xs sm:text-sm">Faster Deal Closings</div>
              <div className="text-blue-200 text-xs mt-1">Control both sides</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 sm:p-4">
              <Star className="w-6 h-6 sm:w-8 sm:h-8 text-orange-300 mx-auto mb-2" />
              <div className="text-lg sm:text-2xl font-bold text-orange-300 mb-1">$15K+</div>
              <div className="text-blue-100 text-xs sm:text-sm">Avg. Loan Originator Fee</div>
              <div className="text-blue-200 text-xs mt-1">Per transaction</div>
            </div>
          </div>
        </div>

        {/* New Income Breakdown Section */}
        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-2xl p-4 sm:p-8 border border-green-400/30">
          <div className="text-center mb-4 sm:mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">💰 How Our Agents Earn Dual Income 💰</h3>
            <p className="text-blue-200 text-sm sm:text-base">Real examples of loan originator fees collected by RE360 agents</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white/10 rounded-lg p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-300 mb-2">$500K Loan</div>
              <div className="text-blue-200 text-xs sm:text-sm mb-3">First-time homebuyer</div>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-200">Realtor Commission:</span>
                  <span className="text-white font-semibold">$15,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">Loan Originator Fee:</span>
                  <span className="text-green-300 font-semibold">+$5,000</span>
                </div>
                <div className="border-t border-white/20 pt-2">
                  <div className="flex justify-between">
                    <span className="text-white font-bold">Total Income:</span>
                    <span className="text-yellow-300 font-bold">$20,000</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-300 mb-2">$600K Loan</div>
              <div className="text-blue-200 text-xs sm:text-sm mb-3">Client refinances</div>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-200">Don't Need To Sell A Home</span>
                  <span className="text-white font-semibold">PRICELESS</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">Loan Originator Fee:</span>
                  <span className="text-green-300 font-semibold">+$6,000</span>
                </div>
                <div className="border-t border-white/20 pt-2">
                  <div className="flex justify-between">
                    <span className="text-white font-bold">Total Income:</span>
                    <span className="text-yellow-300 font-bold">$6,000</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/10 rounded-lg p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-300 mb-2">$1.2M Loan</div>
              <div className="text-blue-200 text-xs sm:text-sm mb-3">Luxury property</div>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-blue-200">Realtor Commission:</span>
                  <span className="text-white font-semibold">$36,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-blue-200">Loan Originator Fee:</span>
                  <span className="text-green-300 font-semibold">+$12,000</span>
                </div>
                <div className="border-t border-white/20 pt-2">
                  <div className="flex justify-between">
                    <span className="text-white font-bold">Total Income:</span>
                    <span className="text-yellow-300 font-bold">$48,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>;
};
export default SuccessStories;