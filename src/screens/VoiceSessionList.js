// src/screens/VoiceSessionsList.js
import React, { useEffect, useState } from 'react';
import { View, Text, Pressable, ScrollView, ActivityIndicator } from 'react-native';
import { PlusCircle } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import AppLayout from '../components/layout/AppLayout';
import HeaderWithMenu from '../components/HeaderWithMenu';

export default function VoiceSessionsList() {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    useEffect(() => {
        fetch('https://api.fixmymind.org/api/voice-sessions')
            .then((res) => res.json())
            .then(setSessions)
            .catch(console.error);
    }, []);

    const startNewSession = async () => {
        setLoading(true);
        try {
            const res = await fetch('https://api.fixmymind.org/api/voice-sessions', {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
            });
            const data = await res.json();

            if (data && data.id) {
                navigation.navigate('VoiceSession', { sessionId: data.id });
            } else {
                console.warn('Nie udało się utworzyć sesji');
            }
        } catch (err) {
            console.error('Błąd tworzenia sesji:', err);
        } finally {
            setLoading(false);
        }
    };

    const openSession = (id) => {
        navigation.navigate('VoiceSession', { sessionId: id });
    };

    return (
        <AppLayout>
            <HeaderWithMenu />
            <View className="p-4 gap-4">
                <Pressable
                    className="bg-blue-600 flex-row items-center justify-center gap-2 px-4 py-3 rounded-2xl"
                    onPress={startNewSession}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <>
                            <PlusCircle color="white" />
                            <Text className="text-white font-bold">Nowa sesja</Text>
                        </>
                    )}
                </Pressable>

                <ScrollView className="mt-4 space-y-4">
                    {sessions.length === 0 ? (
                        <Text className="text-center text-gray-400 italic">Brak zapisanych sesji.</Text>
                    ) : (
                        sessions.map((session) => (
                            <Pressable
                                key={session.id}
                                onPress={() => openSession(session.id)}
                                className="p-4 bg-white shadow rounded-xl"
                            >
                                <Text className="text-lg font-semibold">Sesja #{session.id}</Text>
                                <Text className="text-sm text-gray-500">
                                    {new Date(session.created_at).toLocaleString()}
                                </Text>
                            </Pressable>
                        ))
                    )}
                </ScrollView>
            </View>
        </AppLayout>
    );
}