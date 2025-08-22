import React from 'react';
import { motion } from 'framer-motion';
import { Building, Target, Award } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const LOAN_OFFICER_POSITIONS = [
  'Loan Officer',
  'Loan Processor',
  'Underwriter',
  'Loan Coordinator',
  'NMB Admin',
  'Other'
];

const EXPERIENCE_LEVELS = [
  'New to Lending',
  '1-2 years',
  '3-5 years',
  '6-10 years',
  '10+ years'
];

const RegistrationStepTwoLoanOfficer = ({ formData, handleInputChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">NMB Loan Officer Information</h3>
        <p className="text-white/70">Tell us about your role at NMB</p>
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
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/30 text-white rounded-md focus:border-yellow-400 focus:outline-none appearance-none"
            required
          >
            <option value="" className="bg-gray-800 text-white">Select your position</option>
            {LOAN_OFFICER_POSITIONS.map(position => (
              <option key={position} value={position} className="bg-gray-800 text-white">{position}</option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-5 h-5 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
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

      <div>
        <Label htmlFor="department" className="text-white mb-2 block">
          Department/Branch
        </Label>
        <div className="relative">
          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          <Input
            id="department"
            type="text"
            value={formData.brokerageName || ''}
            onChange={(e) => handleInputChange('brokerageName', e.target.value)}
            className="pl-10 bg-white/10 border-white/30 text-white placeholder-white/60 focus:border-yellow-400"
            placeholder="e.g., Main Branch, Downtown Office"
          />
        </div>
        <p className="text-white/60 text-sm mt-1">
          Optional: Specify your department or branch location
        </p>
      </div>

      <div className="bg-white/10 rounded-lg p-4 border border-white/20">
        <h4 className="text-white font-semibold mb-2">What you'll have access to:</h4>
        <ul className="text-white/80 text-sm space-y-1">
          <li>• View and manage all realtor loan submissions</li>
          <li>• Access comprehensive loan application details</li>
          <li>• Track loan progress and update statuses</li>
          <li>• Review pre-qualified buyers from realtors</li>
          <li>• Administrative dashboard with analytics</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default RegistrationStepTwoLoanOfficer;