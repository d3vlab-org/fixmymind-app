// src/utils/useVoiceRecorder.js
import { useState, useEffect } from 'react';
import { AudioModule, useAudioRecorder, RecordingPresets } from 'expo-audio';

export default function useVoiceRecorder() {
    const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
    const [hasPermission, setHasPermission] = useState(false);

    useEffect(() => {
        (async () => {
            const status = await AudioModule.requestRecordingPermissionsAsync();
            setHasPermission(status.granted);
            if (!status.granted) {
                console.warn('Brak uprawnień do mikrofonu');
            }
        })();
    }, []);

    const startRecording = async () => {
        if (!hasPermission) throw new Error('Brak uprawnień');
        await recorder.prepareToRecordAsync();
        recorder.record();
        return recorder.uri;
    };

    const stopRecording = async () => {
        await recorder.stop();
        return recorder.uri;
    };

    return { startRecording, stopRecording };
}