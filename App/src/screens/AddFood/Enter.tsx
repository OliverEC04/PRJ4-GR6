import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function AddFoodPage() {
    const [foodName, setFoodName] = useState('');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fat, setFat] = useState('');
    const [value, setValue] = useState(null);
    const [meals, setMeals] = useState([]);

    useEffect(() => {
        fetchMeals();
    }, []);

    const fetchMeals = async () => {
        try {
            const response = await fetch('https://brief-oriole-causal.ngrok-free.app/rest_api/api/Barcode/ListOfBarcodes');
            const data = await response.json();
            setMeals(data);
        } catch (error) {
            console.error('Error fetching meals:', error);
        }
    };

    const handleMealSelect = (selectedMeal) => {
        setValue(selectedMeal.mealName);
        setFoodName(selectedMeal.mealName);
        setCalories(selectedMeal.calories.toString());
        setProtein(selectedMeal.protein.toString());
        setCarbs(selectedMeal.carbs.toString());
        setFat(selectedMeal.fat.toString());
    };

    const renderItem = (item) => (
        <TouchableOpacity onPress={() => handleMealSelect(item)}>
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.mealName}</Text>
                {item.mealName === value && (
                    <AntDesign name="checkcircle" size={20} color="black" />
                )}
            </View>
        </TouchableOpacity>
    );

    const handleAddNewFood = async () => {
        try {
            const response = await fetch(`https://brief-oriole-causal.ngrok-free.app/rest_api/api/Barcode/AddMealWithNoBarcode?mealName=${foodName}&calories=${calories}&protein=${protein}&carbs=${carbs}&fat=${fat}`, {
                method: 'POST'
            });
            if (response.ok) {
                Alert.alert('Success', 'New food added successfully!');
                setFoodName('');
                setCalories('');
                setProtein('');
                setCarbs('');
                setFat('');
                fetchMeals();
            } else {
                Alert.alert('Error', 'Failed to add new food. Please try again later.');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to add new food. Please check your network connection and try again.');
        }
    };

    return (
        <ScrollView>
            <Dropdown
                style={styles.dropdown}
                data={meals}
                labelField="mealName"
                valueField="id"
                placeholder="Select meal"
                value={value}
                onChange={(item) => setValue(item.mealName)}
                renderItem={renderItem}
            />
            
            {/* Input fields for food information */}
            <Text style={styles.label}>Food Name:</Text>
            <TextInput
                style={styles.input}
                value={foodName}
                onChangeText={setFoodName}
                placeholder="Enter food name"
            />
            <Text style={styles.label}>Calories:</Text>
            <TextInput
                style={styles.input}
                value={calories}
                onChangeText={setCalories}
                keyboardType="numeric"
                placeholder="Enter calorie amount"
            />
            <Text style={styles.label}>Protein (g):</Text>
            <TextInput
                style={styles.input}
                value={protein}
                onChangeText={setProtein}
                keyboardType="numeric"
                placeholder="Enter protein amount"
            />
            <Text style={styles.label}>Carbs (g):</Text>
            <TextInput
                style={styles.input}
                value={carbs}
                onChangeText={setCarbs}
                keyboardType="numeric"
                placeholder="Enter carbs amount"
            />
            <Text style={styles.label}>Fat (g):</Text>
            <TextInput
                style={styles.input}
                value={fat}
                onChangeText={setFat}
                keyboardType="numeric"
                placeholder="Enter fat amount"
            />
            
            {/* Button container for action buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={handleAddNewFood}
                    style={[styles.button, styles.addButton]}
                >
                    <Text style={styles.buttonText}>Add New Food</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {} /* Implement handle submit here */}
                    style={[styles.button, styles.submitButton]}
                >
                    <Text style={styles.buttonText}>Enter</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

// Styles are defined outside of the component to use Flexbox effectively
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-around', // Adjusted for spacing around main axis
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
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        borderRadius: 10,
        padding: 10,
        flex: 1, // Buttons take equal space
        marginHorizontal: 5, // Add horizontal space between buttons
        alignItems: 'center',
        justifyContent: 'center', // Center text vertically
    },
    addButton: {
        backgroundColor: 'green', // Add button is green
    },
    submitButton: {
        backgroundColor: '#333', // Submit button has a dark background
    },
    buttonText: {
        fontSize: 20,
        color: 'white',
    },
});
