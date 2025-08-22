import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const CatchAllRedirect = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return null; 
    }

    return <Navigate to={user ? "/dashboard" : "/"} replace />;
};

export default CatchAllRedirect;