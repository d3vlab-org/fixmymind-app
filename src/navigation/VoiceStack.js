// src/navigation/VoiceStack.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import VoiceSessionsList from '../screens/VoiceSessionList';
import VoiceSession from '../screens/VoiceSession';

const Stack = createStackNavigator();

export default function VoiceStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="VoiceSessionsList" component={VoiceSessionsList} />
            <Stack.Screen name="VoiceSession" component={VoiceSession} />
        </Stack.Navigator>
    );
}