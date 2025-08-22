import React, { createContext, useState, useEffect, useContext, useMemo, useCallback } from 'react';
import { supabase } from '@/lib/customSupabaseClient';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshUserProfile = useCallback(async (userId) => {
    if (!userId) {
      setUserProfile(null);
      return null;
    }
    try {
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') { // Ignore "No rows found" error, it's a valid state
        console.error('Error refreshing user profile:', error);
        setUserProfile(null);
        return null;
      }
      
      setUserProfile(profile);
      return profile;
    } catch (e) {
      console.error("Exception while refreshing profile:", e);
      setUserProfile(null);
      return null;
    }
  }, []);

  useEffect(() => {
    const checkInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        await refreshUserProfile(currentUser.id);
      }
      setLoading(false);
    };

    checkInitialSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setLoading(true);
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        if (currentUser) {
          await refreshUserProfile(currentUser.id);
        } else {
          setUserProfile(null);
        }
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [refreshUserProfile]);

  const isAdmin = useMemo(() => {
    if (!userProfile) return false;
    return ['System Admin', 'NMB Admin'].includes(userProfile.position);
  }, [userProfile]);

  const value = {
    user,
    userProfile,
    isAdmin,
    loading,
    supabase,
    refreshUserProfile: () => user ? refreshUserProfile(user.id) : Promise.resolve(null),
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};