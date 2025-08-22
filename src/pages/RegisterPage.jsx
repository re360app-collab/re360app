import React from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/auth/AuthLayout';
import RegisterForm from '@/components/auth/RegisterForm';
import { Button } from '@/components/ui/button';
import { Chrome } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from '@/components/ui/use-toast';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isGoogleLoading, setIsGoogleLoading] = React.useState(false);

  const handleGoogleSignUp = async () => {
    setIsGoogleLoading(true);
    localStorage.setItem('intended_user_type', 'realtor');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard/profile?setup=true`,
        }
      });
      if (error) {
        toast({ 
          title: "Google Sign-Up Failed", 
          description: error.message, 
          variant: "destructive" 
        });
        localStorage.removeItem('intended_user_type');
      }
    } catch (error) {
      toast({ 
        title: "Google Sign-Up Error", 
        description: "An unexpected error occurred.", 
        variant: "destructive" 
      });
      localStorage.removeItem('intended_user_type');
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="light">
      <AuthLayout
        title="Join RE360App"
        description="Create your account to get started"
        showToggle={true}
        toggleText="Already have an account?"
        toggleLinkText="Sign in"
        toggleTo="/auth"
      >
          <Button
            onClick={handleGoogleSignUp}
            variant="outline"
            disabled={isGoogleLoading}
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

        <RegisterForm onSwitchToLogin={() => navigate('/auth')} />
      </AuthLayout>
    </div>
  );
};

export default RegisterPage;