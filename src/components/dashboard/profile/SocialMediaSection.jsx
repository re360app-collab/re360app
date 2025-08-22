import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Share2, Facebook, Instagram, Linkedin, Globe } from 'lucide-react';

const SocialMediaSection = ({ profileData, isEditing, onInputChange }) => {
  return (
    <Card className="bg-white dark:bg-gray-800/50">
      <CardHeader>
        <CardTitle className="flex items-center text-lg font-semibold text-gray-900 dark:text-gray-100">
          <Share2 className="w-5 h-5 mr-3 text-green-500" />
          Social Media & Website
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="facebook" className="flex items-center">
            <Facebook className="w-4 h-4 mr-2 text-blue-600" />
            Facebook
          </Label>
          <Input
            id="facebook"
            value={profileData.socialMedia?.facebook || ''}
            onChange={(e) => onInputChange('socialMedia.facebook', e.target.value)}
            disabled={!isEditing}
            placeholder="https://facebook.com/yourprofile"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="instagram" className="flex items-center">
            <Instagram className="w-4 h-4 mr-2 text-pink-500" />
            Instagram
          </Label>
          <Input
            id="instagram"
            value={profileData.socialMedia?.instagram || ''}
            onChange={(e) => onInputChange('socialMedia.instagram', e.target.value)}
            disabled={!isEditing}
            placeholder="https://instagram.com/yourprofile"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="linkedin" className="flex items-center">
            <Linkedin className="w-4 h-4 mr-2 text-blue-700" />
            LinkedIn
          </Label>
          <Input
            id="linkedin"
            value={profileData.socialMedia?.linkedin || ''}
            onChange={(e) => onInputChange('socialMedia.linkedin', e.target.value)}
            disabled={!isEditing}
            placeholder="https://linkedin.com/in/yourprofile"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website" className="flex items-center">
            <Globe className="w-4 h-4 mr-2 text-gray-500" />
            Personal Website
          </Label>
          <Input
            id="website"
            value={profileData.socialMedia?.website || ''}
            onChange={(e) => onInputChange('socialMedia.website', e.target.value)}
            disabled={!isEditing}
            placeholder="https://yourwebsite.com"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialMediaSection;