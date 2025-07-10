import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { fetchTestQuestions } from '../utils/api';
import AppLayout from '../components/layout/AppLayout';
import HeaderWithMenu from '../components/HeaderWithMenu';

export default function TestStart({ route, navigation }) {
    const { user } = useAuth();
    const { test } = route.params;
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useLayoutEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    useEffect(() => {
        const load = async () => {
            try {
                const token = await user.getIdToken();
                const data = await fetchTestQuestions(test.id, token);
                setQuestions(data.questions || []);
            } catch (e) {
                console.error('Błąd pobierania pytań:', e);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    if (loading) return <ActivityIndicator className="mt-10" color="#8b5cf6" />;

    return (
        <AppLayout>
            <HeaderWithMenu />
            <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>
                    {test.name}
                </Text>

                {questions.map((item, index) => (
                    <View
                        key={item.id}
                        style={{
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            padding: 16,
                            borderRadius: 10,
                            marginBottom: 12,
                        }}
                    >
                        <Text style={{ color: 'white', fontWeight: 'bold', marginBottom: 8 }}>
                            {index + 1}. {item.question_text}
                        </Text>
                        {item.options.map((opt, i) => (
                            <Text key={i} style={{ color: 'white', marginLeft: 8 }}>
                                ◯ {opt.label}
                            </Text>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </AppLayout>
    );
}