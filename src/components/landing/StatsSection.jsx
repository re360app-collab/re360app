import React from 'react';
import { motion } from 'framer-motion';

const StatsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 1.0 }}
      className="relative z-10 bg-white/10 backdrop-blur-sm border-t border-white/20"
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            The RE360 Advantage
          </h2>
          <p className="text-xl text-blue-100">
            Join thousands of agents who've elevated their hustle and doubled their income
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">10K+</div>
            <div className="text-blue-100">Dual Licensed Agents</div>
            <div className="text-xs text-blue-200 mt-1">And growing daily</div>
          </div>
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">$2B+</div>
            <div className="text-blue-100">Additional Income Generated</div>
            <div className="text-xs text-blue-200 mt-1">For our agents</div>
          </div>
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">95%</div>
            <div className="text-blue-100">Licensing Success Rate</div>
            <div className="text-xs text-blue-200 mt-1">Industry leading</div>
          </div>
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
            <div className="text-blue-100">AI Support & Training</div>
            <div className="text-xs text-blue-200 mt-1">Always available</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StatsSection;