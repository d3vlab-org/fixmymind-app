import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthLayout from '../components/layout/AuthLayout';

const WelcomeScreen = () => {
    const navigation = useNavigation();

    return (
        <AuthLayout>
            <View style={styles.container}>
                <Text style={styles.title}>Witaj w FixMyMind</Text>
                <Text style={styles.subtitle}>Twoim osobistym przewodniku po samopoczuciu</Text>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonText}>Zaloguj się</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.button, styles.outlineButton]} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.outlineButtonText}>Zarejestruj się</Text>
                </TouchableOpacity>
            </View>
        </AuthLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingTop: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#eee',
        marginBottom: 32,
        textAlign: 'center',
    },
    button: {
        width: '100%',
        backgroundColor: '#4b3cc2',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#fff',
    },
    outlineButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default WelcomeScreen;
