// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/auth/firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);         // Firebase user object
    const [token, setToken] = useState(null);       // JWT from Firebase
    const [loading, setLoading] = useState(true);   // Loading state for auth check

    // Listen to Firebase auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                setUser(firebaseUser);
                try {
                    const idToken = await firebaseUser.getIdToken();
                    setToken(idToken);
                } catch (error) {
                    console.error('Error getting ID token:', error);
                }
            } else {
                setUser(null);
                setToken(null);
            }
            setLoading(false);
        });

        return unsubscribe; // Cleanup subscription on unmount
    }, []);

    const logout = async () => {
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            setUser,
            token,
            setToken,
            loading,
            setLoading,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);