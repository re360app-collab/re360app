import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { Building2, Users, TrendingUp, Award, Star, CheckCircle, Chrome } from 'lucide-react';
import { useLoginFormLogic } from '@/hooks/useLoginFormLogic';

const AuthScreen = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const { toast } = useToast();
  const { handleGoogleLogin, isGoogleLoading, isLoading } = useLoginFormLogic({ onLoginSuccess });

  const features = [
    { icon: Building2, title: "Real Estate License Support", desc: "Get your loan officer license with expert guidance" },
    { icon: Users, title: "AI-Powered Buyer Qualification", desc: "Nathan AI helps qualify buyers instantly" },
    { icon: TrendingUp, title: "Lead Management", desc: "Track and manage all your prospects" },
    { icon: Award, title: "Learning Lab", desc: "Comprehensive training materials and courses" }
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Hero Section */}
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

        {/* Floating Elements */}
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

      {/* Right Side - Auth Forms */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
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
              {isLogin ? 'Welcome Back!' : 'Join RE360App'}
            </h2>
            <p className="text-gray-600">
              {isLogin ? 'Sign in to access your dashboard' : 'Create your account to get started'}
            </p>
          </div>

          {/* Google Sign-In Button */}
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            disabled={isLoading || isGoogleLoading}
            className="w-full mb-6 h-12 text-base font-medium border-2 hover:bg-gray-50 transition-all duration-200"
          >
            {isGoogleLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-purple-600 mr-2"></div>
                Redirecting to Google...
              </div>
            ) : (
              <>
                <Chrome className="w-5 h-5 mr-3" />
                Continue with Google
              </>
            )}
          </Button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with email</span>
            </div>
          </div>

          {/* Auth Forms */}
          {isLogin ? (
            <LoginForm onLoginSuccess={onLoginSuccess} />
          ) : (
            <RegisterForm onRegisterSuccess={onLoginSuccess} />
          )}

          {/* Toggle Auth Mode */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <Button
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1 p-0 h-auto font-semibold text-blue-600 hover:text-blue-700"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </Button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthScreen;