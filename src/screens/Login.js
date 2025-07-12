// src/screens/Login.js
import React from 'react';
import { Button, Text, View } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { useAuth } from '../context/AuthContext';
import {GOOGLE_WEB_CLIENT_ID} from "../utils/auth/firebaseConfig";
import { auth } from '../utils/auth/firebase';

export default function Login() {
    const { setUser, setToken } = useAuth();

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: GOOGLE_WEB_CLIENT_ID,
    });

    React.useEffect(() => {
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential)
                .then(async (userCredential) => {
                    const token = await userCredential.user.getIdToken();
                    setUser(userCredential.user);
                    setToken(token);
                })
                .catch((error) => {
                    console.error('Błąd logowania:', error);
                });
        }
    }, [response]);

    return (
        <View className="flex-1 items-center justify-center bg-black">
            <Text className="text-white text-2xl mb-6">Zaloguj się</Text>
            <Button disabled={!request} onPress={() => promptAsync()} title="Zaloguj przez Google" />
        </View>
    );
}