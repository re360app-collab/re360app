import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/auth/AuthLayout';
import LoginForm from '@/components/auth/LoginForm';
import { Button } from '@/components/ui/button';
import { Chrome } from 'lucide-react';
import { useLoginFormLogic } from '@/hooks/useLoginFormLogic';

const LoginPage = () => {
  const navigate = useNavigate();
  const { handleGoogleLogin, isGoogleLoading, isLoading } = useLoginFormLogic();

  return (
    <AuthLayout
      title="Welcome Back!"
      description="Sign in to access your dashboard"
      showToggle={true}
      toggleText="Don't have an account?"
      toggleLinkText="Sign up"
      toggleTo="/register"
    >
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

      <LoginForm onSwitchToRegister={() => navigate('/register')} />
    </AuthLayout>
  );
};

export default LoginPage;