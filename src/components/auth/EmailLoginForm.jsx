import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const EmailLoginForm = ({ email, password, onEmailChange, onPasswordChange, onSubmit, isLoading, onForgotPassword }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <Label htmlFor="email-login" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            id="email-login"
            type="email"
            value={email}
            onChange={onEmailChange}
            className="w-full pl-10 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-2">
          <Label htmlFor="password-login" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</Label>
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
          >
            Forgot Password?
          </button>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            id="password-login"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={onPasswordChange}
            className="w-full pl-10 pr-12 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500"
            placeholder="Enter your password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white font-bold py-3 hover:bg-blue-700 transition-all duration-200"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Signing In...
          </div>
        ) : (
          'Sign In'
        )}
      </Button>
    </form>
  );
};

export default EmailLoginForm;