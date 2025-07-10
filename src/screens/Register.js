import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import AppLayout from '../components/layout/AuthLayout';
import AuthForm from '../components/AuthForm';

export default function Register() {
    const navigation = useNavigation();
    const { register } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        if (!email.includes('@') || password.length < 6) {
            alert('Wprowadź poprawny e-mail i hasło (min. 6 znaków)');
            return;
        }

        const success = await register(email, password);
        if (success) {
            navigation.reset({ index: 0, routes: [{ name: 'Main' }] });
        } else {
            alert('Nie udało się zarejestrować. Sprawdź połączenie internetowe lub spróbuj ponownie później.');
        }
    };

    return (
        <AppLayout showHeader={false}>
            <AuthForm
                title="Rejestracja"
                buttonText="Zarejestruj się"
                email={email}
                onEmailChange={setEmail}
                password={password}
                onPasswordChange={setPassword}
                onSubmit={handleRegister}
                footerText="Masz już konto? Zaloguj się"
                onFooterPress={() => navigation.navigate('Login')}
            />
        </AppLayout>
    );
}