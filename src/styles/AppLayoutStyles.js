import { StyleSheet } from 'react-native';

export const appLayoutStyles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    keyboardAvoidingView: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    innerContainer: {
        width: '100%',
        maxWidth: 720,
        padding: 16,
        backgroundColor: 'rgba(255,255,255,0.95)',
        borderRadius: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 4,
    },
    wrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
    }
});