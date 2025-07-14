import './global.css';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/contexts/ThemeContext';

// Initialize Firebase when the app starts
import './src/utils/auth/firebase';

import SplashScreen from './src/screens/Splash';
import Welcome from './src/screens/Welcome';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import BottomTabs from './src/navigation/BottomTabs';
import TestStart from './src/screens/TestStart';
import Tests from "./src/screens/Tests";
import TestSession from "./src/screens/TestSession";
import GoogleRedirectHandler from "./src/screens/GoogleRedirectHandler";
import VoiceSession from "./src/screens/VoiceSession";
import PaymentPlans from "./src/screens/PaymentPlans";
import UserProfile from "./src/screens/UserProfile";
import CheckoutSuccess from "./src/screens/CheckoutSucess";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer
            linking={{prefixes: ['https://dev.fixmymind.org'],config: {
                screens: {
                        GoogleRedirect: 'redirect',
                        // dodaj inne jeśli chcesz wspierać bezpośrednie linki
                    },},}}>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}
                initialRouteName="Splash"
            >
                <Stack.Screen name="Splash" component={SplashScreen} />
                <Stack.Screen name="Main" component={BottomTabs} />
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="TestStart" component={TestStart} />
                <Stack.Screen name="Tests" component={Tests} />
                <Stack.Screen name="TestSession" component={TestSession} />
                <Stack.Screen name="VoiceSession" component={VoiceSession} />
                <Stack.Screen name="GoogleRedirect" component={GoogleRedirectHandler} />
                <Stack.Screen name="PaymentPlans" component={PaymentPlans} />
                <Stack.Screen name="UserProfile" component={UserProfile} />
                <Stack.Screen name="CheckoutSuccess" component={CheckoutSuccess} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default function App() {

    return (
        <AuthProvider>
            <ThemeProvider>
                <AppNavigator />
            </ThemeProvider>
        </AuthProvider>
    );
}
