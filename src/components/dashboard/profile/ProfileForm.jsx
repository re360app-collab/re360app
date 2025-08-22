import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Facebook, Instagram, Linkedin, Save } from 'lucide-react';

const ProfileForm = ({ isEditing, profileData, setProfileData, onSave, onCancel }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
    >
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">Profile Information</h3>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName" className="text-gray-700 dark:text-gray-300">Full Name</Label>
            <Input
              id="fullName"
              value={profileData.fullName}
              onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
              disabled={!isEditing}
              className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">Email</Label>
            <Input
              id="email"
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              disabled={!isEditing}
              className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
            />
          </div>
          <div>
            <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">Phone</Label>
            <Input
              id="phone"
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              disabled={!isEditing}
              className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
            />
          </div>
          <div>
            <Label htmlFor="licenseNumber" className="text-gray-700 dark:text-gray-300">License Number</Label>
            <Input
              id="licenseNumber"
              value={profileData.licenseNumber}
              onChange={(e) => setProfileData({ ...profileData, licenseNumber: e.target.value })}
              disabled={!isEditing}
              className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
            />
          </div>
          <div>
            <Label htmlFor="state" className="text-gray-700 dark:text-gray-300">State</Label>
            <Input
              id="state"
              value={profileData.state}
              onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
              disabled={!isEditing}
              className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
            />
          </div>
          <div>
            <Label htmlFor="brokerage" className="text-gray-700 dark:text-gray-300">Brokerage</Label>
            <Input
              id="brokerage"
              value={profileData.brokerage}
              onChange={(e) => setProfileData({ ...profileData, brokerage: e.target.value })}
              disabled={!isEditing}
              className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="bio" className="text-gray-700 dark:text-gray-300">Professional Bio</Label>
          <textarea
            id="bio"
            value={profileData.bio}
            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
            disabled={!isEditing}
            rows={4}
            className="w-full px-3 py-2 border rounded-md text-sm disabled:bg-gray-50 disabled:text-gray-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
            placeholder="Tell potential clients about your experience and expertise..."
          />
        </div>

        <div>
          <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Social Media Links</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="facebook" className="flex items-center text-gray-700 dark:text-gray-300">
                <Facebook className="mr-2 text-blue-600" size={16} />
                Facebook
              </Label>
              <Input
                id="facebook"
                value={profileData.socialMedia.facebook}
                onChange={(e) => setProfileData({
                  ...profileData,
                  socialMedia: { ...profileData.socialMedia, facebook: e.target.value }
                })}
                disabled={!isEditing}
                placeholder="Facebook profile URL"
                className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
              />
            </div>
            <div>
              <Label htmlFor="instagram" className="flex items-center text-gray-700 dark:text-gray-300">
                <Instagram className="mr-2 text-pink-600" size={16} />
                Instagram
              </Label>
              <Input
                id="instagram"
                value={profileData.socialMedia.instagram}
                onChange={(e) => setProfileData({
                  ...profileData,
                  socialMedia: { ...profileData.socialMedia, instagram: e.target.value }
                })}
                disabled={!isEditing}
                placeholder="Instagram profile URL"
                className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
              />
            </div>
            <div>
              <Label htmlFor="linkedin" className="flex items-center text-gray-700 dark:text-gray-300">
                <Linkedin className="mr-2 text-blue-700" size={16} />
                LinkedIn
              </Label>
              <Input
                id="linkedin"
                value={profileData.socialMedia.linkedin}
                onChange={(e) => setProfileData({
                  ...profileData,
                  socialMedia: { ...profileData.socialMedia, linkedin: e.target.value }
                })}
                disabled={!isEditing}
                placeholder="LinkedIn profile URL"
                className="bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="autoPost"
              checked={profileData.autoPost}
              onCheckedChange={(checked) => setProfileData({ ...profileData, autoPost: checked })}
              disabled={!isEditing}
              className="border-gray-300 dark:border-gray-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
            />
            <Label htmlFor="autoPost" className="text-sm text-gray-700 dark:text-gray-300">
              Auto-post RE360App promotional content to my social media
            </Label>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            We'll automatically share relevant content to help promote your services and the RE360App platform.
          </p>
        </div>

        {isEditing && (
          <div className="flex space-x-4">
            <Button
              onClick={onSave}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
            >
              <Save className="mr-2" size={18} />
              Save Changes
            </Button>
            <Button
              onClick={onCancel}
              variant="outline"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProfileForm;