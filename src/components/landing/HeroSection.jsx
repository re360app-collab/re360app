import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = ({ onNavigate }) => {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 overflow-hidden pt-24 pb-12 min-h-screen flex items-center">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-400/20 rounded-full blur-3xl" 
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }} 
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }} 
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" 
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }} 
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }} 
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-6 lg:p-8 border border-white/10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8 }}
              className="text-center lg:text-left"
            >
              <motion.div 
                initial={{ opacity: 0, y: 30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-6"
              >
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                  Enhance Your{' '}
                  <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                    Real Estate Career
                  </span>{' '}
                  - Double Earnings Without Extra Work
                </h1>
                <p className="text-base lg:text-lg text-white/90 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-8">
                  Streamline Your Path to Dual Licensing 🚀 and Unlock More Opportunities in Real Estate & Mortgage 💼🏡!
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: [1, 0.95, 1], scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-10 py-8 text-xl rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
                  onClick={() => onNavigate('/register')}
                >
                  GET STARTED HERE
                  <ArrowRight className="w-6 h-6 ml-3" />
                </Button>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }} 
              animate={{ opacity: 1, x: 0 }} 
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative w-full rounded-xl overflow-hidden shadow-2xl border border-white/20">
                <iframe
                  className="w-full h-full aspect-video"
                  src="https://www.youtube.com/embed/Twqnr0HvFQ8?autoplay=1&loop=1&playlist=Twqnr0HvFQ8&mute=1&controls=0&showinfo=0&autohide=1"
                  title="RE360 Dashboard Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400/20 rounded-full blur-lg animate-pulse"></div>
              <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-blue-400/20 rounded-full blur-lg animate-pulse"></div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-3 mt-6 border border-white/20"
              >
                <div className="flex items-center justify-center space-x-2 text-white text-xs sm:text-sm">
                  <div className="text-center">
                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 mx-auto mb-1" />
                    <span className="font-medium">Realtor Commission</span>
                  </div>
                  <span className="text-lg font-bold text-yellow-400">+</span>
                  <div className="text-center">
                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400 mx-auto mb-1" />
                    <span className="font-medium">Loan Originator Fees</span>
                  </div>
                  <span className="text-lg font-bold text-yellow-400">=</span>
                  <div className="text-center">
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 mx-auto mb-1" />
                    <span className="font-medium text-yellow-400">Maximum Profit</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;