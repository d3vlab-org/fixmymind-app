
import { StyleSheet } from 'react-native';

const voiceSessionStyles = StyleSheet.create({
    avatarRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 40,
    },
    spectroRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    circle: {
        borderWidth: 3,
        borderRadius: 50,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f5f9',
    },
    spectrogram: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        height: 40,
    },
});

export default voiceSessionStyles;