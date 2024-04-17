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

    function tailwind(arg0: string): import("react-native").StyleProp<import("react-native").TextStyle> {
        throw new Error('Function not implemented.');
    }

    return (
        <View style={tailwind('flex-1 justify-center px-5')}>
            <Text style={tailwind('text-2xl mb-5 text-center')}>Add Food Page</Text>
    
            <View style={tailwind('')}>
                <TouchableOpacity onPress={() => foodNameInput.current?.focus()}>
                    <Text style={tailwind('text-lg mb-2')}>Food Name:</Text>
                </TouchableOpacity>
                <TextInput
                    ref={foodNameInput}
                    style={tailwind('h-10 border-b-2 border-gray-300 px-4')}
                    value={foodName}
                    onChangeText={setFoodName}
                    placeholder="Enter food name"
                />
            </View>
    
            <View style={tailwind('')}>
                <TouchableOpacity onPress={() => caloriesInput.current?.focus()}>
                    <Text style={tailwind('text-lg mb-2')}>Calories:</Text>
                </TouchableOpacity>
                <TextInput
                    ref={caloriesInput}
                    style={tailwind('h-10 border-b-2 border-gray-300 px-4')}
                    value={calories}
                    onChangeText={setCalories}
                    keyboardType="numeric"
                    placeholder="Enter calorie amount"
                />
            </View>
    
            <View style={tailwind('')}>
                <TouchableOpacity onPress={() => proteinInput.current?.focus()}>
                    <Text style={tailwind('text-lg mb-2')}>Protein (g):</Text>
                </TouchableOpacity>
                <TextInput
                    ref={proteinInput}
                    style={tailwind('h-10 border-b-2 border-gray-300 px-4')}
                    value={protein}
                    onChangeText={setProtein}
                    keyboardType="numeric"
                    placeholder="Enter protein amount"
                />
            </View>
    
            <View style={tailwind('')}>
                <TouchableOpacity onPress={() => carbsInput.current?.focus()}>
                    <Text style={tailwind('text-lg mb-2')}>Carbs (g):</Text>
                </TouchableOpacity>
                <TextInput
                    ref={carbsInput}
                    style={tailwind('h-10 border-b-2 border-gray-300 px-4')}
                    value={carbs}
                    onChangeText={setCarbs}
                    keyboardType="numeric"
                    placeholder="Enter carbs amount"
                />
            </View>
    
            <View style={tailwind('')}>
                <TouchableOpacity onPress={() => fatInput.current?.focus()}>
                    <Text style={tailwind('text-lg mb-2')}>Fat (g):</Text>
                </TouchableOpacity>
                <TextInput
                    ref={fatInput}
                    style={tailwind('h-10 border-b-2 border-gray-300 px-4')}
                    value={fat}
                    onChangeText={setFat}
                    keyboardType="numeric"
                    placeholder="Enter fat amount"
                />
            </View>
    
            <View style={tailwind('mt-6')}>
                <Button
                    title="Enter"
                    onPress={handleSubmit}
                    color="#4B5563" // Tailwind's Gray-600 for demonstration, you can customize this
                />
            </View>
        </View>
    );
    
}

