// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  supabase,
  loginWithEmailPassword,
  loginWithGoogle,
  signUp,
  logout as supabaseLogout,
  getUser,
  getSession,
  onAuthStateChange
} from '../utils/SupabaseService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);         // Supabase user object
    const [token, setToken] = useState(null);       // JWT from Supabase
    const [loading, setLoading] = useState(true);   // Loading state for auth check

    // Initialize auth state
    useEffect(() => {
        // Get the current session when the component mounts
        const initializeAuth = async () => {
            try {
                setLoading(true);
                // Get current session
                const session = await getSession();
                if (session) {
                    setUser(session.user);
                    setToken(session.access_token);
                }
                // Get current user as fallback
                if (!session) {
                    const currentUser = await getUser();
                    if (currentUser) {
                        setUser(currentUser);
                        // We don't have the token here, it would be in the session
                    }
                }
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
                setToken(session.access_token);
            } else if (event === 'SIGNED_OUT') {
                setUser(null);
                setToken(null);
            } else if (event === 'USER_UPDATED' && session?.user) {
                setUser(session.user);
                setToken(session.access_token);
            } else if (event === 'TOKEN_REFRESHED' && session) {
                setToken(session.access_token);
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
            setToken(data.session?.access_token);
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
            setToken(data.session?.access_token);
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

    // Logout
    const logout = async () => {
        try {
            setLoading(true);
            await supabaseLogout();
            setUser(null);
            setToken(null);
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            token,
            setToken,
            loading,
            setLoading,
            login,
            register,
            logout,
            loginWithGoogle: loginWithGoogleAuth,
            getUser: () => user,
            supabase
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
