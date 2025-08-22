import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';

const LoginFormWrapper = () => {
  const navigate = useNavigate();
  
  return (
    <LoginForm 
      onSwitchToRegister={() => navigate('/register')}
      onBack={() => navigate('/')}
    />
  );
};

const RegisterFormWrapper = () => {
  const navigate = useNavigate();
  
  return (
    <RegisterForm 
      onSwitchToLogin={() => navigate('/login')}
      onBack={() => navigate('/')}
    />
  );
};

export { LoginFormWrapper as LoginForm, RegisterFormWrapper as RegisterForm };