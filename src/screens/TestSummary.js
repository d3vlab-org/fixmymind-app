import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import AppLayout from '../components/layout/AppLayout';
import HeaderWithMenu from '../components/HeaderWithMenu';

export default function TestSummary() {
    const route = useRoute();
    const { testId, answers } = route.params || {};

    const [score, setScore] = useState(null);
    const [submitting, setSubmitting] = useState(true);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (!testId || !answers || !Array.isArray(answers)) return;

        const total = answers.reduce((sum, item) => sum + Number(item.value), 0);
        setScore(total);

        const payload = {
            score: total,
            answers: answers.map(({ questionId, value }) => ({
                question_id: questionId,
                value
            }))
        };

        console.log("Wysyłany payload:", payload);

        axios.post(`https://api.fixmymind.org/api/tests/${testId}/submit`, payload)
            .then(response => {
                console.log("Zapisano wynik:", response.data);
                console.log("Status:", response.status);
                console.log("Headers:", response.headers);
                setSubmitted(true);
                setSubmitting(false);
            })
            .catch(error => {
                if (error.response) {
                    console.error("Błąd odpowiedzi z serwera:", error.response.status);
                    console.error("Dane odpowiedzi:", error.response.data);
                    console.error("Nagłówki odpowiedzi:", error.response.headers);
                    Alert.alert("Błąd serwera", `Kod: ${error.response.status}`);
                } else if (error.request) {
                    console.error("Brak odpowiedzi od serwera:", error.request);
                    Alert.alert("Błąd sieci", "Nie otrzymano odpowiedzi z serwera.");
                } else {
                    console.error("Błąd przy wysyłaniu zapytania:", error.message);
                    Alert.alert("Błąd", error.message);
                }
                setSubmitted(false);
                setSubmitting(false);
            });
    }, [testId, answers]);

    return (
        <AppLayout>
            <HeaderWithMenu />
            <ScrollView className="flex-1 bg-gradient-to-b from-violet-900 to-violet-700 p-6">
                <Text className="text-white text-2xl font-bold mb-6">Wynik testu</Text>

                <View className="bg-white rounded-xl p-6 mb-6">
                    <Text className="text-gray-800 text-lg mb-2">Punkty łącznie:</Text>
                    <Text className="text-3xl font-bold text-violet-600">{score !== null ? score : '...'}</Text>
                </View>

                <View className="bg-white rounded-xl p-6 mb-6">
                    <Text className="text-gray-800 text-lg mb-2">Status zapisu:</Text>
                    {submitting ? (
                        <View className="flex-row items-center">
                            <ActivityIndicator color="#6D28D9" />
                            <Text className="ml-2 text-gray-600">Wysyłanie odpowiedzi...</Text>
                        </View>
                    ) : submitted ? (
                        <Text className="text-green-600">Zapisano poprawnie ✅</Text>
                    ) : (
                        <Text className="text-red-600">Nie udało się zapisać ❌</Text>
                    )}
                </View>

                <View className="bg-white rounded-xl p-6">
                    <Text className="text-gray-800 text-lg mb-2">Interpretacja:</Text>
                    <Text className="text-gray-500">
                        {score !== null ? "Interpretacja zostanie dodana w przyszłej wersji." : "Trwa obliczanie..."}
                    </Text>
                </View>
            </ScrollView>
        </AppLayout>
    );
}