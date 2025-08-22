import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { signUp } from '@/lib/auth';
import { RealtorRegistrationSteps } from './RealtorRegistrationSteps';
import EmailDeliveryGuide from '@/components/auth/EmailDeliveryGuide';

const RegisterForm = ({ onRegisterSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    consentMarketing: false,
    consentSMS: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.password || !formData.confirmPassword) {
      toast({ title: 'Missing Fields', description: 'Please fill out all required fields.', variant: 'destructive' });
      return false;
    }
    const phoneDigitsOnly = formData.phone.replace(/\D/g, '');
    if (phoneDigitsOnly.length !== 10) {
      toast({ title: 'Invalid Phone Number', description: 'Please enter a valid 10-digit phone number.', variant: 'destructive' });
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      toast({ title: 'Password Mismatch', description: 'Passwords do not match.', variant: 'destructive' });
      return false;
    }
    if (formData.password.length < 6) {
      toast({ title: 'Weak Password', description: 'Password must be at least 6 characters long.', variant: 'destructive' });
      return false;
    }
    if (!formData.consentMarketing) {
      toast({ title: 'Consent Required', description: 'You must agree to receive marketing communications.', variant: 'destructive' });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    const phoneDigitsOnly = formData.phone.replace(/\D/g, '');
    const fullPhoneNumber = `+1${phoneDigitsOnly}`;
    const metadata = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      user_type: 'realtor',
      position: 'Real Estate Agent',
      phone: fullPhoneNumber,
    };

    try {
      const { data, error } = await signUp(formData.email, formData.password, fullPhoneNumber, metadata);
      if (error) throw error;
      if (data.user && data.user.identities && data.user.identities.length === 0) {
         toast({
          title: "User already registered",
          description: "This email is already in use. Please log in or use a different email.",
          variant: "destructive",
        });
      } else {
        setRegistrationSuccess(true);
      }
    } catch (error) {
      toast({ title: "Registration failed", description: error.message || "An unexpected error occurred.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full text-gray-900">
      <AnimatePresence mode="wait">
        {registrationSuccess ? (
          <motion.div key="success" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email!</h2>
            <EmailDeliveryGuide email={formData.email} onResend={() => toast({ title: "Email Sent! 📧", description: "Please check your inbox and spam folder.", duration: 6000 })} />
            <div className="mt-8">
              <Button onClick={onSwitchToLogin} className="w-full bg-blue-600 text-white h-12 text-base hover:bg-blue-700">
                Go to Login
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <RealtorRegistrationSteps 
                formData={formData} 
                handleInputChange={handleInputChange} 
                showPassword={showPassword} 
                setShowPassword={setShowPassword} 
                showConfirmPassword={showConfirmPassword} 
                setShowConfirmPassword={setShowConfirmPassword} 
              />
              <div className="mt-8">
                <Button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white h-12 text-base hover:bg-blue-700">
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RegisterForm;