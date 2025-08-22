import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import AuthScreen from '@/components/AuthScreen';
import { motion } from 'framer-motion';

const LoadingScreen = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-950">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="text-center"
    >
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-200">Loading Dashboard...</h2>
    </motion.div>
  </div>
);

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, isAdmin, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [initialCheckComplete, setInitialCheckComplete] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        navigate('/auth', { state: { from: location }, replace: true });
      } else if (adminOnly && !isAdmin) {
        navigate('/dashboard', { replace: true });
      } else if (!adminOnly && isAdmin && location.pathname.startsWith('/dashboard')) {
        navigate('/admin', { replace: true });
      } else {
        setInitialCheckComplete(true);
      }
    }
  }, [user, isAdmin, loading, adminOnly, location, navigate]);

  if (loading || !initialCheckComplete) {
    return <LoadingScreen />;
  }
  
  if (!user) {
    return null; 
  }

  return children;
};

export default ProtectedRoute;