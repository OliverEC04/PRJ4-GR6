import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';

export default function Home() {
  const [goal, setGoal] = useState(79);
  const [weight, setWeight] = useState(79);
  const [calories, setCalories] = useState(79);
  const [protein, setProtein] = useState(79);

  const incrementValue = (setter: React.Dispatch<React.SetStateAction<number>>, currentValue: number) => {
    setter(currentValue + 1);
  };
  

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Name" />
      <TextInput style={styles.input} placeholder="Height" />
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Goal:</Text>
        <TextInput style={styles.valueInput} value={goal.toString()} />
        <TouchableOpacity onPress={() => incrementValue(setGoal, goal)} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Weight</Text>
        <TextInput style={styles.valueInput} value={weight.toString()} />
        <TouchableOpacity onPress={() => incrementValue(setWeight, weight)} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Calorie:</Text>
        <TextInput style={styles.valueInput} value={calories.toString()} />
        <TouchableOpacity onPress={() => incrementValue(setCalories, calories)} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Protein:</Text>
        <TextInput style={styles.valueInput} value={protein.toString()} />
        <TouchableOpacity onPress={() => incrementValue(setProtein, protein)} style={styles.button}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
      <Button title="Save" color="red" onPress={() => console.log('Save button pressed')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: '80%',
    margin: 10,
    padding: 10,
    borderColor: 'grey',
    borderWidth: 1,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    margin: 10,
  },
  label: {
    flex: 1,
    fontSize: 18,
  },
  valueInput: {
    flex: 2,
    padding: 10,
    borderColor: 'grey',
    borderWidth: 1,
  },
  button: {
    marginLeft: 10,
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
