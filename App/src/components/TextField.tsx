import React from "react";
import { View, Text, TextInput } from "react-native";
import style from "../styles/TextFieldStyle";

type TextFieldProps = {
  label: any;
  value: any;
  setValue: (text: any) => void;
  units: any;
  isEditing: boolean;
};

const TextField = ({
  label,
  value,
  setValue,
  units,
  isEditing,
}: TextFieldProps) => {
  const handleChangeText = (text: string) => {
    setValue(Number(text));
  };

  return (
    <View style={style.entry}>
      <Text style={style.label}>{label}:</Text>
      <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
        <TextInput
          style={[style.input, { color: isEditing ? "black" : "grey" }]}
          onChangeText={handleChangeText}
          value={value.toString()}
          editable={isEditing}
          keyboardType="numeric"
          underlineColorAndroid="transparent"
        />
        <Text style={style.units}>{units}</Text>
      </View>
    </View>
  );
};

export default TextField;
