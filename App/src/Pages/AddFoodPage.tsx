import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';

export default function AddFoodPage() {
    const [foodName, setFoodName] = useState('');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fat, setFat] = useState('');

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

    return (
        <View style={styles.container}>
        <Text style={styles.header}>Add Food Page</Text>

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

        <Button title="Enter" onPress={handleSubmit} />
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    header: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
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
    },
    inputGroup: {
        marginBottom: 15,
    },
});
