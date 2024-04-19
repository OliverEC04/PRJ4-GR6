import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import Btn from "../../components/Btn";
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

export default function AddFoodPage() {
    const [foodName, setFoodName] = useState('');
    const [calories, setCalories] = useState('');
    const [protein, setProtein] = useState('');
    const [carbs, setCarbs] = useState('');
    const [fat, setFat] = useState('');
    const [id, setId] = useState(null);
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
        setId(selectedMeal.id.toString());
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

    const handleDeleteNewFood = async () => {
        try {
            const response = await fetch(`https://brief-oriole-causal.ngrok-free.app/rest_api/api/Barcode/RemoveBarcode/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                Alert.alert('Success', 'Food deleted successfully!');
                setFoodName('');
                setCalories('');
                setProtein('');
                setCarbs('');
                setFat('');
                fetchMeals();
            } else {
                Alert.alert('Error', 'Failed to delete food. Please try again later.');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to delete food. Please check your network connection and try again.');
        }
    };

    return (
        <ScrollView style={{paddingTop: 20}}>
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
            <TextInput
                style={styles.inputContainer}
                value={foodName}
                onChangeText={setFoodName}
                placeholder="Enter food name"
            />
            <View style={styles.inputContainer}>
        <TextInput
            style={{ flex: 1 }}
            value={calories}
            onChangeText={setCalories}
            keyboardType="numeric"
            placeholder="Enter calorie amount"
        />
        <Text>kcal</Text>
    </View>
    
    {/* Protein Input with Unit */}
    <View style={styles.inputContainer}>
        <TextInput
            style={{ flex: 1 }}
            value={protein}
            onChangeText={setProtein}
            keyboardType="numeric"
            placeholder="Enter protein amount"
        />
        <Text>g</Text>
    </View>
    
    {/* Carbs Input with Unit */}
    <View style={styles.inputContainer}>
        <TextInput
            style={{ flex: 1 }}
            value={carbs}
            onChangeText={setCarbs}
            keyboardType="numeric"
            placeholder="Enter carbs amount"
        />
        <Text>g</Text>
    </View>
    
    {/* Fat Input with Unit */}
    <View style={styles.inputContainer}>
        <TextInput
            style={{ flex: 1 }}
            value={fat}
            onChangeText={setFat}
            keyboardType="numeric"
            placeholder="Enter fat amount"
        />
        <Text>g</Text>
    </View>

            {/* Button container for action buttons */}
            <View style={styles.buttonContainer}>
                <Btn onClick={() => {}} text='Enter' style={styles.submitButton}/> 
            </View>
            <View style={styles.buttonContainer}>
                <Btn onClick={handleAddNewFood} text='Add New Food' style={styles.addButton}/>
                <Btn onClick={handleDeleteNewFood} text='Delete Food' style={styles.deleteButton}/>
            </View>
        </ScrollView>
    );
}

// Styles are defined outside of the component to use Flexbox effectively
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-around',
    },
    dropdown: {
        height: 45,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderColor: 'gray',
        borderWidth: 1,
        alignSelf: 'center',
        width: '85%',
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
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        alignSelf: 'center',
        width: '85%',
        height: 45,
        backgroundColor: 'white',
    },
    
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    addButton: {
        backgroundColor: '#4169e1', 
        width: "50%",
    },
    submitButton: {
        backgroundColor: '#333', 
        width: "100%",
    },

    deleteButton: {
        backgroundColor: 'red', 
        width: "50%",
    },
});
