import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Phone, User, Building2, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const RegistrationStepOne = ({
  formData,
  handleInputChange,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  userType,
  setUserType
}) => {
  const handlePhoneChange = (value) => {
    // Remove all non-digit characters
    const digitsOnly = value.replace(/\D/g, '');
    
    // If user enters 10 digits, automatically add the "1" prefix
    if (digitsOnly.length === 10) {
      const formattedPhone = `1${digitsOnly}`;
      handleInputChange('phone', formattedPhone);
    } else if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
      // If they already included the "1", keep it as is
      handleInputChange('phone', digitsOnly);
    } else if (digitsOnly.length < 10) {
      // For partial entries, just store the digits
      handleInputChange('phone', digitsOnly);
    } else if (digitsOnly.length > 11) {
      // Prevent more than 11 digits
      return;
    } else {
      handleInputChange('phone', digitsOnly);
    }
  };

  const formatPhoneDisplay = (phone) => {
    if (!phone) return '';
    
    const digitsOnly = phone.replace(/\D/g, '');
    
    if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
      // Format as +1 (XXX) XXX-XXXX
      const areaCode = digitsOnly.slice(1, 4);
      const firstPart = digitsOnly.slice(4, 7);
      const secondPart = digitsOnly.slice(7, 11);
      return `+1 (${areaCode}) ${firstPart}-${secondPart}`;
    } else if (digitsOnly.length === 10) {
      // Format as (XXX) XXX-XXXX (will get +1 added automatically)
      const areaCode = digitsOnly.slice(0, 3);
      const firstPart = digitsOnly.slice(3, 6);
      const secondPart = digitsOnly.slice(6, 10);
      return `(${areaCode}) ${firstPart}-${secondPart}`;
    } else if (digitsOnly.length >= 6) {
      // Partial formatting
      const areaCode = digitsOnly.slice(0, 3);
      const firstPart = digitsOnly.slice(3, 6);
      const secondPart = digitsOnly.slice(6);
      return `(${areaCode}) ${firstPart}-${secondPart}`;
    } else if (digitsOnly.length >= 3) {
      const areaCode = digitsOnly.slice(0, 3);
      const rest = digitsOnly.slice(3);
      return `(${areaCode}) ${rest}`;
    }
    
    return digitsOnly;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {/* User Type Selection */}
      <div>
        <Label className="text-white mb-4 block text-lg font-semibold">
          I am a... *
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setUserType('realtor')}
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              userType === 'realtor'
                ? 'border-yellow-400 bg-yellow-400/20'
                : 'border-white/30 bg-white/10 hover:border-white/50'
            }`}
          >
            <div className="flex items-center space-x-4">
              <Building2 className="w-8 h-8 text-white" />
              <div>
                <h3 className="text-white font-semibold text-lg">Real Estate Professional</h3>
                <p className="text-white/70 text-sm">Agent, Broker, or Team Leader</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setUserType('loan_officer')}
            className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              userType === 'loan_officer'
                ? 'border-yellow-400 bg-yellow-400/20'
                : 'border-white/30 bg-white/10 hover:border-white/50'
            }`}
          >
            <div className="flex items-center space-x-4">
              <Users className="w-8 h-8 text-white" />
              <div>
                <h3 className="text-white font-semibold text-lg">NMB Loan Officer</h3>
                <p className="text-white/70 text-sm">Loan Officer or Processor</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName" className="text-white mb-2 block">
            First Name *
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
            <Input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="pl-10 bg-white/10 border-white/30 text-white placeholder-white/60 focus:border-yellow-400"
              placeholder="John"
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="lastName" className="text-white mb-2 block">
            Last Name *
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
            <Input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="pl-10 bg-white/10 border-white/30 text-white placeholder-white/60 focus:border-yellow-400"
              placeholder="Doe"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="email" className="text-white mb-2 block">
          Email Address *
        </Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="pl-10 bg-white/10 border-white/30 text-white placeholder-white/60 focus:border-yellow-400"
            placeholder="john@example.com"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="phone" className="text-white mb-2 block">
          Phone Number
        </Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          <Input
            id="phone"
            type="tel"
            value={formatPhoneDisplay(formData.phone)}
            onChange={(e) => handlePhoneChange(e.target.value)}
            className="pl-10 bg-white/10 border-white/30 text-white placeholder-white/60 focus:border-yellow-400"
            placeholder="(555) 123-4567"
          />
        </div>
        <p className="text-white/60 text-sm mt-1">
          Enter your 10-digit phone number. We'll automatically add +1 for US numbers.
        </p>
      </div>

      <div>
        <Label htmlFor="password" className="text-white mb-2 block">
          Password *
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            className="pl-10 pr-10 bg-white/10 border-white/30 text-white placeholder-white/60 focus:border-yellow-400"
            placeholder="Create a strong password"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <div>
        <Label htmlFor="confirmPassword" className="text-white mb-2 block">
          Confirm Password *
        </Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            className="pl-10 pr-10 bg-white/10 border-white/30 text-white placeholder-white/60 focus:border-yellow-400"
            placeholder="Confirm your password"
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white"
          >
            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default RegistrationStepOne;