import React from 'react';
import { motion } from 'framer-motion';
import { Award, MapPin, Building, Target } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
  'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky',
  'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
  'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
  'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
  'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
];

const POSITIONS = [
  'Real Estate Agent',
  'Broker',
  'Team Leader',
  'Other'
];

const RegistrationStepTwoRealtor = ({ formData, handleInputChange }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div>
        <Label htmlFor="licenseNumber" className="text-white mb-2 block">
          License Number
        </Label>
        <div className="relative">
          <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          <Input
            id="licenseNumber"
            type="text"
            value={formData.licenseNumber}
            onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
            className="pl-10 bg-white/10 border-white/30 text-white placeholder-white/60 focus:border-yellow-400"
            placeholder="Enter your license number (optional)"
          />
        </div>
        <p className="text-white/60 text-sm mt-1">
          License number is optional and can be added later in your profile.
        </p>
      </div>

      <div>
        <Label htmlFor="stateOfLicensure" className="text-white mb-2 block">
          State of Licensure *
        </Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5 z-10" />
          <select
            id="stateOfLicensure"
            value={formData.stateOfLicensure}
            onChange={(e) => handleInputChange('stateOfLicensure', e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/30 text-white rounded-md focus:border-yellow-400 focus:outline-none appearance-none"
            required
          >
            <option value="" className="bg-gray-800 text-white">Select your state</option>
            {US_STATES.map(state => (
              <option key={state} value={state} className="bg-gray-800 text-white">{state}</option>
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
        <Label htmlFor="brokerageName" className="text-white mb-2 block">
          Brokerage Name *
        </Label>
        <div className="relative">
          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-5 h-5" />
          <Input
            id="brokerageName"
            type="text"
            value={formData.brokerageName}
            onChange={(e) => handleInputChange('brokerageName', e.target.value)}
            className="pl-10 bg-white/10 border-white/30 text-white placeholder-white/60 focus:border-yellow-400"
            placeholder="Your brokerage name"
            required
          />
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
            className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/30 text-white rounded-md focus:border-yellow-400 focus:outline-none appearance-none"
            required
          >
            <option value="" className="bg-gray-800 text-white">Select your position</option>
            {POSITIONS.map(position => (
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
    </motion.div>
  );
};

export default RegistrationStepTwoRealtor;