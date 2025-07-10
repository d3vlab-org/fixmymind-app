import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from 'react-native';
import AppLayout from '../components/layout/AppLayout';
import styles from '../styles.native';
import HeaderWithMenu from '../components/HeaderWithMenu';

export default function Chat() {
    const [messages, setMessages] = useState([
        { id: '1', text: 'Witaj! Jak się dziś czujesz?', from: 'bot' },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const flatListRef = useRef();
    const inputRef = useRef();

    useEffect(() => {
        const timeout = setTimeout(() => inputRef.current?.focus(), 100);
        return () => clearTimeout(timeout);
    }, []);

    const callBackend = async (userInput) => {
        setLoading(true);
        try {
            const res = await fetch('https://api.fixmymind.org/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [
                        ...messages.map(msg => ({
                            role: msg.from === 'user' ? 'user' : 'assistant',
                            content: msg.text,
                        })),
                        { role: 'user', content: userInput },
                    ],
                }),
            });

            const data = await res.json();
            const botReply = data.reply;

            if (botReply) {
                setMessages(prev => [
                    ...prev,
                    { id: Date.now().toString() + '-bot', text: botReply.trim(), from: 'bot' },
                ]);
            } else {
                setMessages(prev => [
                    ...prev,
                    { id: Date.now().toString() + '-err', text: '⚠️ Brak odpowiedzi z serwera.', from: 'bot' },
                ]);
            }
        } catch (err) {
            console.error('Błąd API:', err);
            setMessages(prev => [
                ...prev,
                { id: Date.now().toString() + '-err', text: '⚠️ Błąd połączenia z serwerem.', from: 'bot' },
            ]);
        } finally {
            setLoading(false);
            setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
        }
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { id: Date.now().toString(), text: input, from: 'user' };
        setMessages(prev => [...prev, userMessage]);
        callBackend(input);
        setInput('');
        setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
    };

    return (
        <AppLayout>
            <HeaderWithMenu />
            <View style={[styles.container, { flex: 1, paddingTop: 60 }]}>
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View
                            style={{
                                alignSelf: item.from === 'user' ? 'flex-end' : 'flex-start',
                                backgroundColor: item.from === 'user' ? '#d2f8d2' : '#fff',
                                padding: 12,
                                borderRadius: 10,
                                marginVertical: 6,
                                maxWidth: '80%',
                            }}
                        >
                            <Text style={{ color: '#000' }}>{item.text}</Text>
                        </View>
                    )}
                />

                {loading && (
                    <View style={{ alignSelf: 'flex-start', marginLeft: 12, marginBottom: 6 }}>
                        <ActivityIndicator size="small" color="#fff" />
                    </View>
                )}

                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 12 }}>
                        <TextInput
                            ref={inputRef}
                            value={input}
                            onChangeText={setInput}
                            placeholder="Napisz wiadomość..."
                            placeholderTextColor="#666"
                            multiline={true}
                            blurOnSubmit={true}
                            returnKeyType="default"
                            onKeyPress={({ nativeEvent }) => {
                                if (nativeEvent.key === 'Enter' && !nativeEvent.shiftKey) {
                                    nativeEvent.preventDefault?.(); // dla weba
                                    handleSend();
                                }
                            }}
                            style={{
                                flex: 1,
                                backgroundColor: 'white',
                                borderRadius: 20,
                                paddingHorizontal: 16,
                                paddingVertical: 10,
                                marginRight: 8,
                                minHeight: 40,
                                maxHeight: 120,
                            }}
                        />
                        <TouchableOpacity
                            onPress={handleSend}
                            style={{ backgroundColor: 'white', padding: 10, borderRadius: 50 }}
                        >
                            <Text style={{ fontSize: 18 }}>➤</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </AppLayout>
    );
}