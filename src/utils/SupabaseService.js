import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://kllkdlusdharsschouuq.supabase.co';
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsbGtkbHVzZGhhcnNzY2hvdXVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2ODM1OTYsImV4cCI6MjA2ODI1OTU5Nn0.YD-qT8MfnEbxWwqY_z5ZacqFB2411FIN413Fh9LiudA';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Login with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise} - Supabase auth response
 */
const loginWithEmailPassword = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error logging in with email and password:', error.message);
    throw error;
  }
};

/**
 * Login with Google OAuth
 * @returns {Promise} - Supabase auth response
 */
const loginWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error logging in with Google:', error.message);
    throw error;
  }
};

/**
 * Login with phone number
 * @param {string} phone - User's phone number
 * @returns {Promise} - Supabase auth response
 */
const loginWithPhone = async (phone) => {
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      phone,
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error logging in with phone:', error.message);
    throw error;
  }
};

/**
 * Sign up with email and password
 * @param {string} email - User's email
 * @param {string} password - User's password
 * @returns {Promise} - Supabase auth response
 */
const signUp = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error signing up:', error.message);
    throw error;
  }
};

/**
 * Logout the current user
 * @returns {Promise} - Supabase auth response
 */
const logout = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error logging out:', error.message);
    throw error;
  }
};

/**
 * Get the current session
 * @returns {Promise} - Supabase session
 */
const getSession = async () => {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    return data.session;
  } catch (error) {
    console.error('Error getting session:', error.message);
    return null;
  }
};

/**
 * Get the current user
 * @returns {Promise} - Supabase user
 */
const getUser = async () => {
  try {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw error;
    return data.user;
  } catch (error) {
    console.error('Error getting user:', error.message);
    return null;
  }
};

/**
 * Subscribe to auth state changes
 * @param {Function} callback - Function to call when auth state changes
 * @returns {Function} - Unsubscribe function
 */
const onAuthStateChange = (callback) => {
  const { data } = supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
  
  return data.subscription.unsubscribe;
};

export {
  supabase,
  loginWithEmailPassword,
  loginWithGoogle,
  loginWithPhone,
  signUp,
  logout,
  getSession,
  getUser,
  onAuthStateChange
};