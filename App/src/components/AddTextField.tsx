import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from "../styles/AddTextFieldStyle";

type KeyboardTypeOptions =
  | 'default'
  | 'number-pad'
  | 'decimal-pad'
  | 'numeric'
  | 'email-address'
  | 'phone-pad';

type TextFieldProps = {
    value: string,
    onChangeText: (text: string) => void,
    placeholder: string,
    keyboardType?: KeyboardTypeOptions,
    unit: string,
};

const AddTextField: React.FC<TextFieldProps> = ({
    value,
    onChangeText,
    placeholder,
    keyboardType = 'default', // Provide a default value
    unit,
}) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={{ flex: 1 }}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyboardType}
                placeholder={placeholder}
            />
            <Text>{unit}</Text>
        </View>
    );
};

export default AddTextField;
