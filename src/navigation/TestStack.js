import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Tests from '../screens/Tests';
import TestSession from '../screens/TestSession';
import TestSummary from '../screens/TestSummary';

const Stack = createStackNavigator();

export default function TestStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="TestsList" component={Tests} />
            <Stack.Screen name="TestSession" component={TestSession} />
            <Stack.Screen name="TestSummary" component={TestSummary} />
        </Stack.Navigator>
    );
}