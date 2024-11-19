import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    banner: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: 16,
        zIndex: 10,
    },
    success: {
        backgroundColor: 'green',
    },
    error: {
        backgroundColor: 'red',
    },
    bannerText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
});
