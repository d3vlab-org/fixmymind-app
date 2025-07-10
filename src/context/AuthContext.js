import React, { useState, useEffect, createContext, useContext } from 'react';
import { Alert } from 'react-native';
import { auth } from '../utils/auth/firebase'; // uniwersalny import

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (u) => {
            setUser(u);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error('Login error:', error);
            Alert.alert('Błąd logowania', error.message);
        }
    };

    const register = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('Registered user:', user.uid);
            setUser(user);
            return true;
        } catch (error) {
            console.error('Registration error:', error);
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('Adres e-mail jest już używany.');
            } else if (error.code === 'auth/invalid-email') {
                Alert.alert('Nieprawidłowy adres e-mail.');
            } else if (error.code === 'auth/weak-password') {
                Alert.alert('Hasło musi mieć przynajmniej 6 znaków.');
            } else {
                Alert.alert('Nie udało się zarejestrować. Spróbuj ponownie później.');
            }
            return false;
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    if (loading) return null;

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);