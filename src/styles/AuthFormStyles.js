import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    formWrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        backgroundColor: 'transparent',
    },
    title: {
        fontSize: 26,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 24,
    },
    form: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        padding: 24,
        alignItems: 'stretch',
    },
    input: {
        backgroundColor: 'white',
        padding: 14,
        borderRadius: 8,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#413f99',
        padding: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    footerText: {
        color: 'white',
        marginTop: 20,
        textAlign: 'center',
    },
    footerLink: {
        color: '#fff',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
});