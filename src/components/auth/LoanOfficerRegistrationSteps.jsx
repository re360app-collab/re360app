import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Phone, User, Building, Award, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const EXPERIENCE_LEVELS = [
  'New to Lending',
  '1-2 years',
  '3-5 years',
  '6-10 years',
  '10+ years'
];

const LOAN_OFFICER_POSITIONS = [
  'Loan Officer',
  'Loan Processor',
  'Underwriter',
  'NMB Admin', // NMB Admin can be selected here
  'Other'
];

export const LoanOfficerRegistrationSteps = ({
  currentStep,
  formData,
  handleInputChange,
  handleGoalChange,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword
}) => {
  const handlePhoneChange = (value) => {
    const digitsOnly = value.replace(/\D/g, '');
    
    if (digitsOnly.length === 10) {
      const formattedPhone = `1${digitsOnly}`;
      handleInputChange('phone', formattedPhone);
    } else if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
      handleInputChange('phone', digitsOnly);
    } else if (digitsOnly.length < 10) {
      handleInputChange('phone', digitsOnly);
    } else if (digitsOnly.length > 11) {
      return;
    } else {
      handleInputChange('phone', digitsOnly);
    }
  };

  const formatPhoneDisplay = (phone) => {
    if (!phone) return '';
    
    const digitsOnly = phone.replace(/\D/g, '');
    
    if (digitsOnly.length === 11 && digitsOnly.startsWith('1')) {
      const areaCode = digitsOnly.slice(1, 4);
      const firstPart = digitsOnly.slice(4, 7);
      const secondPart = digitsOnly.slice(7, 11);
      return `+1 (${areaCode}) ${firstPart}-${secondPart}`;
    } else if (digitsOnly.length === 10) {
      const areaCode = digitsOnly.slice(0, 3);
      const firstPart = digitsOnly.slice(3, 6);
      const secondPart = digitsOnly.slice(6, 10);
      return `(${areaCode}) ${firstPart}-${secondPart}`;
    } else if (digitsOnly.length >= 6) {
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

  const renderStep1 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
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
            placeholder="john@nmb.com"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="phone" className="text-white mb-2 block">
          Phone Number *
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
            required
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

  const renderStep2 = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-3">
          <Building className="w-6 h-6 text-green-400" />
          <div>
            <h3 className="text-green-400 font-semibold">NMB Loan Officer Registration</h3>
            <p className="text-green-300 text-sm">Complete your professional information to access the loan management system.</p>
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="position" className="text-white mb-2 block">
          Position *
        </Label>
        <div className="relative">
          <Target className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 z-10" />
          <select
            id="position"
            value={formData.position}
            onChange={(e) => handleInputChange('position', e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            required
          >
            <option value="" className="bg-gray-800 text-white">Select your position</option>
            {LOAN_OFFICER_POSITIONS.map(position => (
              <option key={position} value={position} className="bg-gray-800 text-white">{position}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="experienceLevel" className="text-white mb-2 block">
          Experience Level *
        </Label>
        <div className="relative">
          <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 z-10" />
          <select
            id="experienceLevel"
            value={formData.experienceLevel}
            onChange={(e) => handleInputChange('experienceLevel', e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/30 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            required
          >
            <option value="" className="bg-gray-800 text-white">Select your experience level</option>
            {EXPERIENCE_LEVELS.map(level => (
              <option key={level} value={level} className="bg-gray-800 text-white">{level}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="nmls" className="text-white mb-2 block">
          NMLS ID (Optional)
        </Label>
        <div className="relative">
          <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          <Input
            id="nmls"
            type="text"
            value={formData.nmlsId || ''}
            onChange={(e) => handleInputChange('nmlsId', e.target.value)}
            className="pl-10 bg-white/10 border-white/30 text-white placeholder-white/60 focus:border-yellow-400"
            placeholder="Enter your NMLS ID"
          />
        </div>
        <p className="text-white/60 text-sm mt-1">
          Your National Mortgage Licensing System ID (if applicable).
        </p>
      </div>

      <div>
        <Label className="text-white mb-4 block text-lg font-semibold">
          What are your goals? (Select all that apply)
        </Label>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="manageBuyerPipeline"
              checked={formData.goals.manageBuyerPipeline}
              onCheckedChange={() => handleGoalChange('manageBuyerPipeline')}
              className="border-white/30 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
            />
            <Label htmlFor="manageBuyerPipeline" className="text-white">
              Manage pre-approved buyer pipeline
            </Label>
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox
              id="increaseLoans"
              checked={formData.goals.increaseLoans}
              onCheckedChange={() => handleGoalChange('increaseLoans')}
              className="border-white/30 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
            />
            <Label htmlFor="increaseLoans" className="text-white">
              Increase monthly loan originations
            </Label>
          </div>
          <div className="flex items-center space-x-3">
            <Checkbox
              id="realtorPartnership"
              checked={formData.goals.realtorPartnership}
              onCheckedChange={() => handleGoalChange('realtorPartnership')}
              className="border-white/30 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
            />
            <Label htmlFor="realtorPartnership" className="text-white">
              Build stronger realtor partnerships
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-white/20">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="consentMarketing"
            checked={formData.consentMarketing}
            onCheckedChange={(checked) => handleInputChange('consentMarketing', checked)}
            className="border-white/30 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400 mt-1"
            required
          />
          <Label htmlFor="consentMarketing" className="text-white text-sm leading-relaxed">
            I agree to receive marketing communications and updates about RE360App services. *
          </Label>
        </div>
        <div className="flex items-start space-x-3">
          <Checkbox
            id="consentSMS"
            checked={formData.consentSMS}
            onCheckedChange={(checked) => handleInputChange('consentSMS', checked)}
            className="border-white/30 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400 mt-1"
          />
          <Label htmlFor="consentSMS" className="text-white text-sm leading-relaxed">
            I consent to receive SMS notifications and updates on my mobile device.
          </Label>
        </div>
      </div>
    </motion.div>
  );

  switch (currentStep) {
    case 1:
      return renderStep1();
    case 2:
      return renderStep2();
    default:
      return renderStep1();
  }
};