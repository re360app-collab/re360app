import React from 'react';
import DashboardHome from '@/components/dashboard/DashboardHome';

const Dashboard = ({ user, userProfile }) => {
  return <DashboardHome user={user} userProfile={userProfile} />;
};

export default Dashboard;