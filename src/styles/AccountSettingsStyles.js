// src/styles/AccountSettingsStyles.js

import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        padding: 24,
        maxWidth: 720,
        alignSelf: 'center',
        width: '100%',
        gap: 24,
    },
    section: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        padding: 16,
        borderRadius: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        color: '#eee',
        marginBottom: 4,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 16,
        fontSize: 16,
        marginBottom: 12,
    },
    saveButton: {
        backgroundColor: '#5F43F3',
        paddingVertical: 14,
        borderRadius: 14,
        alignItems: 'center',
        marginTop: 24,
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});