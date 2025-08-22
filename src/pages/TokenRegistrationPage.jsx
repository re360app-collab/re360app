import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { supabase } from '@/lib/customSupabaseClient';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, AlertTriangle, CheckCircle } from 'lucide-react';
import Logo from '@/components/Logo';

const TokenRegistrationPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isValidToken, setIsValidToken] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    brokerage_name: '',
    token: '',
  });

  useEffect(() => {
    const token = searchParams.get('t');
    if (!token) {
      setLoading(false);
      setIsValidToken(false);
      setErrorMessage('No registration token provided.');
      return;
    }

    const validateToken = async () => {
      setFormData(prev => ({ ...prev, token }));
      try {
        const { data, error } = await supabase
          .from('reg_tokens')
          .select(`
            used,
            contacts (
              id,
              phone,
              first_name,
              last_name,
              email
            )
          `)
          .eq('token', token)
          .single();

        if (error && error.code !== 'PGRST116') {
           throw new Error(error.message);
        }

        if (!data) {
          setIsValidToken(false);
          setErrorMessage('This registration link is invalid.');
        } else if (data.used) {
          setIsValidToken(false);
          setErrorMessage('This registration link has already been used.');
        } else {
          setFormData(prev => ({
            ...prev,
            first_name: data.contacts?.first_name || '',
            last_name: data.contacts?.last_name || '',
            email: data.contacts?.email || '',
            phone: data.contacts?.phone || '',
          }));
          setIsValidToken(true);
        }
      } catch (err) {
        console.error('Token validation error:', err);
        setIsValidToken(false);
        setErrorMessage('An error occurred while validating your link.');
      } finally {
        setLoading(false);
      }
    };

    validateToken();
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.brokerage_name || !formData.first_name || !formData.last_name) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "All fields are required.",
      });
      return;
    }
    setIsSubmitting(true);

    try {
      const { data, error: invokeError } = await supabase.functions.invoke('register-with-token', {
        body: formData,
      });
      
      if (invokeError) {
        const errorBody = await invokeError.context.json();
        throw new Error(errorBody.error || 'Function invocation failed.');
      }
      if (data && data.error) throw new Error(data.error);

      setIsSuccess(true);
      toast({
        title: "Registration Successful!",
        description: "Your information has been submitted. Please check your email to create your password and log in.",
      });
      setTimeout(() => navigate('/auth'), 5000);

    } catch (error) {
      console.error('Submission error:', error);
      const message = error.message || "An unexpected error occurred. Please try again.";
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-8">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-lg font-medium text-muted-foreground">Validating your link...</p>
        </div>
      );
    }

    if (!isValidToken) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-8">
          <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
          <h2 className="text-2xl font-bold text-destructive">Link Invalid</h2>
          <p className="text-muted-foreground mt-2">{errorMessage}</p>
        </div>
      );
    }
    
    if (isSuccess) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-8">
                <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
                <h2 className="text-2xl font-bold text-green-500">Thank You!</h2>
                <p className="text-muted-foreground mt-2">Registration complete. Check your email for next steps. Redirecting to login...</p>
            </div>
        );
    }

    return (
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle>Complete Your Registration</CardTitle>
          <CardDescription>Please confirm or update your details below.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first_name">First Name</Label>
              <Input id="first_name" name="first_name" value={formData.first_name} onChange={handleInputChange} placeholder="John" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last_name">Last Name</Label>
              <Input id="last_name" name="last_name" value={formData.last_name} onChange={handleInputChange} placeholder="Doe" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="john.doe@example.com" required />
          </div>
           <div className="space-y-2">
            <Label htmlFor="brokerage_name">Brokerage Name</Label>
            <Input id="brokerage_name" name="brokerage_name" value={formData.brokerage_name} onChange={handleInputChange} placeholder="Your Real Estate Brokerage" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="Your phone number" />
          </div>
          <input type="hidden" name="token" value={formData.token} />
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isSubmitting ? 'Submitting...' : 'Complete Registration'}
          </Button>
        </CardFooter>
      </form>
    );
  };

  return (
    <>
      <Helmet>
        <title>Complete Registration | RE360App</title>
        <meta name="description" content="Complete your registration with RE360App using your secure link." />
      </Helmet>
      <div className="min-h-screen bg-gray-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="mb-8">
            <Logo />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="w-full max-w-lg mx-auto">
            {renderContent()}
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default TokenRegistrationPage;