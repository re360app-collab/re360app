import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { User, Camera, MapPin, Award, Share2 } from 'lucide-react';

const ProfileCard = ({ profileData, onUploadPhoto, onShareProfile }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="lg:col-span-1 bg-white rounded-xl p-6 shadow-lg"
    >
      <div className="text-center">
        <div className="relative inline-block mb-4">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {profileData.fullName.charAt(0)}
          </div>
          <button
            onClick={onUploadPhoto}
            className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors"
          >
            <Camera size={16} />
          </button>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-1">{profileData.fullName}</h3>
        <p className="text-gray-600 mb-2">{profileData.position}</p>
        <p className="text-sm text-gray-500 mb-4">{profileData.brokerage}</p>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center justify-center">
            <MapPin className="mr-2" size={14} />
            {profileData.state}
          </div>
          <div className="flex items-center justify-center">
            <Award className="mr-2" size={14} />
            License #{profileData.licenseNumber}
          </div>
        </div>

        <Button
          onClick={onShareProfile}
          className="w-full mt-4"
          variant="outline"
        >
          <Share2 className="mr-2" size={16} />
          Share Profile
        </Button>
      </div>
    </motion.div>
  );
};

export default ProfileCard;