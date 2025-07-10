import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AppLayout from "../components/layout/AppLayout";
import HeaderWithMenu from "../components/HeaderWithMenu";

const Tests = () => {
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchTests = async () => {
            try {
                const response = await axios.get('https://api.fixmymind.org/api/tests');
                setTests(response.data);
            } catch (error) {
                console.error('Błąd ładowania testów:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTests();
    }, []);

    const handleStartTest = (testId) => {
        navigation.navigate('TestSession', { testId });
    };

    if (loading) {
        return (
            <AppLayout>
            <HeaderWithMenu/>
                <View className="flex-1 items-center justify-center bg-white">
                    <ActivityIndicator size="large" color="#6D28D9" />
                    <Text className="mt-4 text-violet-700">Ładowanie testów...</Text>
                </View>


            </AppLayout>
        );
    }

    return (
        <AppLayout>
            <HeaderWithMenu/>
            <ScrollView contentContainerStyle={{ padding: 16 }}>
                <Text className="text-2xl font-bold text-center text-violet-900 mb-4">Dostępne testy</Text>
                {tests.map((test) => (
                    <TouchableOpacity
                        key={test.id}
                        className="bg-white p-4 rounded-xl border border-violet-200 mb-4 shadow-sm"
                        onPress={() => handleStartTest(test.id)}
                    >
                        <Text className="text-lg font-semibold text-violet-800">{test.name}</Text>
                        <Text className="text-sm text-gray-600">{test.description}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </AppLayout>
    );
};

export default Tests;