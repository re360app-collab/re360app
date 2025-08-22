import React from 'react';
import { Navigate } from 'react-router-dom';

// This component is being replaced by AdminLeadsOverview.jsx
// It will redirect to the new admin leads page.
const AdminBuyersOverview = () => {
  return <Navigate to="/dashboard/admin/leads" replace />;
};

export default AdminBuyersOverview;