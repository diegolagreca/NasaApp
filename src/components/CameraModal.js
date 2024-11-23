import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Modal, Image } from 'react-native';

const CameraModal = ({ visible, onClose }) => {
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [cameraRef, setCameraRef] = useState(null);
    const [photo, setPhoto] = useState(null);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
                <Button onPress={requestPermission} title="Grant Permission" />
            </View>
        );
    }

    const toggleCameraFacing = () => {
        setFacing((current) => (current === 'back' ? 'front' : 'back'));
    };

    const handleTakePicture = async () => {
        if (cameraRef) {
            const photo = await cameraRef.takePictureAsync();
            setPhoto(photo.uri);
        }
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide">
            <View style={styles.container}>
                {photo ? (
                    <View>
                        <Image source={{ uri: photo }} style={styles.preview} />
                        <TouchableOpacity style={styles.closeButton} onPress={() => setPhoto(null)}>
                            <Text style={styles.text}>Retake Picture</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <CameraView style={styles.camera} facing={facing} ref={(ref) => setCameraRef(ref)}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                                <Text style={styles.text}>Flip Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={handleTakePicture}>
                                <Text style={styles.text}>Take Picture</Text>
                            </TouchableOpacity>
                        </View>
                    </CameraView>
                )}
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Text style={styles.text}>Close</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    button: {
        backgroundColor: 'rgba(255,255,255,0.8)',
        padding: 10,
        borderRadius: 8,
        marginHorizontal: 10,
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    closeButton: {
        alignSelf: 'center',
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 8,
        marginTop: 20,
    },
    preview: {
        width: 200,
        height: 300,
        alignSelf: 'center',
    },
});

export default CameraModal;
