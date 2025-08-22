import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UpdatePasswordForm from '@/components/auth/UpdatePasswordForm';
import { supabase } from '@/lib/customSupabaseClient';
import { motion } from 'framer-motion';

const UpdatePasswordPage = () => {
  const navigate = useNavigate();
  const [sessionReady, setSessionReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;

      if (event === 'PASSWORD_RECOVERY') {
        setSessionReady(true);
      } else if (event === 'SIGNED_IN' && session) {
        navigate('/dashboard');
      }
    });

    const timer = setTimeout(() => {
      if (mounted && !sessionReady) {
        setError("The password recovery link is invalid or has expired. Please request a new one.");
        setTimeout(() => navigate('/auth'), 4000);
      }
    }, 7000);

    return () => {
      mounted = false;
      clearTimeout(timer);
      authListener.subscription.unsubscribe();
    };
  }, [navigate, sessionReady]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-500 to-yellow-500 p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-white bg-black/20 p-8 rounded-lg shadow-xl"
        >
          <h1 className="text-2xl font-bold mb-2">Link Error</h1>
          <p>{error}</p>
        </motion.div>
      </div>
    );
  }

  if (!sessionReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800">
        <div className="text-center text-white space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
          <p className="text-lg font-semibold">Validating recovery link...</p>
        </div>
      </div>
    );
  }

  return <UpdatePasswordForm />;
};

export default UpdatePasswordPage;