import { useState } from 'react';

export const useRegistrationForm = (userType) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    userType: userType || 'realtor',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    position: '',
    brokerageName: '',
    stateOfLicensure: '',
    licenseNumber: '',
    experienceLevel: 'Beginner',
    goals: [],
    socialMedia: {
      linkedin: '',
      facebook: '',
      instagram: '',
      twitter: ''
    }
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field, value) => {
    if (field.startsWith('socialMedia.')) {
      const key = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialMedia: { ...prev.socialMedia, [key]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleGoalChange = (goal) => {
    setFormData(prev => {
      const newGoals = prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal];
      return { ...prev, goals: newGoals };
    });
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.password && formData.confirmPassword;
      case 2:
        return formData.brokerageName && formData.stateOfLicensure && formData.position;
      case 3:
        return true; // Goals/social media are optional
      default:
        return false;
    }
  };

  return {
    currentStep,
    setCurrentStep,
    formData,
    setFormData,
    handleInputChange,
    handleGoalChange,
    validateStep,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword
  };
};