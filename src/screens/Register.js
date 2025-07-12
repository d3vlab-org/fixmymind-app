// src/screens/Register.js
import React, { useState } from 'react';
import { TextInput, Button, View, Text } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';
import { auth } from '../utils/auth/firebase';

export default function Register() {
    const { setUser, setToken } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();
            setUser(userCredential.user);
            setToken(token);
        } catch (err) {
            console.error('Błąd rejestracji:', err);
        }
    };

    return (
        <View className="flex-1 items-center justify-center bg-black p-4">
            <Text className="text-white text-2xl mb-6">Zarejestruj się</Text>
            <TextInput
                placeholder="Email"
                placeholderTextColor="#ccc"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                className="w-full bg-white rounded p-2 mb-2"
            />
            <TextInput
                placeholder="Hasło"
                placeholderTextColor="#ccc"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                className="w-full bg-white rounded p-2 mb-4"
            />
            <Button title="Zarejestruj" onPress={register} />
        </View>
    );
}
