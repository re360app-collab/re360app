import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Briefcase } from 'lucide-react';

const ProfessionalInfoSection = ({ profileData, isEditing, onInputChange }) => {
  const experienceLevels = [
    "New Agent (Less than 1 year)",
    "Intermediate (1-3 years)",
    "Experienced (3-5 years)",
    "Veteran (5+ years)",
    "Top Producer (10+ years)"
  ];

  const homesClosedYearly = [
    "0-5",
    "6-10",
    "11-20",
    "21-50",
    "50+"
  ];

  return (
    <Card className="bg-white dark:bg-gray-800/50">
      <CardHeader>
        <CardTitle className="flex items-center text-lg font-semibold text-gray-900 dark:text-gray-100">
          <Briefcase className="w-5 h-5 mr-3 text-purple-500" />
          Professional Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="brokerageName">Brokerage Name</Label>
          <Input
            id="brokerageName"
            value={profileData.brokerageName}
            onChange={(e) => onInputChange('brokerageName', e.target.value)}
            disabled={!isEditing}
            placeholder="Enter your brokerage name"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="licenseNumber">License Number</Label>
            <Input
              id="licenseNumber"
              value={profileData.licenseNumber}
              onChange={(e) => onInputChange('licenseNumber', e.target.value)}
              disabled={!isEditing}
              placeholder="Enter your license number"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="stateOfLicensure">State of Licensure</Label>
            <Input
              id="stateOfLicensure"
              value={profileData.stateOfLicensure}
              onChange={(e) => onInputChange('stateOfLicensure', e.target.value)}
              disabled={!isEditing}
              placeholder="e.g., California"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="experienceLevel">Experience Level</Label>
          <Select
            value={profileData.experienceLevel}
            onValueChange={(value) => onInputChange('experienceLevel', value)}
            disabled={!isEditing}
          >
            <SelectTrigger id="experienceLevel">
              <SelectValue placeholder="Select your experience level" />
            </SelectTrigger>
            <SelectContent>
              {experienceLevels.map((level) => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="avg_homes_closed_yearly">Average Homes Closed Yearly</Label>
          <Select
            value={profileData.avg_homes_closed_yearly}
            onValueChange={(value) => onInputChange('avg_homes_closed_yearly', value)}
            disabled={!isEditing}
          >
            <SelectTrigger id="avg_homes_closed_yearly">
              <SelectValue placeholder="Select your average closings" />
            </SelectTrigger>
            <SelectContent>
              {homesClosedYearly.map((range) => (
                <SelectItem key={range} value={range}>{range}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfessionalInfoSection;