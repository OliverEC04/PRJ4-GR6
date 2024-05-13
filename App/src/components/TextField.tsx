import React from 'react';
import { View, Text, TextInput } from 'react-native';
import style from '../styles/TextFieldStyle';

type TextFieldProps = {
  label: any,
  value: any,
  setValue: (text: any) => void,
  units: any,
  isEditing: boolean,
};

const TextField = ({
  label,
  value,
  setValue,
  units,
  isEditing,
}: TextFieldProps) => {
  return (
    <View style={style.entry}>
      <Text style={style.label}>{label}:</Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          style={style.input}
          onChangeText={setValue}
          value={value}
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