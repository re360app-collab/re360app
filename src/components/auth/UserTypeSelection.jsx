import React from 'react';
import { motion } from 'framer-motion';
import { Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const UserTypeSelection = ({ onSelectUserType, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Choose Your Role</h2>
        <p className="text-blue-100">Select the option that best describes your profession</p>
      </div>

      <div className="space-y-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 cursor-pointer hover:bg-white/20 transition-all duration-200"
          onClick={() => onSelectUserType('realtor')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-300" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-white">Real Estate Professional</h3>
                <p className="text-blue-100 text-sm">Agents, Brokers, Team Leaders</p>
              </div>
            </div>
            <ArrowRight className="w-5 h-5 text-white/60" />
          </div>
        </motion.div>
      </div>

      <div className="text-center">
        <Button
          variant="ghost"
          onClick={onBack}
          className="text-white/70 hover:text-white hover:bg-white/10"
        >
          Back to Login
        </Button>
      </div>
    </motion.div>
  );
};

export default UserTypeSelection;