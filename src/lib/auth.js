import { supabase } from '@/lib/customSupabaseClient';
import { getFullUserProfile as fetchFullUserProfile } from '@/lib/profiles';

export const signUp = async (email, password, phone, metadata = {}, options = {}) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      phone,
      options: {
        data: metadata,
        emailRedirectTo: options.emailRedirectTo || `${window.location.origin}/dashboard/profile?setup=true`,
      }
    });

    if (error) {
      console.error('SignUp auth error:', error);
    }
    return { data, error };

  } catch (error) {
    console.error('SignUp process exception:', error);
    return { data: null, error };
  }
};

export const signIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    return { data, error };
  } catch (error) {
    console.error('SignIn error:', error);
    return { data: null, error };
  }
};

export const signInWithPhone = async (phone) => {
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      phone,
      options: {
        channel: 'sms'
      }
    });
    return { data, error };
  } catch (error) {
    console.error('SignIn with phone error:', error);
    return { data: null, error };
  }
};

export const verifyOtp = async (phone, token) => {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: 'sms'
    });
    return { data, error };
  } catch (error) {
    console.error('Verify OTP error:', error);
    return { data: null, error };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    return { error };
  } catch (error) {
    console.error('SignOut error:', error);
    return { error };
  }
};

export const getCurrentUser = async () => {
  try {
    const { data: { user } , error } = await supabase.auth.getUser();
    return { data: { user }, error };
  } catch (error) {
    console.error('Get current user error:', error);
    return { data: { user: null }, error };
  }
};

export const getSession = async () => {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    return { data: { session }, error };
  } catch (error) {
    console.error('Get session error:', error);
    return { data: { session: null }, error };
  }
};

export const signInWithGoogle = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: `${window.location.origin}/dashboard` }
    });
    return { error };
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    return { error };
  }
};

export const resendConfirmationEmail = async (email) => {
  try {
    const { data, error } = await supabase.auth.resend({
      type: 'signup',
      email: email,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard/profile?setup=true`
      }
    });
    return { data, error };
  } catch (error) {
    console.error('Resend confirmation email error:', error);
    return { data: null, error };
  }
};

export const sendPasswordResetEmail = async (email) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });
    return { data, error };
  } catch (error) {
    console.error('Send password reset email error:', error);
    return { data: null, error };
  }
};

export const getFullUserProfile = async (userId) => {
    return await fetchFullUserProfile(userId, supabase);
};