import React from "react";
import { View, Text, TextInput } from "react-native";
import style from "../styles/TextFieldStyle";

type TextFieldProps = {
  label: string;
  value: string;
  setValue: (text: string) => void;
  units: string;
};

const TargetWeight = ({ label, value, setValue, units }: TextFieldProps) => {
  return (
    <View style={style.entry}>
      <Text style={style.label}>{label}:</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          style={style.input}
          onChangeText={setValue}
          value={value}
          keyboardType="numeric"
          underlineColorAndroid="transparent"
        />
        <Text style={style.units}>{units}</Text>
      </View>
    </View>
  );
};

export default TargetWeight;
