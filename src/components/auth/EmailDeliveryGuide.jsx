import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, AlertTriangle, CheckCircle, RefreshCw, HelpCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { resendConfirmationEmail } from '@/lib/auth';

const EmailDeliveryGuide = ({ email, onResend }) => {
  const [isResending, setIsResending] = useState(false);
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);
  const { toast } = useToast();

  const handleResend = async () => {
    setIsResending(true);
    try {
      const { error } = await resendConfirmationEmail(email);
      if (error) {
        toast({
          title: "Error resending email",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Email Sent! 📧",
          description: "A new confirmation email has been sent. Please check your inbox and spam folder.",
          duration: 8000,
        });
        if (onResend) onResend();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend email. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsResending(false);
    }
  };

  const troubleshootingSteps = [
    {
      icon: Mail,
      title: "Check Your Spam/Junk Folder",
      description: "Confirmation emails sometimes end up in spam. Look for emails from 'noreply@re360app.com' or similar.",
      action: "Check Spam Folder"
    },
    {
      icon: RefreshCw,
      title: "Wait a Few Minutes",
      description: "Email delivery can take 2-5 minutes. Please wait and refresh your inbox.",
      action: "Refresh Inbox"
    },
    {
      icon: AlertTriangle,
      title: "Check Email Address",
      description: `Confirm that ${email} is correct and accessible.`,
      action: "Verify Email"
    },
    {
      icon: HelpCircle,
      title: "Contact Support",
      description: "If you still don't receive the email after 10 minutes, our support team can help.",
      action: "Get Help",
      link: "mailto:support@re360app.com?subject=Email Delivery Issue"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Mail className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">Email Sent Successfully</h3>
            <p className="text-blue-800 text-sm">
              We've sent a confirmation email to <strong>{email}</strong>. 
              Click the link in the email to activate your account.
            </p>
          </div>
        </div>
      </div>

      <div className="flex space-x-3">
        <Button 
          onClick={handleResend}
          disabled={isResending}
          variant="outline"
          className="flex-1"
        >
          {isResending ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4 mr-2" />
              Resend Email
            </>
          )}
        </Button>
        
        <Button 
          onClick={() => setShowTroubleshooting(!showTroubleshooting)}
          variant="ghost"
          className="flex-1"
        >
          <HelpCircle className="w-4 h-4 mr-2" />
          Troubleshooting
        </Button>
      </div>

      <AnimatePresence>
        {showTroubleshooting && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4"
          >
            <h4 className="font-semibold text-gray-900">Email Not Received? Try These Steps:</h4>
            
            {troubleshootingSteps.map((step, index) => (
              <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <step.icon className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-gray-900 mb-1">{step.title}</h5>
                  <p className="text-gray-600 text-sm mb-2">{step.description}</p>
                  {step.link ? (
                    <a 
                      href={step.link}
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      {step.action}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  ) : (
                    <span className="text-blue-600 text-sm font-medium">{step.action}</span>
                  )}
                </div>
              </div>
            ))}

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h5 className="font-medium text-yellow-900 mb-1">Email Provider Issues</h5>
                  <p className="text-yellow-800 text-sm">
                    Some email providers (like Gmail, Yahoo, Outlook) may delay or block automated emails. 
                    If you continue having issues, try using a different email address or contact your IT department.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmailDeliveryGuide;