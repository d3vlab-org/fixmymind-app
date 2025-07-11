import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import AppLayout from '../components/layout/AppLayout';
import HeaderWithMenu from '../components/HeaderWithMenu';

export default function UserProfile() {
    const [name, setName] = useState('Jan Kowalski');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const handleSaveProfile = () => {
        // TODO: połącz z backendem
        Alert.alert('Zapisano', 'Imię zostało zaktualizowane.');
    };

    const handleChangePassword = () => {
        if (password !== password2) {
            Alert.alert('Błąd', 'Hasła nie są takie same.');
            return;
        }
        // TODO: wyślij nowe hasło do backendu
        Alert.alert('Sukces', 'Hasło zostało zmienione.');
    };

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
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>👤 Profil użytkownika</Text>

                {/* Zmiana imienia */}
                <View style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: 16, borderRadius: 10, marginBottom: 16 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', marginBottom: 6 }}>Imię</Text>
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
                <View style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: 16, borderRadius: 10, marginBottom: 16 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', marginBottom: 6 }}>Zmiana hasła</Text>
                    <TextInput
                        secureTextEntry
                        placeholder="Nowe hasło"
                        style={{ backgroundColor: 'white', borderRadius: 6, padding: 8, marginBottom: 8 }}
                        onChangeText={setPassword}
                    />
                    <TextInput
                        secureTextEntry
                        placeholder="Powtórz hasło"
                        style={{ backgroundColor: 'white', borderRadius: 6, padding: 8, marginBottom: 10 }}
                        onChangeText={setPassword2}
                    />
                    <TouchableOpacity onPress={handleChangePassword} style={{ backgroundColor: '#8b5cf6', padding: 10, borderRadius: 6 }}>
                        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>Zmień hasło</Text>
                    </TouchableOpacity>
                </View>

                {/* Historia płatności */}
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>💳 Historia płatności</Text>
                {mockPayments.map((p) => (
                    <View key={p.id} style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: 14, borderRadius: 10, marginBottom: 10 }}>
                        <Text style={{ color: 'white' }}>{p.plan}</Text>
                        <Text style={{ color: '#d1d5db', fontSize: 12 }}>{p.date} – {p.amount}</Text>
                    </View>
                ))}

                {/* Subskrypcje */}
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginTop: 24, marginBottom: 12 }}>📅 Aktywne subskrypcje</Text>
                {mockSubscriptions.map((s) => (
                    <View key={s.id} style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: 14, borderRadius: 10, marginBottom: 10 }}>
                        <Text style={{ color: 'white' }}>{s.name}</Text>
                        <Text style={{ color: '#d1d5db', fontSize: 12 }}>Wygasa: {s.ends}</Text>
                    </View>
                ))}
            </ScrollView>
        </AppLayout>
    );
}