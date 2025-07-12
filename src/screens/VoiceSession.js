import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Mic, SendHorizonal } from 'lucide-react-native';
import useVoiceRecorder from '../utils/useVoiceRecorder';
import useVoicePlayer from '../utils/useVoicePlayer';
import VoiceTranscript from './VoiceTranscript';
import AppLayout from '../components/layout/AppLayout';
import HeaderWithMenu from '../components/HeaderWithMenu';

export default function VoiceSession() {
    const route = useRoute();
    const sessionId = route.params?.sessionId;

    const [status, setStatus] = useState('idle');
    const [audioUri, setAudioUri] = useState(null);
    const [messages, setMessages] = useState([]);
    const [currentlyPlayingId, setCurrentlyPlayingId] = useState(null);
    const [currentlyPlayingUri, setCurrentlyPlayingUri] = useState(null);

    const { startRecording, stopRecording } = useVoiceRecorder();
    const player = useVoicePlayer(currentlyPlayingUri);

    useEffect(() => {
        if (sessionId && sessionId !== 'new') {
            fetch(`https://api.fixmymind.org/api/voice-sessions/${sessionId}`)
                .then((res) => res.json())
                .then((json) => setMessages(json.messages || []))
                .catch(console.error);
        }
    }, [sessionId]);

    const handleRecord = async () => {
        try {
            setStatus('recording');
            await startRecording();
        } catch (e) {
            console.error(e);
            setStatus('idle');
        }
    };

    const handleStop = async () => {
        try {
            const uri = await stopRecording();
            if (uri) {
                setAudioUri(uri);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setStatus('idle'); // ✅ teraz tu wracamy do 'idle'
        }
    };

    const handleSend = async () => {
        if (!audioUri) return;
        setStatus('sending');

        try {
            const form = new FormData();
            const file = await fetch(audioUri).then((r) => r.blob());
            form.append('file', new File([file], 'recording.m4a', { type: 'audio/m4a' }));

            const res = await fetch(`https://api.fixmymind.org/api/voice-sessions/${sessionId}/messages`, {
                method: 'POST',
                body: form,
                headers: { Accept: 'application/json' },
            });

            const data = await res.json();

            if (res.ok && data.messages) {
                setMessages((prev) => [...prev, ...data.messages]);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setAudioUri(null); // ✅ wyczyść po wysłaniu
            setStatus('idle');
        }
    };

    const onPlay = async (uri, id) => {
        setCurrentlyPlayingUri(uri);
        setCurrentlyPlayingId(id);
        setStatus('playing');

        try {
            await player.play();
        } catch (e) {
            console.error('Playback error:', e);
        } finally {
            setCurrentlyPlayingId(null);
            setStatus('idle');
        }
    };

    const onStop = () => {
        setCurrentlyPlayingId(null);
        setStatus('idle');
    };

    return (
        <AppLayout>
            <HeaderWithMenu />
            <KeyboardAvoidingView
                className="flex-1 items-center"
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View className="w-full max-w-[720px] flex-1 px-4 pt-4 pb-28">
                    <VoiceTranscript
                        sessionId={sessionId}
                        messages={messages}
                        currentlyPlayingId={currentlyPlayingId}
                        onPlay={onPlay}
                        onStop={onStop}
                    />
                    {(status === 'sending' || status === 'playing') && (
                        <Text className="text-center text-sm text-purple-500 mt-4 animate-pulse">
                            🤔 AI przetwarza odpowiedź...
                        </Text>
                    )}
                </View>

                <View className="absolute bottom-0 left-0 right-0 px-4 py-4 bg-white border-t border-gray-200">
                    <View className="flex-row items-center justify-center gap-4">
                        {status === 'idle' && !audioUri && (
                            <Pressable onPress={handleRecord} className="bg-blue-600 p-5 rounded-full">
                                <Mic color="white" />
                            </Pressable>
                        )}
                        {status === 'recording' && (
                            <Pressable onPress={handleStop} className="bg-red-600 p-5 rounded-full">
                                <SendHorizonal color="white" />
                            </Pressable>
                        )}
                        {audioUri && status === 'idle' && (
                            <Pressable onPress={handleSend} className="bg-green-600 px-6 py-4 rounded-2xl">
                                <Text className="text-white font-semibold">Wyślij</Text>
                            </Pressable>
                        )}
                    </View>
                </View>
            </KeyboardAvoidingView>
        </AppLayout>
    );
}