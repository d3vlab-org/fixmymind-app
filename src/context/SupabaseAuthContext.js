// src/context/SupabaseAuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  supabase,
  loginWithEmailPassword,
  loginWithGoogle,
  loginWithPhone,
  signUp,
  logout as supabaseLogout,
  getUser,
  onAuthStateChange
} from '../utils/SupabaseService';

// Create the context
const SupabaseAuthContext = createContext();

export const SupabaseAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state
  useEffect(() => {
    // Get the current user when the component mounts
    const initializeAuth = async () => {
      try {
        setLoading(true);
        const currentUser = await getUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Subscribe to auth state changes
    const unsubscribe = onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      } else if (event === 'USER_UPDATED' && session?.user) {
        setUser(session.user);
      }
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  // Login with email and password
  const login = async (email, password) => {
    try {
      setLoading(true);
      const data = await loginWithEmailPassword(email, password);
      setUser(data.user);
      return data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register with email and password
  const register = async (email, password) => {
    try {
      setLoading(true);
      const data = await signUp(email, password);
      setUser(data.user);
      return data;
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login with Google
  const loginWithGoogleAuth = async () => {
    try {
      setLoading(true);
      const data = await loginWithGoogle();
      return data;
    } catch (error) {
      console.error('Error logging in with Google:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Login with phone
  const loginWithPhoneAuth = async (phone) => {
    try {
      setLoading(true);
      const data = await loginWithPhone(phone);
      return data;
    } catch (error) {
      console.error('Error logging in with phone:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      setLoading(true);
      await supabaseLogout();
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Context value
  const value = {
    user,
    loading,
    login,
    register,
    logout,
    loginWithGoogle: loginWithGoogleAuth,
    loginWithPhone: loginWithPhoneAuth,
    supabase
  };

  return (
    <SupabaseAuthContext.Provider value={value}>
      {children}
    </SupabaseAuthContext.Provider>
  );
};

// Custom hook to use the Supabase auth context
export const useSupabaseAuth = () => {
  const context = useContext(SupabaseAuthContext);
  if (context === undefined) {
    throw new Error('useSupabaseAuth must be used within a SupabaseAuthProvider');
  }
  return context;
};