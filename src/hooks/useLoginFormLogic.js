import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { signIn, signInWithPhone, verifyOtp, signInWithGoogle, sendPasswordResetEmail } from '@/lib/auth';
import { useNavigate, useLocation } from 'react-router-dom';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const useLoginFormLogic = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phone: '',
    resetEmail: ''
  });
  const [loginMethod, setLoginMethod] = useState('email');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [showForgotPasswordView, setShowForgotPasswordView] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handlePhoneInputChange = (e) => {
    const phoneNumber = parsePhoneNumberFromString(e.target.value, 'US');
    if (phoneNumber) {
      setFormData(prev => ({ ...prev, phone: phoneNumber.formatNational() }));
    } else {
      setFormData(prev => ({ ...prev, phone: e.target.value }));
    }
  };

  const getCleanPhoneNumber = (formattedPhone) => {
    const phoneNumber = parsePhoneNumberFromString(formattedPhone, 'US');
    return phoneNumber?.format('E.164');
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data, error } = await signIn(formData.email, formData.password);
      if (error) {
        toast({ title: "Login failed", description: error.message, variant: "destructive" });
      } else if (data.session) {
        navigate(from, { replace: true });
      } else {
        toast({ title: "Login failed", description: "No user session returned. Please try again.", variant: "destructive" });
      }
    } catch (error) {
      toast({ title: "Login failed", description: "An unexpected error occurred. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneLogin = async (e) => {
    e.preventDefault();
    if (!formData.phone) {
      toast({ title: "Phone number required", description: "Please enter your phone number.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      const cleanPhone = getCleanPhoneNumber(formData.phone);
      if (!cleanPhone) {
         toast({ title: "Invalid Phone", description: "Please enter a valid 10-digit US phone number.", variant: "destructive" });
         setIsLoading(false);
         return;
      }
      const { error } = await signInWithPhone(cleanPhone);
      if (error) {
        toast({ title: "SMS failed", description: error.message, variant: "destructive" });
      } else {
        setOtpSent(true);
        toast({ title: "SMS sent! 📱", description: "Check your phone for the verification code." });
      }
    } catch (error) {
      toast({ title: "SMS failed", description: "Failed to send SMS. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async (e) => {
    e.preventDefault();
    if (!otpCode) {
      toast({ title: "Code required", description: "Please enter the verification code.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      const cleanPhone = getCleanPhoneNumber(formData.phone);
      const { data, error } = await verifyOtp(cleanPhone, otpCode);
      if (error) {
        toast({ title: "Verification failed", description: error.message, variant: "destructive" });
      } else if (data.session) {
        navigate(from, { replace: true });
      }
    } catch (error) {
      toast({ title: "Verification failed", description: "Invalid code. Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        toast({ title: "Google Sign-In Failed", description: error.message, variant: "destructive" });
        setIsGoogleLoading(false);
      }
    } catch (error) {
      toast({ title: "Google Sign-In Error", description: "An unexpected error occurred.", variant: "destructive" });
      setIsGoogleLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    if (!formData.resetEmail) {
        toast({ title: "Email required", description: "Please enter your email to reset password.", variant: "destructive"});
        return;
    }
    setIsLoading(true);
    try {
        const { error } = await sendPasswordResetEmail(formData.resetEmail);
        if (error) {
            let description = error.message;
            if (error.message.toLowerCase().includes('rate limit exceeded') || error.message.toLowerCase().includes('email rate limit exceeded')) {
                description = "Temporary limit for password reset emails reached. Try again later or contact support.";
            }
            toast({ title: "Password Reset Failed", description, variant: "destructive" });
        } else {
            toast({ title: "Password Reset Email Sent", description: "If an account exists, a reset link has been sent. Check your inbox/spam." });
            setShowForgotPasswordView(false);
            setFormData(prev => ({ ...prev, resetEmail: ''}));
        }
    } catch (error) {
        toast({ title: "Password Reset Error", description: "An unexpected error occurred.", variant: "destructive" });
    } finally {
        setIsLoading(false);
    }
  };

  return {
    formData,
    loginMethod,
    isLoading,
    isGoogleLoading,
    otpSent,
    setOtpSent,
    otpCode,
    setOtpCode,
    showForgotPasswordView,
    setShowForgotPasswordView,
    setLoginMethod,
    handleInputChange,
    handlePhoneInputChange,
    handleEmailLogin,
    handlePhoneLogin,
    handleOtpVerification,
    handleGoogleLogin,
    handlePasswordReset,
    getCleanPhoneNumber,
  };
};