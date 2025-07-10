// src/utils/useVoicePlayer.js
import { useAudioPlayer } from 'expo-audio';

export default function useVoicePlayer(currentUri) {
    const player = useAudioPlayer({ uri: currentUri });
    return player;
}