import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 100,
        marginBottom: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        marginBottom: 8,
        textAlign: 'center',
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
    },
    item: {
        fontSize: 16,
        paddingVertical: 4,
    },
});
