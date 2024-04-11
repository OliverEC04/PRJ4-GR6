import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CameraView, Camera } from "expo-camera/next";

export default function Scanner() {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);
    const [scannedText, setScannedText] = useState('Not yet scanned'); 

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
        },
    });

    // Request permission to use the camera
    const askedForPermission = async () => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }

    // If the user has not granted permission, ask for it
    useEffect(() => {
        askedForPermission();
    }, []);

    // Handle the scanned data
    const handlebarCodeScanned = ({ type, data }: { type: string, data: string }) => {
        setScanned(true);
        setScannedText(data); // Ændret funktionskald her
        console.log('Type: ' + type + ' Data: ' + data);
    }

    // If the user has not granted permission to use the camera, display 'No access to camera'
    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>No access to camera</Text> 
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                style={{ flex: 1 }}
                onBarcodeScanned={scanned ? undefined : handlebarCodeScanned}
            />
            <Button title={'Scan again'} onPress={() => setScanned(false)} />
            <Text>{scannedText}</Text> {/* Ændret variabelnavn her */}
            <StatusBar style="auto" />
        </View>
    );

}
