
import React from 'react';
import { Platform, KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { appLayoutStyles } from '../../styles/AppLayoutStyles';
import { LinearGradient } from 'expo-linear-gradient';

export default function AppLayout({ children }) {
    const insets = useSafeAreaInsets();

    return (
        <LinearGradient
            colors={['#413f99', '#9273e6']}
            style={{ flex: 1 }}
        >
            <KeyboardAvoidingView
                style={[
                    appLayoutStyles.wrapper,
                    {
                        paddingTop: insets.top,
                        paddingBottom: insets.bottom,
                        ...(Platform.OS === 'web' && {
                            overflow: 'auto',
                        }),
                    },
                ]}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                {children}
            </KeyboardAvoidingView>
        </LinearGradient>
    );
}
