import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
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

    const foodNameInput = useRef(null);
    const caloriesInput = useRef(null);
    const proteinInput = useRef(null);
    const carbsInput = useRef(null);
    const fatInput = useRef(null);

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

    const handleSubmit = () => {
        //should post to api an update user calrie intake
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
        <View style={styles.container}>
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

            <Text style={styles.label}>Food Name:</Text>
            <TextInput
                ref={foodNameInput}
                style={styles.input}
                value={foodName}
                onChangeText={setFoodName}
                placeholder="Enter food name"
            />

            <Text style={styles.label}>Calories:</Text>
            <TextInput
                ref={caloriesInput}
                style={styles.input}
                value={calories}
                onChangeText={setCalories}
                keyboardType="numeric"
                placeholder="Enter calorie amount"
            />

            <Text style={styles.label}>Protein (g):</Text>
            <TextInput
                ref={proteinInput}
                style={styles.input}
                value={protein}
                onChangeText={setProtein}
                keyboardType="numeric"
                placeholder="Enter protein amount"
            />

            <Text style={styles.label}>Carbs (g):</Text>
            <TextInput
                ref={carbsInput}
                style={styles.input}
                value={carbs}
                onChangeText={setCarbs}
                keyboardType="numeric"
                placeholder="Enter carbs amount"
            />

            <Text style={styles.label}>Fat (g):</Text>
            <TextInput
                ref={fatInput}
                style={styles.input}
                value={fat}
                onChangeText={setFat}
                keyboardType="numeric"
                placeholder="Enter fat amount"
            />

            <View style={styles.buttonContainer}>
            
                <TouchableOpacity
                    onPress={handleAddNewFood}
                    style={[styles.buttonStyle, styles.addFoodButtonStyle]}
                >
                    <Text style={styles.buttonText}>Add New Food</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleSubmit}
                    style={[styles.buttonStyle, styles.enterButtonStyle]}
                >
                    <Text style={styles.buttonText}>Enter</Text>
                </TouchableOpacity>



            </View>


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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    buttonStyle: {
        borderRadius: 10,
        padding: 10,
        width: '48%', // Adjust as needed
        alignItems: 'center',
    },
    enterButtonStyle: {
        backgroundColor: '#333333',
    },
    addFoodButtonStyle: {
        backgroundColor: 'green',
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
    },
});
