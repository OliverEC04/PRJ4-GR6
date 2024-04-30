import React from "react";
import { View, Text, TextInput } from "react-native";
import style from "../styles/TextFieldStyle";

type TextBoxProps = {
  label: string;
  value: string;
  setValue: (text: string) => void;
  units: string;
};

const TextBox = ({ label, value, setValue, units }: TextBoxProps) => {
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
      <Text style={style.units}>{units}</Text>
    </View>
  );
};

export default TextBox;
