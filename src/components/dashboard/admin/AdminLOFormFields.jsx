import React from 'react';
import { User, Mail, Phone } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AdminLOFormFields = ({ formData, phoneDisplay, handleInputChange, handlePhoneDisplayChange, handlePhoneBlur }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="firstName" className="text-blue-100 mb-2 block font-medium">First Name *</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
            <Input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              placeholder="John"
              required
            />
          </div>
        </div>
        <div>
          <Label htmlFor="lastName" className="text-blue-100 mb-2 block font-medium">Last Name *</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
            <Input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Doe"
              required
            />
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="email" className="text-blue-100 mb-2 block font-medium">Email Address *</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            placeholder="john.doe@nmb.com"
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="phone" className="text-blue-100 mb-2 block font-medium">Phone Number *</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
          <Input
            id="phone"
            type="tel"
            value={phoneDisplay}
            onChange={handlePhoneDisplayChange}
            onBlur={handlePhoneBlur}
            className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            placeholder="e.g., (555) 123-4567"
            required
            maxLength={18} 
          />
        </div>
        <p className="text-blue-300/70 text-xs mt-1">Enter 10-digit US phone number. Example: (555) 123-4567 or +15551234567.</p>
      </div>
    </>
  );
};

export default AdminLOFormFields;