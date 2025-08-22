import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Phone, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export const RealtorRegistrationSteps = ({ formData, handleInputChange, showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword }) => {
  const handlePhoneChange = (value) => {
    const digitsOnly = value.replace(/\D/g, '');
    if (digitsOnly.length <= 10) {
      handleInputChange('phone', digitsOnly);
    }
  };

  const formatPhoneDisplay = (phone) => {
    if (!phone) return '';
    const digitsOnly = phone.replace(/\D/g, '');
    const match = digitsOnly.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (!match) return digitsOnly;
    return `(${match[1] || ''}${match[2] ? ') ' : ''}${match[2] || ''}${match[3] ? '-' : ''}${match[3] || ''}`.trim();
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName" className="text-gray-700 mb-2 block">First Name *</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input 
              id="firstName" 
              type="text" 
              value={formData.firstName} 
              onChange={(e) => handleInputChange('firstName', e.target.value)} 
              className="pl-10 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500" 
              placeholder="John" 
            />
          </div>
        </div>
        <div>
          <Label htmlFor="lastName" className="text-gray-700 mb-2 block">Last Name *</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input 
              id="lastName" 
              type="text" 
              value={formData.lastName} 
              onChange={(e) => handleInputChange('lastName', e.target.value)} 
              className="pl-10 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500" 
              placeholder="Doe" 
            />
          </div>
        </div>
      </div>
      
      <div>
        <Label htmlFor="email" className="text-gray-700 mb-2 block">Email Address *</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input 
            id="email" 
            type="email" 
            value={formData.email} 
            onChange={(e) => handleInputChange('email', e.target.value)} 
            className="pl-10 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500" 
            placeholder="john@example.com" 
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="phone" className="text-gray-700 mb-2 block">Phone Number *</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input 
            id="phone" 
            type="tel" 
            value={formatPhoneDisplay(formData.phone)} 
            onChange={(e) => handlePhoneChange(e.target.value)} 
            className="pl-10 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500" 
            placeholder="(555) 123-4567" 
          />
        </div>
        <p className="text-gray-500 text-sm mt-1">Required for account verification and communication.</p>
      </div>
      
      <div>
        <Label htmlFor="password" className="text-gray-700 mb-2 block">Password *</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input 
            id="password" 
            type={showPassword ? "text" : "password"} 
            value={formData.password} 
            onChange={(e) => handleInputChange('password', e.target.value)} 
            className="pl-10 pr-10 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500" 
            placeholder="Create a strong password" 
          />
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowPassword(!showPassword)} 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
      </div>
      
      <div>
        <Label htmlFor="confirmPassword" className="text-gray-700 mb-2 block">Confirm Password *</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input 
            id="confirmPassword" 
            type={showConfirmPassword ? "text" : "password"} 
            value={formData.confirmPassword} 
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)} 
            className="pl-10 pr-10 bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500" 
            placeholder="Confirm your password" 
          />
          <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-gray-200">
        <div className="flex items-start space-x-3">
          <Checkbox 
            id="consentMarketing" 
            checked={formData.consentMarketing} 
            onCheckedChange={(checked) => handleInputChange('consentMarketing', checked)} 
            className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 mt-1" 
          />
          <Label htmlFor="consentMarketing" className="text-gray-600 text-sm leading-relaxed">
            I agree to receive marketing communications and updates about RE360App services. *
          </Label>
        </div>
        <div className="flex items-start space-x-3">
          <Checkbox 
            id="consentSMS" 
            checked={formData.consentSMS} 
            onCheckedChange={(checked) => handleInputChange('consentSMS', checked)} 
            className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 mt-1" 
          />
          <Label htmlFor="consentSMS" className="text-gray-600 text-sm leading-relaxed">
            I consent to receive SMS notifications and updates on my mobile device.
          </Label>
        </div>
      </div>
    </motion.div>
  );
};