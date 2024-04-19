import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";

import { Text } from "react-native";

export default function GoalWeight() {
  const [goalWeight, setGoalWeight] = useState("");

  const goalWeightInput = useRef<TextInput>(null);

  const handleSubmit = () => {
    const numGoalWeight = Number(goalWeight);

    if (numGoalWeight < 1) {
      Alert.alert("Error", "Please enter a valid number for each field");
      return;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => goalWeightInput.current?.focus()}>
        <Text style={styles.label}>Goal Weight:</Text>
      </TouchableOpacity>
      <TextInput
        ref={goalWeightInput}
        style={styles.input}
        value={goalWeight}
        onChangeText={setGoalWeight}
        keyboardType="numeric"
        placeholder="Enter your goal weight"
      />
      <Text style={styles.label}>Goal Weight:</Text>

      <Text>{goalWeight}</Text>
      <TouchableOpacity onPress={handleSubmit} style={styles.buttonStyle}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
    padding: 20,
    marginTop: 50,
  },
  header: {
    fontSize: 24,
    marginTop: 100,
    textAlign: "center",
    color: "black",
  },
  label: {
    fontSize: 18,
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    width: 300,
    borderRadius: 10,
    marginBottom: 15,
  },
  inputGroup: {
    marginBottom: 15,
  },
  buttonStyle: {
    marginTop: 30,
    borderRadius: 20,
    padding: 10,
    height: 50,
    backgroundColor: "#333333",
  },
  buttonText: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
  },
});
