import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Linking, ScrollView} from 'react-native';
import pricing from '../utils/pricing.json';
import HeaderWithMenu from "../components/HeaderWithMenu"; // <- dostosuj ścieżkę jeśli inna

export default function PaymentPlans() {
    const [plans] = useState(pricing);

    const handleSubscribe = (link) => {
        if (!link) {
            console.warn('Brak linku do płatności');
            return;
        }
        Linking.openURL(link);
    };

    return (
        <AppLayout>
            <HeaderWithMenu/>
            <ScrollView className="flex-1 bg-gradient-to-b from-[#3a1c71] via-[#5f33aa] to-[#7b4397] p-4">
                <Text className="text-white text-2xl font-bold mb-4">Dostępne plany subskrypcji</Text>

                {plans.map((plan, index) => {
                    const price = plan.price === 0 ? '0' : (plan.price / 100).toFixed(2);
                    const currency = plan.currency || 'PLN';
                    const interval = plan.interval || 'month';

                    return (
                        <View key={index} className="bg-purple-800 rounded-2xl p-4 mb-4">
                            <Text className="text-white text-xl font-semibold mb-2">{plan.name}</Text>

                            {plan.features?.map((feature, i) => (
                                <Text key={i} className="text-white text-sm mb-1">• {feature}</Text>
                            ))}

                            <Text className="text-white font-bold mt-2">
                                {price} {currency} / {interval}
                            </Text>

                            {plan.link ? (
                                <TouchableOpacity
                                    onPress={() => handleSubscribe(plan.link)}
                                    className="bg-white px-6 py-2 rounded-full mt-4"
                                >
                                    <Text style={{color: 'black', fontWeight: 'bold'}}>Kup</Text>
                                </TouchableOpacity>
                            ) : (
                                <Text className="text-yellow-300 mt-4 italic">Brak linku do płatności</Text>
                            )}
                        </View>
                    );
                })}
            </ScrollView>
        </AppLayout>
    );
}