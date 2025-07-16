// src/screens/Register.js
import React, { useState } from 'react';
import { TextInput, Button, View, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { signUp } from '../utils/SupabaseService';

export default function Register() {
    const { setUser, setToken } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = async () => {
        try {
            const data = await signUp(email, password);
            setUser(data.user);
            // Supabase stores the session token in data.session.access_token
            if (data.session) {
                setToken(data.session.access_token);
            }
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
