
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import AppLayout from '../components/layout/AppLayout';
import styles from '../styles.native';
import { AuthContext } from '../context/AuthContext';

export default function Settings() {
    const { logout } = useContext(AuthContext);

    return (
        <AppLayout>
            <View style={[styles.container, { flex: 1, justifyContent: 'center' }]}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>
                    Ustawienia konta ⚙️
                </Text>
                <TouchableOpacity
                    onPress={logout}
                    style={{ backgroundColor: '#413f99', padding: 14, borderRadius: 8 }}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Wyloguj się</Text>
                </TouchableOpacity>
            </View>
        </AppLayout>
    );
}
