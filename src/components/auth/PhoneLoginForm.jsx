import React from 'react';
import { Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const PhoneLoginForm = ({ phone, onPhoneChange, onSubmit, isLoading }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <Label htmlFor="phone-login" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            id="phone-login"
            type="tel"
            value={phone}
            onChange={onPhoneChange}
            className="w-full pl-10 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500"
            placeholder="(555) 123-4567"
            required
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Enter your 10-digit phone number. We'll automatically add the +1 country code.
        </p>
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white font-bold py-3 hover:bg-blue-700 transition-all duration-200"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Sending SMS...
          </div>
        ) : (
          'Send SMS Code'
        )}
      </Button>
    </form>
  );
};

export default PhoneLoginForm;