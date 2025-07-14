
import React from 'react';
import { Platform, KeyboardAvoidingView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { appLayoutStyles } from '../../styles/AppLayoutStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../contexts/ThemeContext';

export default function AppLayout({ children }) {
    const insets = useSafeAreaInsets();
    const { theme, isDarkTheme } = useTheme();

    // Define gradient colors based on theme
    const darkGradient = ['#413f99', '#9273e6'];
    const lightGradient = ['#f0f4ff', '#d4d9f7'];

    return (
        <LinearGradient
            colors={isDarkTheme ? darkGradient : lightGradient}
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
