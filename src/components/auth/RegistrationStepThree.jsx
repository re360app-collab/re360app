import React from 'react';
import { motion } from 'framer-motion';
import { Award, Facebook, Instagram, Linkedin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

const EXPERIENCE_LEVELS = [
  'New to Real Estate',
  '1-2 years',
  '3-5 years',
  '6-10 years',
  '10+ years'
];

const RegistrationStepThree = ({ formData, handleInputChange, handleGoalChange, userType }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      {userType === 'realtor' && (
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
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/30 text-white rounded-md focus:border-yellow-400 focus:outline-none appearance-none"
              required
            >
              <option value="" className="bg-gray-800 text-white">Select your experience level</option>
              {EXPERIENCE_LEVELS.map(level => (
                <option key={level} value={level} className="bg-gray-800 text-white">{level}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      )}

      <div>
        <Label className="text-white mb-4 block text-lg font-semibold">
          Social Media Profiles (Optional)
        </Label>
        <div className="space-y-4">
          <div className="relative">
            <Facebook className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
            <Input
              type="url"
              value={formData.socialMedia.facebook}
              onChange={(e) => handleInputChange('socialMedia.facebook', e.target.value)}
              className="pl-10 bg-white/10 border-white/30 text-white placeholder-white/60 focus:border-yellow-400"
              placeholder="Facebook profile URL"
            />
          </div>
          <div className="relative">
            <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
            <Input
              type="url"
              value={formData.socialMedia.instagram}
              onChange={(e) => handleInputChange('socialMedia.instagram', e.target.value)}
              className="pl-10 bg-white/10 border-white/30 text-white placeholder-white/60 focus:border-yellow-400"
              placeholder="Instagram profile URL"
            />
          </div>
          <div className="relative">
            <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
            <Input
              type="url"
              value={formData.socialMedia.linkedin}
              onChange={(e) => handleInputChange('socialMedia.linkedin', e.target.value)}
              className="pl-10 bg-white/10 border-white/30 text-white placeholder-white/60 focus:border-yellow-400"
              placeholder="LinkedIn profile URL"
            />
          </div>
        </div>
      </div>

      {userType === 'realtor' && (
        <div>
          <Label className="text-white mb-4 block text-lg font-semibold">
            What are your goals? (Select all that apply)
          </Label>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="becomeLoanOfficer"
                checked={formData.goals.becomeLoanOfficer}
                onCheckedChange={() => handleGoalChange('becomeLoanOfficer')}
                className="border-white/30 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
              />
              <Label htmlFor="becomeLoanOfficer" className="text-white">
                Become a licensed loan officer
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="increaseClosings"
                checked={formData.goals.increaseClosings}
                onCheckedChange={() => handleGoalChange('increaseClosings')}
                className="border-white/30 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
              />
              <Label htmlFor="increaseClosings" className="text-white">
                Increase my monthly closings
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="growTeam"
                checked={formData.goals.growTeam}
                onCheckedChange={() => handleGoalChange('growTeam')}
                className="border-white/30 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
              />
              <Label htmlFor="growTeam" className="text-white">
                Grow and manage a team
              </Label>
            </div>
          </div>
        </div>
      )}

      {userType === 'loan_officer' && (
        <div>
          <Label className="text-white mb-4 block text-lg font-semibold">
            Your Focus Areas (Select all that apply)
          </Label>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="processLoans"
                checked={formData.goals.processLoans || false}
                onCheckedChange={() => handleGoalChange('processLoans')}
                className="border-white/30 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
              />
              <Label htmlFor="processLoans" className="text-white">
                Process and manage loan applications
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="workWithRealtors"
                checked={formData.goals.workWithRealtors || false}
                onCheckedChange={() => handleGoalChange('workWithRealtors')}
                className="border-white/30 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
              />
              <Label htmlFor="workWithRealtors" className="text-white">
                Collaborate with real estate professionals
              </Label>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="manageBuyers"
                checked={formData.goals.manageBuyers || false}
                onCheckedChange={() => handleGoalChange('manageBuyers')}
                className="border-white/30 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400"
              />
              <Label htmlFor="manageBuyers" className="text-white">
                Review and manage pre-qualified buyers
              </Label>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4 pt-4 border-t border-white/20">
        <div className="flex items-start space-x-3">
          <Checkbox
            id="consentMarketing"
            checked={formData.consentMarketing}
            onCheckedChange={(checked) => handleInputChange('consentMarketing', checked)}
            className="border-white/30 data-[state=checked]:bg-yellow-400 data-[state=checked]:border-yellow-400 mt-1"
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
};

export default RegistrationStepThree;