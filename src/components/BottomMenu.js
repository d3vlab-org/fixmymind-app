import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const icons = {
    Dashboard: 'dashboard',
    VoiceSession: 'mic',
    History: 'history',
    SelfWork: 'self-improvement',
    Tests: 'assignment',
    Settings: 'settings',
};

export default function BottomMenu({ active, onChange }) {
    return (
        <View style={styles.container}>
            {Object.keys(icons).map((key) => (
                <TouchableOpacity key={key} style={styles.tab} onPress={() => onChange(key)}>
                    <MaterialIcons
                        name={icons[key]}
                        size={24}
                        color={active === key ? '#007bff' : '#666'}
                    />
                    <Text style={[styles.label, active === key && styles.activeText]}>{key}</Text>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 8,
        borderTopWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    tab: {
        alignItems: 'center',
    },
    label: {
        fontSize: 10,
        color: '#666',
        marginTop: 2,
    },
    activeText: {
        color: '#007bff',
    },
});