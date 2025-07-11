// src/screens/PaymentPlans.js

import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, Linking } from 'react-native';
import AppLayout from '../components/layout/AppLayout';
import HeaderWithMenu from '../components/HeaderWithMenu';

const paymentOptions = [
    {
        id: 'text-1h',
        title: '💬 Jednorazowa sesja tekstowa',
        subtitle: '1 godzina',
        price: '9 zł',
    },
    {
        id: 'voice-1h',
        title: '🎤 Jednorazowa sesja głosowa',
        subtitle: '1 godzina',
        price: '19 zł',
    },
    {
        id: 'text-10',
        title: '💬 Pakiet 10 sesji tekstowych',
        subtitle: '10 godzin',
        price: '79 zł',
    },
    {
        id: 'voice-10',
        title: '🎤 Pakiet 10 sesji głosowych',
        subtitle: '10 godzin',
        price: '149 zł',
    },
    {
        id: 'text-week',
        title: '💬 Tygodniowy dostęp tekstowy',
        subtitle: 'Bez limitu przez 7 dni',
        price: '49 zł',
    },
    {
        id: 'voice-week',
        title: '🎤 Tygodniowy dostęp głosowy',
        subtitle: 'Bez limitu przez 7 dni',
        price: '99 zł',
    },
];

export default function PaymentPlans() {
    const handleBuy = async (planId) => {
        try {
            const res = await fetch('https://api.fixmymind.org/api/payment/create-checkout-session', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ plan_id: planId }),
            });

            const data = await res.json();
            if (data.url) {
                Linking.openURL(data.url);
            } else {
                throw new Error('Brak linku do płatności.');
            }
        } catch (e) {
            console.error('Błąd płatności', e);
            Alert.alert('Błąd', 'Nie udało się utworzyć płatności.');
        }
    };

    return (
        <AppLayout>
            <HeaderWithMenu />
            <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100, paddingTop: 24 }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>
                    Dostępne pakiety
                </Text>

                {paymentOptions.map((option) => (
                    <View
                        key={option.id}
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            padding: 16,
                            borderRadius: 10,
                            marginBottom: 12,
                        }}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>{option.title}</Text>
                        <Text style={{ color: '#d1d5db', fontSize: 13, marginTop: 2 }}>{option.subtitle}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 }}>
                            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>{option.price}</Text>
                            <TouchableOpacity
                                onPress={() => handleBuy(option.id)}
                                style={{
                                    backgroundColor: '#8b5cf6',
                                    paddingHorizontal: 16,
                                    paddingVertical: 8,
                                    borderRadius: 6,
                                }}
                            >
                                <Text style={{ color: 'white', fontWeight: 'bold' }}>Kup</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </AppLayout>
    );
}