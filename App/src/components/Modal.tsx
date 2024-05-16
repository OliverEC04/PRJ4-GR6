import React, { useState } from 'react';
import { Modal, View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import RoundBtn from './RoundBtn';
import * as ImagePicker from 'expo-image-picker';
import Server from '../models/Server';

interface PopupWindowProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    onImageUpdate: (image: string) => void;
  }

const PopupWindow: React.FC<PopupWindowProps> = ({ modalVisible, setModalVisible, onImageUpdate }) => {
    const placeholder = 'https://toppng.com/public/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png';

    const uploadImage = async (mode: string) => {
        try {
            let result = null;

            if(mode === "gallery") {
                await ImagePicker.requestMediaLibraryPermissionsAsync();
                result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [1, 1],
                    quality: 1,
                });
            } else {
                await ImagePicker.requestMediaLibraryPermissionsAsync();
                result = await ImagePicker.launchCameraAsync({
                cameraType: ImagePicker.CameraType.back,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
            }
            

            if(!result.canceled) {
                // Handle image upload here
                await saveImage(result.assets[0].uri);
            }
        } catch (error) {
            console.log(error);
            alert("Failed to upload image" + (error as Error).message);
        }
    }

    const saveImage = async (image: string) => {
        try {
            setModalVisible(false);
            onImageUpdate(image);
            Server.saveImage(image);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    const removeImage = async () => {
        try {
            // Handle image removal here
            await Server.removeImage();
            setModalVisible(false);
            onImageUpdate(placeholder);
        } catch (error) {
            console.log(error);
            alert("Failed to remove image" + (error as Error).message);
        }
    }


    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <TouchableOpacity style={styles.centeredView} onPress={() => setModalVisible(!modalVisible)}>
            <View style={styles.modalView}>
                <View style={styles.buttonContainer}>
                    <RoundBtn icon="camera" style={styles.round} onClick={() => uploadImage("camera")} />
                    <Text style={styles.buttonText}>Camera</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <RoundBtn icon="image" style={styles.round} onClick={() => uploadImage("gallery")} />
                    <Text style={styles.buttonText}>Gallery</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <RoundBtn icon="delete" style={styles.round} onClick={() => removeImage()} />
                    <Text style={styles.buttonText}>Delete</Text>
                </View>
            </View>
        </TouchableOpacity>
        </Modal>
        </View>
    );
}


export default PopupWindow;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
        },
        buttonContainer: {
        alignItems: "center",
        },
        buttonText: {
        marginTop: 2,
        },
    modalView: {
        flexDirection: "row",
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    round: {
        padding: 10,
        margin: 8,
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "#61AFEF",
        width: 60,
        height: 60,
        borderRadius: 30,
        color: "white",
    }
});
