import React from 'react';
    import { motion } from 'framer-motion';
    import { AlertTriangle, X } from 'lucide-react';
    import { Button } from '@/components/ui/button';
    import { useNavigate } from 'react-router-dom';
    import { useProfileCompletion } from '@/hooks/useProfileCompletion';
    import { useAuth } from '@/contexts/SupabaseAuthContext';

    const ProfileSetupBanner = ({ onDismiss }) => {
      const navigate = useNavigate();
      const { userProfile } = useAuth();
      const { isProfileComplete, missingFields, completionPercentage } = useProfileCompletion(userProfile);

      if (isProfileComplete) {
        return null;
      }

      const handleCompleteProfile = () => {
        navigate('/dashboard/profile');
      };

      return (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-lg shadow-lg relative"
        >
          <button
            onClick={onDismiss}
            className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors"
            aria-label="Dismiss"
          >
            <X size={20} />
          </button>
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-white/20 rounded-full p-2 mr-4">
              <AlertTriangle size={24} />
            </div>
            <div className="flex-grow">
              <h3 className="font-bold text-lg">Complete Your Profile to Get Started</h3>
              <p className="text-sm mt-1">
                You need to complete your professional information before you can submit buyers for pre-qualification or access all features.
              </p>
              <div className="mt-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Profile Completion</span>
                  <span className="text-sm font-bold">{completionPercentage}%</span>
                </div>
                <div className="w-full bg-white/30 rounded-full h-2.5">
                  <div
                    className="bg-white h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${completionPercentage}%` }}
                  ></div>
                </div>
              </div>
              {missingFields.length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium mb-2">Missing Information:</p>
                  <div className="flex flex-wrap gap-2">
                    {missingFields.map((field) => (
                      <span key={field} className="bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                        {field}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <Button
                onClick={handleCompleteProfile}
                className="mt-4 bg-white text-orange-600 hover:bg-gray-100 font-bold"
              >
                Complete Profile Now &rarr;
              </Button>
            </div>
          </div>
        </motion.div>
      );
    };

    export default ProfileSetupBanner;