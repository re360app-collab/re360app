import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const OtpVerificationForm = ({ otpCode, onOtpCodeChange, onSubmit, isLoading, onBackToLogin, phoneNumber }) => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Enter Verification Code</h2>
        <p className="text-gray-500">We sent a code to {phoneNumber}</p>
      </div>
      
      <div>
        <Input
          type="text"
          value={otpCode}
          onChange={onOtpCodeChange}
          className="w-full px-4 py-3 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 text-center text-2xl tracking-widest"
          placeholder="000000"
          maxLength="6"
        />
      </div>

      <Button
        onClick={onSubmit}
        disabled={isLoading}
        className="w-full bg-blue-600 text-white font-bold py-3 hover:bg-blue-700 transition-all duration-200"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Verifying...
          </div>
        ) : (
          'Verify Code'
        )}
      </Button>

      <Button
        onClick={onBackToLogin}
        variant="outline"
        className="w-full border-gray-300 text-gray-700 hover:bg-gray-100"
      >
        Back to Login
      </Button>
    </div>
  );
};

export default OtpVerificationForm;