// src/components/BackgroundGradient.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const BackgroundGradient = ({ children }) => {
    return (
        <LinearGradient
            colors={['#3A1C71', '#D76D77', '#FFAF7B']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradient}
        >
            <View style={styles.content}>{children}</View>
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingTop: 50,
    },
});

export default BackgroundGradient;