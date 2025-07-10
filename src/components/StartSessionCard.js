import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles.native';

export default function StartSessionCard({ setScreen }) {
    return (
        <View style={styles.sessionCard}>
            <Text style={styles.sessionTitle}>Rozpocznij nową sesję</Text>
            <View style={styles.sessionOptions}>
                <TouchableOpacity style={styles.sessionBtn} onPress={() => setScreen('VoiceSession')}>
                    <Text style={styles.sessionBtnText}>🎤 Głosowa</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sessionBtn} onPress={() => setScreen('Chat')}>
                    <Text style={styles.sessionBtnText}>💬 Chat</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}