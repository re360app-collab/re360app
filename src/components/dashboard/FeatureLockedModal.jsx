import React from 'react';
import { motion } from 'framer-motion';
import { Lock, User, Building, Award, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const FeatureLockedModal = ({ isOpen, onClose, featureName, userProfile }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const getMissingFields = () => {
    const missing = [];
    if (!userProfile?.license_number) missing.push({ name: 'License Number', icon: Award });
    if (!userProfile?.state_of_licensure) missing.push({ name: 'State of Licensure', icon: MapPin });
    if (!userProfile?.brokerage_name) missing.push({ name: 'Brokerage Name', icon: Building });
    if (!userProfile?.experience_level) missing.push({ name: 'Experience Level', icon: User });
    return missing;
  };

  const missingFields = getMissingFields();

  const handleCompleteProfile = () => {
    onClose();
    navigate('/dashboard/profile');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
      >
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-orange-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Feature Locked</h2>
          <p className="text-gray-600">
            Complete your profile to access <strong>{featureName}</strong> and start working with buyers.
          </p>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Missing Information:</h3>
          <div className="space-y-3">
            {missingFields.map((field, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <field.icon className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">{field.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Button
            onClick={handleCompleteProfile}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3"
          >
            Complete Profile Now
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full"
          >
            Maybe Later
          </Button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Why is this required?</strong> Complete profile information helps us provide better loan matching and ensures compliance with lending regulations.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default FeatureLockedModal;