import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Switch } from 'react-native';
import AppLayout from '../components/layout/AppLayout';
import HeaderWithMenu from '../components/HeaderWithMenu';
import axios from 'axios';
import { API_URL } from '../config/api';
import { useTheme } from '../contexts/ThemeContext';
import { getSession } from '../utils/SupabaseService';

export default function UserProfile() {
    const { theme, isDarkTheme, toggleTheme } = useTheme();
    const [name, setName] = useState('Jan Kowalski');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch user profile data when component mounts
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            // Get the current session from Supabase
            const session = await getSession();

            if (!session) {
                throw new Error('No active session found');
            }

            // Extract the access token from the session
            const accessToken = session.access_token;

            // Use the access token in the Authorization header
            const response = await axios.get(`${API_URL}/me`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            if (response.data) {
                setName(response.data.name);
                // Note: Theme is now managed by ThemeContext
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
            Alert.alert('Error', 'Failed to load profile data');
        } finally {
            setLoading(false);
        }
    };

    const handleSaveProfile = async () => {
        try {
            setLoading(true);

            // Get the current session from Supabase
            const session = await getSession();

            if (!session) {
                throw new Error('No active session found');
            }

            // Extract the access token from the session
            const accessToken = session.access_token;

            await axios.put(`${API_URL}/profile/name`, { name }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            Alert.alert('Zapisano', 'Imię zostało zaktualizowane.');
        } catch (error) {
            console.error('Error updating name:', error);
            Alert.alert('Error', 'Failed to update name');
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async () => {
        if (password !== password2) {
            Alert.alert('Błąd', 'Hasła nie są takie same.');
            return;
        }

        try {
            setLoading(true);

            // Get the current session from Supabase
            const session = await getSession();

            if (!session) {
                throw new Error('No active session found');
            }

            // Extract the access token from the session
            const accessToken = session.access_token;

            await axios.put(`${API_URL}/profile/password`, { 
                password,
                password_confirmation: password2
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            setPassword('');
            setPassword2('');
            Alert.alert('Sukces', 'Hasło zostało zmienione.');
        } catch (error) {
            console.error('Error updating password:', error);
            Alert.alert('Error', 'Failed to update password');
        } finally {
            setLoading(false);
        }
    };

    // handleToggleTheme is now handled by the ThemeContext

    const mockPayments = [
        { id: 1, plan: 'Pakiet 10 tekstowych', date: '2025-07-01', amount: '79 zł' },
        { id: 2, plan: 'Tygodniowy dostęp głosowy', date: '2025-06-15', amount: '99 zł' },
    ];

    const mockSubscriptions = [
        { id: 1, name: 'Tygodniowy dostęp tekstowy', ends: '2025-07-14' },
    ];

    return (
        <AppLayout>
            <HeaderWithMenu />
            <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100, paddingTop: 24 }}>
                <Text style={{ color: isDarkTheme ? 'white' : '#333333', fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>👤 Profil użytkownika</Text>

                {/* Zmiana imienia */}
                <View style={{ backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', padding: 16, borderRadius: 10, marginBottom: 16 }}>
                    <Text style={{ color: isDarkTheme ? 'white' : '#333333', fontWeight: 'bold', marginBottom: 6 }}>Imię</Text>
                    <TextInput
                        style={{ backgroundColor: 'white', borderRadius: 6, padding: 8, marginBottom: 10 }}
                        value={name}
                        onChangeText={setName}
                    />
                    <TouchableOpacity onPress={handleSaveProfile} style={{ backgroundColor: '#8b5cf6', padding: 10, borderRadius: 6 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Zapisz</Text>
                    </TouchableOpacity>
                </View>

                {/* Zmiana hasła */}
                <View style={{ backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', padding: 16, borderRadius: 10, marginBottom: 16 }}>
                    <Text style={{ color: isDarkTheme ? 'white' : '#333333', fontWeight: 'bold', marginBottom: 6 }}>Zmiana hasła</Text>
                    <TextInput
                        secureTextEntry
                        placeholder="Nowe hasło"
                        style={{ backgroundColor: 'white', borderRadius: 6, padding: 8, marginBottom: 8 }}
                        onChangeText={setPassword}
                        value={password}
                    />
                    <TextInput
                        secureTextEntry
                        placeholder="Powtórz hasło"
                        style={{ backgroundColor: 'white', borderRadius: 6, padding: 8, marginBottom: 10 }}
                        onChangeText={setPassword2}
                        value={password2}
                    />
                    <TouchableOpacity 
                        onPress={handleChangePassword} 
                        style={{ backgroundColor: '#8b5cf6', padding: 10, borderRadius: 6 }}
                        disabled={loading}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>
                            {loading ? 'Zapisywanie...' : 'Zmień hasło'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Wybór motywu */}
                <View style={{ backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', padding: 16, borderRadius: 10, marginBottom: 16 }}>
                    <Text style={{ color: isDarkTheme ? 'white' : '#333333', fontWeight: 'bold', marginBottom: 12 }}>Motyw aplikacji</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={{ color: isDarkTheme ? 'white' : '#333333' }}>Ciemny motyw</Text>
                        <Switch
                            trackColor={{ false: '#767577', true: '#8b5cf6' }}
                            thumbColor={isDarkTheme ? '#f4f3f4' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleTheme}
                            value={isDarkTheme}
                        />
                    </View>
                    <Text style={{ color: isDarkTheme ? '#d1d5db' : '#666666', fontSize: 12, marginTop: 8 }}>
                        {isDarkTheme ? 'Ciemny motyw aktywny' : 'Jasny motyw aktywny'}
                    </Text>
                </View>

                {/* Historia płatności */}
                <Text style={{ color: isDarkTheme ? 'white' : '#333333', fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>💳 Historia płatności</Text>
                {mockPayments.map((p) => (
                    <View key={p.id} style={{ backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', padding: 14, borderRadius: 10, marginBottom: 10 }}>
                        <Text style={{ color: isDarkTheme ? 'white' : '#333333' }}>{p.plan}</Text>
                        <Text style={{ color: isDarkTheme ? '#d1d5db' : '#666666', fontSize: 12 }}>{p.date} – {p.amount}</Text>
                    </View>
                ))}

                {/* Subskrypcje */}
                <Text style={{ color: isDarkTheme ? 'white' : '#333333', fontSize: 16, fontWeight: 'bold', marginTop: 24, marginBottom: 12 }}>📅 Aktywne subskrypcje</Text>
                {mockSubscriptions.map((s) => (
                    <View key={s.id} style={{ backgroundColor: isDarkTheme ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)', padding: 14, borderRadius: 10, marginBottom: 10 }}>
                        <Text style={{ color: isDarkTheme ? 'white' : '#333333' }}>{s.name}</Text>
                        <Text style={{ color: isDarkTheme ? '#d1d5db' : '#666666', fontSize: 12 }}>Wygasa: {s.ends}</Text>
                    </View>
                ))}
            </ScrollView>
        </AppLayout>
    );
}
