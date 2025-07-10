import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles.native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function SessionSummary({ sessions }) {
    return (
        <View style={styles.summaryCard}>
            {sessions.map((s) => {
                const timeAgo = dayjs(s.date_time).fromNow();
                return (
                    <View key={s.id} style={styles.sessionRow}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.sessionDate}>{timeAgo}</Text>
                            <Text style={styles.sessionSummary}>{s.summary}</Text>
                        </View>
                        <TouchableOpacity onPress={() => console.log('Details', s.id)} style={styles.sessionDetailsBtn}>
                            <Text style={styles.sessionDetailsText}>➤</Text>
                        </TouchableOpacity>
                    </View>
                );
            })}
        </View>
    );
}