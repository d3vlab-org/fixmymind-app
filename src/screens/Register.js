// src/screens/Register.js
import React, { useState } from 'react';
import { TextInput, Button, View, Text, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { signUp, signUpWithPhone, signUpWithGoogle, signUpWithFacebook } from '../utils/SupabaseService';

export default function Register() {
    const { setUser, setToken } = useAuth();
    const [registrationMethod, setRegistrationMethod] = useState('email'); // 'email' or 'phone'
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAuthSuccess = (data) => {
        setUser(data.user);
        if (data.session) {
            setToken(data.session.access_token);
        }
    };

    const handleAuthError = (error, method) => {
        console.error(`Błąd rejestracji ${method}:`, error);
        Alert.alert('Błąd rejestracji', error.message || 'Wystąpił nieoczekiwany błąd');
    };

    const registerWithEmail = async () => {
        if (!email || !password) {
            Alert.alert('Błąd', 'Proszę wypełnić wszystkie pola');
            return;
        }
        
        setLoading(true);
        try {
            const data = await signUp(email, password);
            handleAuthSuccess(data);
        } catch (err) {
            handleAuthError(err, 'email');
        } finally {
            setLoading(false);
        }
    };

    const registerWithPhone = async () => {
        if (!phone) {
            Alert.alert('Błąd', 'Proszę podać numer telefonu');
            return;
        }
        
        setLoading(true);
        try {
            const data = await signUpWithPhone(phone);
            handleAuthSuccess(data);
            Alert.alert('Sukces', 'Kod weryfikacyjny został wysłany na Twój telefon');
        } catch (err) {
            handleAuthError(err, 'phone');
        } finally {
            setLoading(false);
        }
    };

    const registerWithGoogle = async () => {
        setLoading(true);
        try {
            const data = await signUpWithGoogle();
            handleAuthSuccess(data);
        } catch (err) {
            handleAuthError(err, 'Google');
        } finally {
            setLoading(false);
        } 
    };

    const registerWithFacebook = async () => {
        setLoading(true);
        try {
            const data = await signUpWithFacebook();
            handleAuthSuccess(data);
        } catch (err) {
            handleAuthError(err, 'Facebook');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View className="flex-1 items-center justify-center bg-black p-4">
            <Text className="text-white text-3xl font-bold mb-8">Zarejestruj się</Text>
            
            {/* Registration Method Tabs */}
            <View className="flex-row mb-6 bg-gray-800 rounded-lg p-1">
                <TouchableOpacity
                    className={`flex-1 py-2 px-4 rounded-md ${registrationMethod === 'email' ? 'bg-blue-600' : 'bg-transparent'}`}
                    onPress={() => setRegistrationMethod('email')}
                >
                    <Text className={`text-center font-medium ${registrationMethod === 'email' ? 'text-white' : 'text-gray-400'}`}>
                        Email
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className={`flex-1 py-2 px-4 rounded-md ${registrationMethod === 'phone' ? 'bg-blue-600' : 'bg-transparent'}`}
                    onPress={() => setRegistrationMethod('phone')}
                >
                    <Text className={`text-center font-medium ${registrationMethod === 'phone' ? 'text-white' : 'text-gray-400'}`}>
                        Telefon
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Email Registration Form */}
            {registrationMethod === 'email' && (
                <View className="w-full mb-6">
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor="#9CA3AF"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        className="w-full bg-gray-800 text-white rounded-lg p-4 mb-3 border border-gray-700"
                    />
                    <TextInput
                        placeholder="Hasło"
                        placeholderTextColor="#9CA3AF"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                        className="w-full bg-gray-800 text-white rounded-lg p-4 mb-4 border border-gray-700"
                    />
                    <TouchableOpacity
                        className={`w-full py-4 rounded-lg ${loading ? 'bg-gray-600' : 'bg-blue-600'}`}
                        onPress={registerWithEmail}
                        disabled={loading}
                    >
                        <Text className="text-white text-center font-semibold text-lg">
                            {loading ? 'Rejestrowanie...' : 'Zarejestruj przez Email'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Phone Registration Form */}
            {registrationMethod === 'phone' && (
                <View className="w-full mb-6">
                    <TextInput
                        placeholder="Numer telefonu (+48123456789)"
                        placeholderTextColor="#9CA3AF"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                        className="w-full bg-gray-800 text-white rounded-lg p-4 mb-4 border border-gray-700"
                    />
                    <TouchableOpacity
                        className={`w-full py-4 rounded-lg ${loading ? 'bg-gray-600' : 'bg-green-600'}`}
                        onPress={registerWithPhone}
                        disabled={loading}
                    >
                        <Text className="text-white text-center font-semibold text-lg">
                            {loading ? 'Wysyłanie...' : 'Wyślij kod SMS'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Divider */}
            <View className="flex-row items-center w-full mb-6">
                <View className="flex-1 h-px bg-gray-600" />
                <Text className="text-gray-400 mx-4">lub</Text>
                <View className="flex-1 h-px bg-gray-600" />
            </View>

            {/* Social Media Registration */}
            <View className="w-full space-y-3">
                <TouchableOpacity
                    className={`w-full py-4 rounded-lg border-2 border-red-500 ${loading ? 'opacity-50' : ''}`}
                    onPress={registerWithGoogle}
                    disabled={loading}
                >
                    <Text className="text-red-500 text-center font-semibold text-lg">
                        📧 Zarejestruj przez Google
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className={`w-full py-4 rounded-lg border-2 border-blue-500 ${loading ? 'opacity-50' : ''}`}
                    onPress={registerWithFacebook}
                    disabled={loading}
                >
                    <Text className="text-blue-500 text-center font-semibold text-lg">
                        📘 Zarejestruj przez Facebook
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
