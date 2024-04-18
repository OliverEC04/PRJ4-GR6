import React, { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";

interface NumberInputProps {
  placeholder?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({ placeholder }) => {
  const [number, setNumber] = useState<string>("");

  const handleNumberChange = (text: string) => {
    // Regular expression to allow only numbers
    const regex = /^[0-9]*$/;
    if (regex.test(text) || text === "") {
      setNumber(text);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={number}
        onChangeText={handleNumberChange}
        placeholder={placeholder || "Enter a number"}
        keyboardType="numeric" // Restrict input to numeric keyboard
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  input: {
    height: 40,
    width: "80%",
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 10,
  },
});

export default NumberInput;
