import React, { useEffect, useRef } from 'react';
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import VoiceWave from '../components/VoiceVave';

export default function VoiceTranscript({ sessionId, messages = [], onPlay, onStop, currentlyPlayingId }) {
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current && Platform.OS === 'web') {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        } else if (scrollRef.current?.scrollToEnd) {
            scrollRef.current.scrollToEnd({ animated: true });
        }
    }, [messages]);

    const Wrapper = Platform.OS === 'web' ? 'div' : ScrollView;

    return (
        <Wrapper
            ref={scrollRef}
            style={{
                flex: 1,
                height: '100%',
                ...(Platform.OS === 'web' && {
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                }),
            }}
            contentContainerStyle={
                Platform.OS === 'web'
                    ? undefined
                    : { paddingBottom: 60, paddingTop: 16, paddingHorizontal: 12 }
            }
        >
            {messages.map((msg, index) => {
                const isUser = msg.sender === 'user' || msg.role === 'user';
                const timestamp = msg.timestamp
                    ? new Date(msg.timestamp).toLocaleTimeString()
                    : '';

                return (
                    <View
                        key={index}
                        className={`rounded-xl px-4 py-3 mb-2 max-w-[80%] ${
                            isUser ? 'bg-blue-100 self-end' : 'bg-gray-100 self-start'
                        }`}
                    >
                        <Text className="text-sm text-gray-500 mb-1">
                            {isUser ? 'Ty' : 'AI'} • {timestamp}
                        </Text>
                        <Text className="text-base text-black">{msg.text}</Text>

                        {!isUser && msg.audio_url && (
                            <View className="mt-2">
                                <TouchableOpacity
                                    onPress={() => {
                                        if (currentlyPlayingId === msg.id) {
                                            onStop?.();
                                        } else {
                                            onPlay?.(msg.audio_url, msg.id);
                                        }
                                    }}
                                    className={`flex-row items-center gap-2 rounded-full px-4 py-1 self-start ${
                                        currentlyPlayingId === msg.id ? 'bg-red-600' : 'bg-purple-600'
                                    }`}
                                >
                                    <Text className="text-white text-sm">
                                        {currentlyPlayingId === msg.id ? '⏸️ Zatrzymaj' : '🔊 Odtwórz'}
                                    </Text>
                                    {currentlyPlayingId === msg.id && <VoiceWave />}
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                );
            })}
        </Wrapper>
    );
}