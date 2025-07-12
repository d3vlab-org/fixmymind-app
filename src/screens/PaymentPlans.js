import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import AppLayout from '../components/layout/AppLayout';
import HeaderWithMenu from '../components/HeaderWithMenu';

export default function PaymentPlans() {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await fetch('https://api.fixmymind.org/pricing');
                const data = await response.json();
                setPlans(data);
            } catch (error) {
                console.error('❌ Błąd ładowania planów:', error);
                setPlans([]); // fallback na pustą listę
            } finally {
                setLoading(false);
            }
        };

        fetchPlans();
    }, []);

    const handleSubscribe = (url) => {
        if (url) {
            Linking.openURL(url);
        } else {
            console.warn('❗ Brak linku do płatności');
        }
    };

    return (
        <AppLayout>
            <HeaderWithMenu />
            <View className="p-6">
                <Text className="text-white text-xl font-bold mb-4">Dostępne plany subskrypcji</Text>
                {loading && <ActivityIndicator color="#fff" />}
                {Array.isArray(plans) && plans.map((plan, index) => (
                    <View key={index} className="bg-purple-800 rounded-xl p-4 mb-6">
                        <Text className="text-white text-lg font-bold mb-2">{plan.name}</Text>
                        {plan.features && plan.features.map((feature, i) => (
                            <Text key={i} className="text-white">• {feature}</Text>
                        ))}
                        <Text className="text-white font-bold mt-2">{plan.price} / {plan.interval}</Text>
                        <TouchableOpacity
                            onPress={() => handleSubscribe(plan.link)}
                            className="bg-white px-6 py-3 rounded-full mt-4"
                        >
                            <Text style={{ color: 'black', fontWeight: 'bold' }}>Kup</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                {!loading && plans.length === 0 && (
                    <Text className="text-white">Brak dostępnych planów.</Text>
                )}
            </View>
        </AppLayout>
    );
}