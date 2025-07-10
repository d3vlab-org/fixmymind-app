import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Switch } from 'react-native';
import AppLayout from '../components/layout/AppLayout';
import HeaderWithMenu from '../components/HeaderWithMenu';

export default function TherapistStyleConfig() {
    const [name, setName] = useState('Alex');
    const [style, setStyle] = useState('warm');
    const [tempo, setTempo] = useState('slow');
    const [tone, setTone] = useState('soft');
    const [addMarkers, setAddMarkers] = useState(true);
    const [askQuestions, setAskQuestions] = useState(true);

    const stylesOptions = [
        { key: 'warm', label: '🤝 Ciepły i wspierający' },
        { key: 'calm', label: '🧘 Spokojny i refleksyjny' },
        { key: 'analytical', label: '💡 Dociekliwy i analityczny' },
        { key: 'motivating', label: '📣 Energiczny i motywujący' },
        { key: 'deep', label: '🧙‍♂️ Filozoficzny i głęboki' },
    ];

    return (
        <AppLayout>
            <HeaderWithMenu />
            <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100, paddingTop: 24 }}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 16 }}>
                    Konfiguracja stylu terapeuty
                </Text>

                <Text style={{ color: 'white', marginBottom: 6 }}>Imię terapeuty</Text>
                <TextInput
                    style={{
                        backgroundColor: 'white',
                        borderRadius: 10,
                        padding: 12,
                        marginBottom: 20,
                    }}
                    value={name}
                    onChangeText={setName}
                />

                <Text style={{ color: 'white', marginBottom: 6 }}>Styl relacji</Text>
                {stylesOptions.map((option) => (
                    <TouchableOpacity
                        key={option.key}
                        onPress={() => setStyle(option.key)}
                        style={{
                            backgroundColor: style === option.key ? '#8b5cf6' : 'rgba(255,255,255,0.1)',
                            padding: 12,
                            borderRadius: 10,
                            marginBottom: 8,
                        }}
                    >
                        <Text style={{ color: 'white' }}>{option.label}</Text>
                    </TouchableOpacity>
                ))}

                <Text style={{ color: 'white', marginTop: 20, marginBottom: 6 }}>Tempo mówienia</Text>
                <View style={{ flexDirection: 'row', gap: 10, marginBottom: 16 }}>
                    {['slow', 'medium', 'fast'].map((option) => (
                        <TouchableOpacity
                            key={option}
                            onPress={() => setTempo(option)}
                            style={{
                                flex: 1,
                                backgroundColor: tempo === option ? '#8b5cf6' : 'rgba(255,255,255,0.1)',
                                padding: 10,
                                borderRadius: 8,
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ color: 'white', textTransform: 'capitalize' }}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={{ color: 'white', marginBottom: 6 }}>Ton głosu</Text>
                <View style={{ flexDirection: 'row', gap: 10, marginBottom: 16 }}>
                    {['soft', 'neutral', 'firm'].map((option) => (
                        <TouchableOpacity
                            key={option}
                            onPress={() => setTone(option)}
                            style={{
                                flex: 1,
                                backgroundColor: tone === option ? '#8b5cf6' : 'rgba(255,255,255,0.1)',
                                padding: 10,
                                borderRadius: 8,
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ color: 'white', textTransform: 'capitalize' }}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16, justifyContent: 'space-between' }}>
                    <Text style={{ color: 'white', flex: 1 }}>Dodawaj pauzy i wyrażenia typu "rozumiem", "hmm"</Text>
                    <Switch value={addMarkers} onValueChange={setAddMarkers} />
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 32, justifyContent: 'space-between' }}>
                    <Text style={{ color: 'white', flex: 1 }}>Zadawaj pytania skłaniające do refleksji</Text>
                    <Switch value={askQuestions} onValueChange={setAskQuestions} />
                </View>

                <TouchableOpacity
                    style={{
                        backgroundColor: '#8b5cf6',
                        paddingVertical: 14,
                        borderRadius: 10,
                        alignItems: 'center',
                    }}
                    onPress={() => {
                        // TODO: generate prompt and zapisz do backendu lub przejdź do testu głosu
                        console.log({ name, style, tempo, tone, addMarkers, askQuestions });
                    }}
                >
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Zapisz styl terapeuty</Text>
                </TouchableOpacity>
            </ScrollView>
        </AppLayout>
    );
}