import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Users, TrendingUp, Award, Star, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AuthLayout = ({ children, title, description, showToggle, toggleText, toggleLinkText, toggleTo }) => {
  const navigate = useNavigate();

  const features = [
    { icon: Building2, title: "Real Estate License Support", desc: "Get your loan officer license with expert guidance" },
    { icon: Users, title: "AI-Powered Buyer Qualification", desc: "Nathan AI helps qualify buyers instantly" },
    { icon: TrendingUp, title: "Lead Management", desc: "Track and manage all your prospects" },
    { icon: Award, title: "Learning Lab", desc: "Comprehensive training materials and courses" }
  ];

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 gradient-bg relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                <Building2 className="w-6 h-6" />
              </div>
              <h1 className="text-4xl font-bold">RE360App</h1>
            </div>
            
            <h2 className="text-3xl font-bold mb-6">
              Real Estate 360° by NMB
            </h2>
            
            <p className="text-xl mb-8 opacity-90">
              Empower your real estate career with AI-driven tools, comprehensive training, and seamless buyer qualification.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center space-x-4 glass-effect rounded-lg p-4"
                >
                  <feature.icon className="w-6 h-6 text-white" />
                  <div>
                    <h3 className="font-semibold">{feature.title}</h3>
                    <p className="text-sm opacity-80">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="absolute top-20 right-20 floating-animation">
          <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
            <Star className="w-10 h-10 text-white" />
          </div>
        </div>
        <div className="absolute bottom-32 right-32 floating-animation" style={{ animationDelay: '2s' }}>
          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
             <div className="lg:hidden flex items-center justify-center mb-6">
              <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center mr-4">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold gradient-text">RE360App</h1>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {title}
            </h2>
            <p className="text-gray-600">
              {description}
            </p>
          </div>

          {children}

          {showToggle && (
            <div className="text-center mt-6">
              <p className="text-gray-600">
                {toggleText}
                <Button
                  variant="link"
                  onClick={() => navigate(toggleTo)}
                  className="ml-1 p-0 h-auto font-semibold text-blue-600 hover:text-blue-700"
                >
                  {toggleLinkText}
                </Button>
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;