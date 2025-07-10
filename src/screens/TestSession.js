import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderWithMenu from "../components/HeaderWithMenu";
import AppLayout from "../components/layout/AppLayout";

export default function TestSession() {
    const navigation = useNavigation();
    const route = useRoute();
    const { testId } = route.params || {};

    const [loading, setLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        if (!testId) return;

        fetch(`https://api.fixmymind.org/api/tests/${testId}/questions`)
            .then(res => res.json())
            .then(data => {
                setQuestions(data.questions);
                setLoading(false);
            })
            .catch(err => {
                console.error("Błąd ładowania testu:", err);
                setLoading(false);
            });
    }, [testId]);

    const handleAnswer = (value) => {
        const currentQuestion = questions[currentIndex];
        const updated = [...answers, { questionId: currentQuestion.id, value }];

        if (currentIndex + 1 < questions.length) {
            setAnswers(updated);
            setCurrentIndex(currentIndex + 1);
        } else {
            navigation.navigate('TestSummary', {
                testId,
                answers: updated
            });
        }
    };

    if (loading || questions.length === 0) {
        return (
            <AppLayout>
                <HeaderWithMenu />
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#fff" />
                    <Text className="text-white mt-4">Ładowanie testu...</Text>
                </View>
            </AppLayout>
        );
    }

    const question = questions[currentIndex];

    return (
        <AppLayout>
            <HeaderWithMenu />
            <SafeAreaView className="flex-1 bg-gradient-to-b from-violet-900 to-violet-700 px-4">
                <ScrollView contentContainerStyle={{ alignItems: 'center', paddingVertical: 40 }}>
                    <View className="w-full max-w-xl">
                        <Text className="text-center text-lg font-semibold mb-6 text-white">
                            Pytanie {currentIndex + 1} z {questions.length}
                        </Text>
                        <Text className="text-center text-2xl font-bold mb-12 text-white">
                            {question.question_text}
                        </Text>

                        {question.options.map((option, i) => (
                            <TouchableOpacity
                                key={i}
                                className="w-full py-4 border rounded-lg mb-4 bg-white/10"
                                onPress={() => handleAnswer(option.value)}
                            >
                                <Text className="text-center text-white">{option.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </AppLayout>
    );
}