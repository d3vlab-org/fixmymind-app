import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthLayout from '../components/layout/AuthLayout';
import { useAuth } from '../context/AuthContext';

import {
    signInWithCredential,
    GoogleAuthProvider,
    browserLocalPersistence,
    setPersistence,
} from 'firebase/auth';
import { auth } from '../utils/auth/firebase';
import { GOOGLE_WEB_CLIENT_ID } from '../utils/auth/firebaseConfig';

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

const LoginScreen = () => {
    const navigation = useNavigation();
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const redirectUri = Platform.OS === 'web'
        ? 'https://dev.fixmymind.org/redirect'
        : 'https://auth.expo.io/@jdrabek/fixmymind';

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {
            clientId: GOOGLE_WEB_CLIENT_ID,
            redirectUri,
        },
        {
            projectNameForProxy: "@jdrabek/fixmymind",
        }
    );

    // 📌 Ustawienie trwałego logowania w przeglądarce
    useEffect(() => {
        if (Platform.OS === 'web') {
            setPersistence(auth, browserLocalPersistence)
                .then(() => console.log('✅ Firebase persistence ustawione'))
                .catch(err => console.error('❌ Persistence error:', err));
        }
    }, []);

    // 🔁 Web: odbierz token z popupu
    useEffect(() => {
        if (Platform.OS !== 'web') return;

        const handleGoogleMessage = (event) => {
            if (event.data?.source === 'fixmymind-google-auth' && event.data?.id_token) {
                const credential = GoogleAuthProvider.credential(event.data.id_token);
                signInWithCredential(auth, credential)
                    .then(userCredential => {
                        console.log('✅ Zalogowano jako:', userCredential.user.uid);
                        navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
                    })
                    .catch(err => console.error('❌ Błąd Firebase:', err));
            }
        };

        window.addEventListener('message', handleGoogleMessage);
        return () => window.removeEventListener('message', handleGoogleMessage);
    }, []);

    // 📱 Native (iOS/Android): logowanie z `response`
    useEffect(() => {
        if (
            Platform.OS !== 'web' &&
            response?.type === 'success' &&
            response?.params?.id_token
        ) {
            const credential = GoogleAuthProvider.credential(response.params.id_token);
            signInWithCredential(auth, credential)
                .then(userCredential => {
                    console.log('✅ Zalogowano (iOS/Android):', userCredential.user.uid);
                    navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
                })
                .catch(err => console.error('❌ Błąd Firebase:', err));
        }
    }, [response]);

    const handleLogin = async () => {
        try {
            const success = await login(email, password);
            if (success) {
                navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleGoogleLogin = async () => {
        await promptAsync({ projectNameForProxy: "@jdrabek/fixmymind" });
    };

    return (
        <AuthLayout>
            <View style={styles.container}>
                <Text style={styles.title}>Zaloguj się</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Hasło"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Zaloguj się</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
                    <Text style={styles.buttonText}>Zaloguj przez Google</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.link}>Nie masz konta? Zarejestruj się</Text>
                </TouchableOpacity>

                <Text style={styles.infoText}>
                    🛡 Twoje dane są przechowywane anonimowo. Nawet administratorzy nie mają dostępu do tego, kim jesteś.
                    Sesje terapeutyczne nie są powiązane z Twoją tożsamością.
                </Text>
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
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 16,
    },
    input: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 12,
        fontSize: 16,
    },
    button: {
        width: '100%',
        backgroundColor: '#4b3cc2',
        paddingVertical: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 12,
    },
    googleButton: {
        width: '100%',
        backgroundColor: '#db4437',
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
    link: {
        color: '#fff',
        textDecorationLine: 'underline',
        fontSize: 14,
        marginBottom: 12,
    },
    infoText: {
        fontSize: 12,
        color: '#ddd',
        textAlign: 'center',
        paddingTop: 12,
        paddingHorizontal: 4,
    },
});

export default LoginScreen;