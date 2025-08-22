import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { sendPasswordResetEmail } from '@/lib/auth';

const ForgotPasswordForm = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await sendPasswordResetEmail(email);

    setIsLoading(false);

    if (error) {
      toast({
        title: "Error",
        description: "Could not send password reset email. Please try again.",
        variant: "destructive",
      });
    } else {
      setIsSent(true);
      toast({
        title: "Check your email",
        description: `A password reset link has been sent to ${email}.`,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white tracking-tight">Forgot Password?</h2>
        <p className="text-blue-200 mt-2">No worries! We'll send you reset instructions.</p>
      </div>

      {isSent ? (
        <div className="text-center bg-green-500/20 p-6 rounded-lg border border-green-400">
          <CheckCircle className="mx-auto h-12 w-12 text-green-400 mb-4" />
          <h3 className="text-xl font-semibold text-white">Email Sent!</h3>
          <p className="text-green-200 mt-2">Please check your inbox (and spam folder) for a link to reset your password.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-white/80">Email Address</Label>
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-white/10 border-white/30 text-white placeholder-white/60 focus:ring-yellow-400 focus:border-yellow-400"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>

          <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 hover:from-yellow-500 hover:to-orange-600 shadow-lg">
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Sending...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Send Reset Link
              </>
            )}
          </Button>
        </form>
      )}

      <Button variant="link" onClick={onBack} className="w-full mt-6 text-blue-200 hover:text-white">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Login
      </Button>
    </motion.div>
  );
};

export default ForgotPasswordForm;