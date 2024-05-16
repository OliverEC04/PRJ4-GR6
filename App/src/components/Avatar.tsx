import React, { useState } from 'react';
import { Image, StyleSheet, View, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native';
import PopupWindow from './Modal';
import * as ImagePicker from 'expo-image-picker';

interface AvatarProps {
    imageUrl: string;
    altText: string;
    size?: number;
    isEditing?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ imageUrl, size = 150, isEditing = false}) => {
    const [image, setImage] = useState(imageUrl);
    const [modalVisible, setModalVisible] = useState(false);
        
    const imageComponent = (imageUrl: string) => (
        <Image
            source={{ uri: imageUrl }}
            style={{
                width: size,
                height: size,
                borderRadius: size / 2,
                alignSelf: "center",
                marginBottom: 10,
            }}
        />
    );

    const onButtonPressed = () => {
        // Implement your logic here
    };

    return (
        <View style={{ position: 'relative' }}>
            {isEditing && (
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    {imageComponent(image)}
                </TouchableOpacity>
            )}
            {!isEditing && imageComponent(image)}
            <PopupWindow modalVisible={modalVisible} setModalVisible={setModalVisible} onImageUpdate={setImage} />        
        </View>
    );
    }

export default Avatar;