import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Camera, CameraView, useCameraPermissions } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router/build/imperative-api';

const QRCodeScanner: React.FC = () => {
    const [permission, requestPermission] = useCameraPermissions();
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        if (permission && permission.status !== 'granted') {
            requestPermission();
        }
    }, [permission]);

    if (!permission) {
        return (
            <View style={styles.container}>
                <Text>Requesting camera permission...</Text>
            </View>
        );
    }

    if (permission.status !== 'granted') {
        return (
            <View style={styles.container}>
                <Text>Camera permission is required to scan QR codes.</Text>
                <Button title="Grant Permission" onPress={requestPermission} />
            </View>
        );
    }

    const onBarcodeScanned = (data: { data: any; }) => {
        if (!scanned) {
            setScanned(true);
            console.log("Scanned data: ", data.data);
            router.push('controller', { scannedData: data.data });
            setTimeout(() => {
                setScanned(false);
            }, 3000); 
        }
    };

    return (
        <View style={styles.container}>
            <Text>Camera permission granted. Ready to scan QR codes!</Text>
            <View style={styles.cameraContainer}>
                <CameraView
                    style={styles.camera}
                    onBarcodeScanned={onBarcodeScanned}
                    ratio="4:3"
                >
                    <View style={styles.cameraOverlay}>
                        <Text style={styles.centerText}>Scan a QR Code</Text>
                    </View>
                </CameraView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    centerText: { fontSize: 18, padding: 20, color: '#777' },
    cameraContainer: {
        width: 300,
        height: 300,
        overflow: 'hidden',
        borderRadius: 15,
        elevation: 5,
    },
    camera: { flex: 1 },
    cameraOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' },
});

export default QRCodeScanner;
