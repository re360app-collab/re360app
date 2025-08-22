import { useMemo } from 'react';

export const useProfileCompletion = (userProfile) => {
  const completionStatus = useMemo(() => {
    if (!userProfile) {
      return {
        isProfileComplete: false,
        missingFields: ['all'],
        completionPercentage: 0,
      };
    }

    const {
      position,
    } = userProfile;

    const requiredFields = {
      'Real Estate Agent': [
        { key: 'first_name', label: 'First Name' },
        { key: 'last_name', label: 'Last Name' },
        { key: 'phone', label: 'Phone Number' },
        { key: 'state_of_licensure', label: 'State of Licensure' },
        { key: 'brokerage_name', label: 'Brokerage Name' },
        { key: 'experience_level', label: 'Experience Level' },
        { key: 'avg_homes_closed_yearly', label: 'Avg Homes Closed Yearly' },
      ],
      'Loan Officer': [
        { key: 'first_name', label: 'First Name' },
        { key: 'last_name', label: 'Last Name' },
        { key: 'phone', label: 'Phone Number' },
        { key: 'license_number', label: 'License Number' },
        { key: 'state_of_licensure', label: 'State of Licensure' },
      ],
      'System Admin': [],
      'NMB Admin': [],
    };

    const fieldsForRole = requiredFields[position] || [];
    if (fieldsForRole.length === 0) {
      return {
        isProfileComplete: true,
        missingFields: [],
        completionPercentage: 100,
      };
    }

    const missingFields = [];
    let completedCount = 0;

    fieldsForRole.forEach(field => {
      const value = userProfile[field.key];
      let isMissing = false;
      
      if (!value) {
        isMissing = true;
      } else {
        const stringValue = String(value).trim();
        if (stringValue === '' || stringValue === '.' || stringValue === 'null' || stringValue === 'undefined') {
          isMissing = true;
        }
      }

      if (isMissing) {
        missingFields.push(field.label);
      } else {
        completedCount++;
      }
    });

    const totalFields = fieldsForRole.length;
    const completionPercentage = totalFields > 0 ? Math.round((completedCount / totalFields) * 100) : 100;
    const isProfileComplete = missingFields.length === 0 && completionPercentage === 100;

    return {
      isProfileComplete,
      missingFields,
      completionPercentage,
    };
  }, [userProfile]);

  return completionStatus;
};