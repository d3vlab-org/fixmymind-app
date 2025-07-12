import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CheckoutSuccess() {
    const navigation = useNavigation();

    return (
        <View className="flex-1 bg-black justify-center items-center p-6">
            <Text className="text-white text-3xl font-bold mb-4">✅ Zakup zakończony</Text>
            <Text className="text-white text-lg text-center mb-8">Twoja subskrypcja została aktywowana. Możesz teraz korzystać z pełnych możliwości FixMyMind.</Text>

            <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                className="bg-white px-6 py-3 rounded-full"
            >
                <Text className="text-black font-bold">Powrót do aplikacji</Text>
            </TouchableOpacity>
        </View>
    );
}