import React from 'react';
import { motion } from 'framer-motion';
import { User, Camera, Award, TrendingUp, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProfileHeader = ({ profileData, isEditing, onEdit, onSave, onCancel, onProfilePictureUpload }) => {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              {profileData.profilePicture ? (
                <img 
                  src={profileData.profilePicture} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-white" />
              )}
            </div>
            <button
              onClick={onProfilePictureUpload}
              className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors"
            >
              <Camera className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          <div>
            <h1 className="text-3xl font-bold mb-2">
              {profileData.firstName} {profileData.lastName}
            </h1>
            <p className="text-blue-100 text-lg">{profileData.position}</p>
            <p className="text-blue-200">{profileData.brokerageName}</p>
          </div>
        </div>

        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                className="bg-white text-purple-600 hover:bg-gray-100"
                onClick={onSave}
              >
                Save Changes
              </Button>
            </>
          ) : (
            <Button
              className="bg-white text-purple-600 hover:bg-gray-100"
              onClick={onEdit}
            >
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <Award className="w-8 h-8 text-yellow-300" />
            <div>
              <p className="text-2xl font-bold">
                {JSON.parse(localStorage.getItem('re360_learning_progress') || '{}') ? 
                  Object.values(JSON.parse(localStorage.getItem('re360_learning_progress') || '{}')).filter(p => p.completed).length : 0}
              </p>
              <p className="text-blue-100 text-sm">Courses Completed</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-green-300" />
            <div>
              <p className="text-2xl font-bold">
                {JSON.parse(localStorage.getItem('re360_buyers') || '[]').filter(b => b.status === 'Qualified').length}
              </p>
              <p className="text-blue-100 text-sm">Qualified Buyers</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <Target className="w-8 h-8 text-orange-300" />
            <div>
              <p className="text-2xl font-bold">
                {Object.values(profileData.goals).filter(Boolean).length}
              </p>
              <p className="text-blue-100 text-sm">Active Goals</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;