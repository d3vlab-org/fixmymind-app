import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles.native';

export default function QuoteWidget() {
    return (
        <View style={styles.quoteCard}>
            <Text style={styles.quoteText}>
                „Największą chwałą nie jest to, że nigdy nie upadamy, ale że potrafimy się podnieść za każdym razem, gdy upadniemy.”
            </Text>
            <Text style={styles.quoteAuthor}>– Konfucjusz</Text>
        </View>
    );
}