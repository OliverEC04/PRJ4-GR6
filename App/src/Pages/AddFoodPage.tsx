import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

//midlertidig data bare for at se om noget kommer frem i dropdown menuet

const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

  type DropdownValue = string | null;

export default function AddFoodPage() {
    const [foodName, setFoodName] = useState('');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fat, setFat] = useState('');
    const [value, setValue] = useState<DropdownValue>(null);

    const foodNameInput = useRef<TextInput>(null);
    const caloriesInput = useRef<TextInput>(null);
    const proteinInput = useRef<TextInput>(null);
    const carbsInput = useRef<TextInput>(null);
    const fatInput = useRef<TextInput>(null);

    const handleSubmit = () => {
        const numCalories = Number(calories);
        const numProtein = Number(protein);
        const numCarbs = Number(carbs);
        const numFat = Number(fat);

        if (!foodName.trim()) {
            Alert.alert("Error", "Please enter a food name");
            return;
        }

        if (numCalories < 1 || numProtein < 1 || numCarbs < 1 || numFat < 1) {
            Alert.alert("Error", "Please enter a valid number for each field");
            return;
        }

        console.log({ foodName, numCalories, numProtein, numCarbs, numFat });
    };

    const renderItem = (item: { label: string; value: string }) => (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
          {item.value === value && (
            <AntDesign name="checkcircle" size={20} color="black" />
          )}
        </View>
      );
    return (
        <View style={styles.container}>
        <Dropdown
                style={styles.dropdown}
                data={data}
                labelField="label"
                valueField="value"
                placeholder="Select item"
                value={value}
                onChange={item => setValue(item.value)}
                renderItem={renderItem}
            />
        <TouchableOpacity onPress={() => foodNameInput.current?.focus()}>
            <Text style={styles.label}>Food Name:</Text>
        </TouchableOpacity>
        <TextInput
            ref={foodNameInput}
            style={styles.input}
            value={foodName}
            onChangeText={setFoodName}
            placeholder="Enter food name"
        />
        <TouchableOpacity onPress={() => caloriesInput.current?.focus()}>
            <Text style={styles.label}>Calories:</Text>
        </TouchableOpacity>
        <TextInput
            ref={caloriesInput}
            style={styles.input}
            value={calories}
            onChangeText={setCalories}
            keyboardType="numeric"
            placeholder="Enter calorie amount"
        />

        <TouchableOpacity onPress={() => proteinInput.current?.focus()}>
            <Text style={styles.label}>Protein (g):</Text>
        </TouchableOpacity>
        <TextInput
            ref={proteinInput}
            style={styles.input}
            value={protein}
            onChangeText={setProtein}
            keyboardType="numeric"
            placeholder="Enter protein amount"
        />

        <TouchableOpacity onPress={() => carbsInput.current?.focus()}>
            <Text style={styles.label}>Carbs (g):</Text>
        </TouchableOpacity>
        <TextInput
            ref={carbsInput}
            style={styles.input}
            value={carbs}
            onChangeText={setCarbs}
            keyboardType="numeric"
            placeholder="Enter carbs amount"
        />

        <TouchableOpacity onPress={() => fatInput.current?.focus()}>
            <Text style={styles.label}>Fat (g):</Text>
        </TouchableOpacity>
        <TextInput
            ref={fatInput}
            style={styles.input}
            value={fat}
            onChangeText={setFat}
            keyboardType="numeric"
            placeholder="Enter fat amount"
        />

<TouchableOpacity
    onPress={handleSubmit}
    style={styles.buttonStyle}>
    <Text style={styles.buttonText}>Enter</Text>
</TouchableOpacity>

    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    dropdown: {
        height: 50,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12, 
        marginBottom: 15,
        paddingHorizontal: 10,
        borderColor: 'gray',
        borderWidth: 1,

    
      },
      item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      textItem: {
        flex: 1,
        fontSize: 16,
      },
    label: {
        fontSize: 18,
        marginTop: 15,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
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
        borderRadius: 10,
        padding: 10,
        backgroundColor: '#333333',
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    },
    
});