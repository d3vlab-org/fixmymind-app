import { useEffect, useRef } from 'react';
import { Audio } from 'expo-av';
import { Alert } from 'react-native';

export default function useVoicePlayer() {
    const soundRef = useRef(null);

    useEffect(() => {
        // Konfiguracja trybu audio (uruchamiamy raz)
        Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            staysActiveInBackground: true,
            playsInSilentModeIOS: true,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: false,
        });

        return () => {
            // Czyścimy dźwięk przy odmontowaniu komponentu
            if (soundRef.current) {
                soundRef.current.unloadAsync();
            }
        };
    }, []);

    const play = async (url) => {
        try {
            if (!url) throw new Error('Brak audio URL do odtworzenia.');

            // Zatrzymaj wcześniejszy dźwięk, jeśli istnieje
            if (soundRef.current) {
                await soundRef.current.unloadAsync();
            }

            const { sound } = await Audio.Sound.createAsync({ uri: url }, { shouldPlay: true });
            soundRef.current = sound;
        } catch (error) {
            console.error('Błąd odtwarzania:', error);
            Alert.alert('Nie udało się odtworzyć odpowiedzi.', error.message || 'Nieznany błąd.');
        }
    };

    return { play };
}