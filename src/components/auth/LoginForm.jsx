import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';
import EmailLoginForm from '@/components/auth/EmailLoginForm';
import PhoneLoginForm from '@/components/auth/PhoneLoginForm';
import OtpVerificationForm from '@/components/auth/OtpVerificationForm';
import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';
import { useLoginFormLogic } from '@/hooks/useLoginFormLogic';

const LoginForm = ({ onLoginSuccess, onSwitchToRegister }) => {
  const {
    formData,
    loginMethod,
    isLoading,
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
    handlePasswordReset,
  } = useLoginFormLogic({ onLoginSuccess });

  if (showForgotPasswordView) {
    return (
      <ForgotPasswordForm
        email={formData.resetEmail}
        onEmailChange={(e) => handleInputChange('resetEmail', e.target.value)}
        onSubmit={handlePasswordReset}
        isLoading={isLoading}
        onBackToLogin={() => setShowForgotPasswordView(false)}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.3 }}
    >
      {!otpSent ? (
        <>
          <div className="flex space-x-2 mb-6 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setLoginMethod('email')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                loginMethod === 'email'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Mail className="w-4 h-4 inline mr-1" />
              Email
            </button>
            <button
              onClick={() => setLoginMethod('phone')}
              className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
                loginMethod === 'phone'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Phone className="w-4 h-4 inline mr-1" />
              Phone
            </button>
          </div>

          {loginMethod === 'email' ? (
            <EmailLoginForm
              email={formData.email}
              password={formData.password}
              onEmailChange={(e) => handleInputChange('email', e.target.value)}
              onPasswordChange={(e) => handleInputChange('password', e.target.value)}
              onSubmit={handleEmailLogin}
              isLoading={isLoading}
              onForgotPassword={() => setShowForgotPasswordView(true)}
            />
          ) : (
            <PhoneLoginForm
              phone={formData.phone}
              onPhoneChange={handlePhoneInputChange}
              onSubmit={handlePhoneLogin}
              isLoading={isLoading}
            />
          )}

        </>
      ) : (
        <OtpVerificationForm
          otpCode={otpCode}
          onOtpCodeChange={(e) => setOtpCode(e.target.value)}
          onSubmit={handleOtpVerification}
          isLoading={isLoading}
          onBackToLogin={() => setOtpSent(false)} 
          phoneNumber={formData.phone} 
        />
      )}
    </motion.div>
  );
};

export default LoginForm;