
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import AppLayout from '../components/layout/AppLayout';
import HeaderWithMenu from '../components/HeaderWithMenu';
import { useNavigation } from '@react-navigation/native';

export default function Dashboard() {
    const navigation = useNavigation();

    return (
        <AppLayout>
            <HeaderWithMenu />

            <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100, paddingTop: 24 }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>
                    Rozpocznij nową sesję
                </Text>

                <View style={{ flexDirection: 'row', gap: 12, marginBottom: 32 }}>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            paddingVertical: 14,
                            backgroundColor: '#8b5cf6',
                            borderRadius: 10,
                            alignItems: 'center',
                        }}
                        onPress={() => navigation.navigate('VoiceSession')}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>🎤 Sesja głosowa</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{
                            flex: 1,
                            paddingVertical: 14,
                            backgroundColor: '#e5e7eb',
                            borderRadius: 10,
                            alignItems: 'center',
                        }}
                        onPress={() => navigation.navigate('Chat')}
                    >
                        <Text style={{ color: '#111827', fontWeight: 'bold' }}>💬 Sesja tekstowa</Text>
                    </TouchableOpacity>
                </View>

                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>
                    Twoje sesje
                </Text>

                <View
                    style={{
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        padding: 16,
                        borderRadius: 10,
                        marginBottom: 12,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <View>
                        <Text style={{ color: 'white', fontSize: 12, marginBottom: 2 }}>12 days ago</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Omówienie stresu</Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            paddingVertical: 6,
                            paddingHorizontal: 12,
                            backgroundColor: 'white',
                            borderRadius: 6,
                        }}
                    >
                        <Text style={{ color: '#4f46e5', fontWeight: 'bold' }}>Zobacz</Text>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        padding: 16,
                        borderRadius: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <View>
                        <Text style={{ color: 'white', fontSize: 12, marginBottom: 2 }}>7 days ago</Text>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Techniki relaksacyjne</Text>
                    </View>
                    <TouchableOpacity
                        style={{
                            paddingVertical: 6,
                            paddingHorizontal: 12,
                            backgroundColor: 'white',
                            borderRadius: 6,
                        }}
                    >
                        <Text style={{ color: '#4f46e5', fontWeight: 'bold' }}>Zobacz</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </AppLayout>
    );
}
