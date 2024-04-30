import React from "react";
import { View, Text, TextInput } from "react-native";
import style from "../styles/TextFieldStyle";

type TextBoxProps = {
  label: string;
  value: string;
  setValue: (text: string) => void;
};

const TextBox = ({ label, value, setValue }: TextBoxProps) => {
  return (
    <View style={style.entry}>
      <TextInput
        placeholder={label}
        style={style.input}
        onChangeText={setValue}
        value={value}
        keyboardType="default"
        editable={true}
      />
    </View>
  );
};

export default TextBox;
