import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6C63FF',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: height * 0.08, // było 0.1
        paddingHorizontal: 24,
    },
    logo: {
        width: width * 0.35,      // trochę mniejsze logo
        height: width * 0.35,
        resizeMode: 'contain',
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 14,
        color: '#eeeeee',
        textAlign: 'center',
        marginBottom: 32,
    },
    button: {
        backgroundColor: '#ffffff',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 8,
        marginBottom: 16,
        width: '85%',
        maxWidth: 400,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#6C63FF',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
    },
    footer: {
        position: 'absolute',
        bottom: 20,
        fontSize: 12,
        color: '#dddddd',
        textAlign: 'center',
    },
});