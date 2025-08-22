import React, { useState } from 'react';
import RegistrationStepOne from '@/components/auth/RegistrationStepOne';
import RegistrationStepTwoRealtor from '@/components/auth/RegistrationStepTwoRealtor';
import RegistrationStepTwoLoanOfficer from '@/components/auth/RegistrationStepTwoLoanOfficer';
import RegistrationStepThree from '@/components/auth/RegistrationStepThree';

export const RegistrationSteps = ({
  currentStep,
  formData,
  handleInputChange,
  handleGoalChange,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword
}) => {
  const [userType, setUserType] = useState('realtor');

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <RegistrationStepOne
            formData={formData}
            handleInputChange={handleInputChange}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
            userType={userType}
            setUserType={setUserType}
          />
        );
      case 2:
        if (userType === 'loan_officer') {
          return (
            <RegistrationStepTwoLoanOfficer
              formData={formData}
              handleInputChange={handleInputChange}
            />
          );
        } else {
          return (
            <RegistrationStepTwoRealtor
              formData={formData}
              handleInputChange={handleInputChange}
            />
          );
        }
      case 3:
        return (
          <RegistrationStepThree
            formData={formData}
            handleInputChange={handleInputChange}
            handleGoalChange={handleGoalChange}
            userType={userType}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {renderStep()}
      {/* Pass userType to parent component for validation */}
      <input type="hidden" value={userType} onChange={() => handleInputChange('userType', userType)} />
    </div>
  );
};