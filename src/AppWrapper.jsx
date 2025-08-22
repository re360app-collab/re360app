import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';
import AuthScreen from '@/components/AuthScreen';

const AppWrapper = ({ children }) => {
  const { user, loading, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = location.pathname.startsWith('/auth') || location.pathname.startsWith('/register');
  const isPublicPage = ['/', '/invite', '/features', '/pricing', '/success-stories', '/vote', '/privacy-policy', '/terms-of-service', '/r'].includes(location.pathname);
  const isDashboard = location.pathname.startsWith('/dashboard');
  const isAdminDashboard = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (loading) {
      return;
    }

    if (user) {
      if (isAuthPage) {
        navigate(isAdmin ? '/admin' : '/dashboard', { replace: true });
      } else if (isDashboard && isAdmin) {
        navigate('/admin', { replace: true });
      } else if (isAdminDashboard && !isAdmin) {
        navigate('/dashboard', { replace: true });
      }
    } else {
      if (!isPublicPage && !isAuthPage) {
        navigate('/auth', { replace: true });
      }
    }
  }, [user, loading, isAdmin, isAuthPage, isDashboard, isAdminDashboard, location.pathname, navigate]);

  if (loading) {
    return <AuthScreen />;
  }
  
  return children;
};

export default AppWrapper;