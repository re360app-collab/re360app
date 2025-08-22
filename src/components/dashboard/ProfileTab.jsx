import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import ProfileCard from '@/components/dashboard/profile/ProfileCard';
import ProfileForm from '@/components/dashboard/profile/ProfileForm';
import ProfileStats from '@/components/dashboard/profile/ProfileStats';
import ProfileAchievements from '@/components/dashboard/profile/ProfileAchievements';

const ProfileTab = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const [profileData, setProfileData] = useState({
    fullName: user.fullName || '',
    email: user.email || '',
    phone: user.phone || '',
    licenseNumber: user.licenseNumber || '',
    state: user.state || '',
    brokerage: user.brokerage || '',
    position: user.position || '',
    experience: user.experience || '',
    bio: user.bio || 'Dedicated real estate professional committed to helping clients achieve their homeownership dreams.',
    socialMedia: {
      facebook: user.socialMedia?.facebook || '',
      instagram: user.socialMedia?.instagram || '',
      linkedin: user.socialMedia?.linkedin || '',
    },
    autoPost: user.autoPost || false,
  });

  const handleSave = () => {
    const users = JSON.parse(localStorage.getItem('re360_users') || '[]');
    const updatedUsers = users.map(u => 
      u.id === user.id ? { ...u, ...profileData } : u
    );
    localStorage.setItem('re360_users', JSON.stringify(updatedUsers));
    localStorage.setItem('re360_user', JSON.stringify({ ...user, ...profileData }));

    toast({
      title: "Profile Updated! 🎉",
      description: "Your profile information has been saved successfully.",
    });
    setIsEditing(false);
  };

  const handleUploadPhoto = () => {
    toast({
      title: "🚧 Photo Upload",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  const handleShareProfile = () => {
    toast({
      title: "🚧 Share Profile",
      description: "This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀",
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Settings size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Profile Management</h1>
              <p className="text-indigo-100">Manage your professional profile and settings</p>
            </div>
          </div>
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-white text-indigo-600 hover:bg-indigo-50"
          >
            <Settings className="mr-2" size={18} />
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProfileCard
          profileData={profileData}
          onUploadPhoto={handleUploadPhoto}
          onShareProfile={handleShareProfile}
        />
        <ProfileForm
          isEditing={isEditing}
          profileData={profileData}
          setProfileData={setProfileData}
          onSave={handleSave}
          onCancel={() => setIsEditing(false)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfileStats />
        <ProfileAchievements />
      </div>
    </div>
  );
};

export default ProfileTab;