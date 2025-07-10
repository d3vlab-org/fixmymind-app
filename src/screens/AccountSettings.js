// src/screens/AccountSettings.js

import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import AppLayout from '../components/layout/AppLayout';
import styles from '../styles/AccountSettingsStyles';
import HeaderWithMenu from '../components/HeaderWithMenu';

export default function AccountSettings() {
    const [email, setEmail] = useState('nowy@email.com');
    const [password, setPassword] = useState('');
    const [goal, setGoal] = useState('');
    const [preferredMode, setPreferredMode] = useState('');
    const [reminderTime, setReminderTime] = useState('');

    const handleSave = () => {
        // TODO: Zapisz zmiany
        console.log({ email, password, goal, preferredMode, reminderTime });
    };

    return (
        <AppLayout>
            <HeaderWithMenu />
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>📧 Dane konta</Text>

                    <Text style={styles.label}>E-mail</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <Text style={styles.label}>Nowe hasło</Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>🧠 Preferencje terapeutyczne</Text>

                    <Text style={styles.label}>Cel terapii</Text>
                    <TextInput
                        style={styles.input}
                        value={goal}
                        onChangeText={setGoal}
                        placeholder="Np. stres, rozwój, depresja"
                    />

                    <Text style={styles.label}>Preferowany tryb sesji</Text>
                    <TextInput
                        style={styles.input}
                        value={preferredMode}
                        onChangeText={setPreferredMode}
                        placeholder="głosowy / tekstowy / mieszany"
                    />

                    <Text style={styles.label}>Godzina przypomnienia</Text>
                    <TextInput
                        style={styles.input}
                        value={reminderTime}
                        onChangeText={setReminderTime}
                        placeholder="np. 19:00"
                    />
                </View>

                <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Zapisz zmiany</Text>
                </TouchableOpacity>
            </ScrollView>
        </AppLayout>
    );
}