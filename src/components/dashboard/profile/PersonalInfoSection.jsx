import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { User } from 'lucide-react';

const PersonalInfoSection = ({ profileData, isEditing, onInputChange }) => {
  return (
    <Card className="bg-white dark:bg-gray-800/50">
      <CardHeader>
        <CardTitle className="flex items-center text-lg font-semibold text-gray-900 dark:text-gray-100">
          <User className="w-5 h-5 mr-3 text-blue-500" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={profileData.firstName}
              onChange={(e) => onInputChange('firstName', e.target.value)}
              disabled={!isEditing}
              placeholder="Enter your first name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={profileData.lastName}
              onChange={(e) => onInputChange('lastName', e.target.value)}
              disabled={!isEditing}
              placeholder="Enter your last name"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            value={profileData.email}
            disabled={true}
            placeholder="your.email@example.com"
            className="cursor-not-allowed bg-gray-100 dark:bg-gray-700/50"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={profileData.phone}
            onChange={(e) => onInputChange('phone', e.target.value)}
            disabled={!isEditing}
            placeholder="Enter your phone number"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalInfoSection;