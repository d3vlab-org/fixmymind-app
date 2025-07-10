
import { StyleSheet } from 'react-native';

const dashboardStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    quote: {
        fontSize: 16,
        fontStyle: 'italic',
        marginBottom: 20,
        textAlign: 'center',
        color: '#555'
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
    },
    sessionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    primaryButton: {
        backgroundColor: '#4f46e5',
        padding: 12,
        borderRadius: 10,
        flex: 1,
        marginRight: 8
    },
    secondaryButton: {
        backgroundColor: '#e0e7ff',
        padding: 12,
        borderRadius: 10,
        flex: 1,
        marginLeft: 8
    },
    primaryButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    secondaryButtonText: {
        color: '#1e40af',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    sessionList: {
        marginTop: 10
    },
    sessionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        padding: 10,
        backgroundColor: '#f8fafc',
        borderRadius: 8
    },
    sessionDate: {
        flex: 1,
        color: '#64748b'
    },
    sessionSummary: {
        flex: 2,
        fontWeight: '500'
    },
    sessionButton: {
        backgroundColor: '#e2e8f0',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 6
    },
    sessionButtonText: {
        fontSize: 12,
        color: '#1e293b'
    }
});

export default dashboardStyles;