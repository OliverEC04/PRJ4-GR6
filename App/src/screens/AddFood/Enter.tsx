import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import AddTextField from "../../components/AddTextField";
import styles from './EnterStyle';
import { User, currentUser } from "../../models/User";
import Btn from "../../components/Btn";
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';

export default function AddFoodPage() {
    const [isEditing, setIsEditing] = useState(false); 
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
            const headers = { 'Authorization': 'Bearer ' + currentUser.token};
            const response = await fetch('https://brief-oriole-causal.ngrok-free.app/api/Barcode/ListOfBarcodesForUser', { headers });
            const data = await response.json();
            setMeals(data);
        } catch (error) {
            console.error('Error fetching meals:', error);
        }
        
    };

    const handleMealSelect = (selectedMeal:any) => {
        setId(selectedMeal.id.toString());
        setValue(selectedMeal.mealName);
        setFoodName(selectedMeal.mealName);
        setCalories(selectedMeal.calories.toString());
        setProtein(selectedMeal.protein.toString());
        setCarbs(selectedMeal.carbs.toString());
        setFat(selectedMeal.fat.toString());
    };

    const renderItem = (item:any) => (
        <TouchableOpacity onPress={() => handleMealSelect(item)}>
            <View style={styles.item}>
                <Text style={styles.textItem}>{item.mealName}</Text>
                {item.mealName === value && (
                    <AntDesign name="checkcircle" size={20} color="black" />
                )}
            </View>
        </TouchableOpacity>
    );

    const handleEditPress = () => {
        setIsEditing(!isEditing);
      };

      const handleAddNewFood = async () => {
        try {
            const response = await fetch(`https://brief-oriole-causal.ngrok-free.app/api/Barcode/AddMealWithNoBarcode?mealName=${foodName}&calories=${calories}&protein=${protein}&carbs=${carbs}&fat=${fat}`, {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + currentUser.token}
            });
      
      
        
      
          if (response.ok) {
            Alert.alert('Success', 'New food added successfully!');
            setId(null);
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
      

      const updateDailyIntake = async () => {
        try {
            const response = await fetch('https://brief-oriole-causal.ngrok-free.app/AppUser/updateDailyIntake', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + currentUser.token
                },
                body: JSON.stringify({
                    calories: parseFloat(calories),
                    protein: parseFloat(protein),
                    carbs: parseFloat(carbs),
                    fat: parseFloat(fat),
                    water: 0 // Water is always 0
                })
            });
    
            if (response.ok) {
                Alert.alert('Success', 'Daily intake updated successfully!');
            } else {
                Alert.alert('Error', 'Failed to update daily intake. Please try again later.');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to update daily intake. Please check your network connection and try again.');
        }
    };

    const handleDeleteNewFood = async () => {
        try {
            const headers = { 'Authorization': 'Bearer ' + currentUser.token};
            const response = await fetch(`https://brief-oriole-causal.ngrok-free.app/api/Barcode/RemoveBarcode/${id}`, {
                method: 'DELETE',
                headers: headers
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
                fetchMeals();
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to delete food. Please check your network connection and try again.');
            fetchMeals();
        }
    };

    return (
        <ScrollView style={{paddingTop: 55}}>
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
    <AddTextField
    value={foodName}
    onChangeText={setFoodName}
    placeholder="Enter food name"
    keyboardType="default" // This can be omitted since 'default' is the default value
    unit="" // No unit for the food name
    />       
    
    {/* calories Input with Unit */}
    <AddTextField
  value={calories}
  onChangeText={setCalories}
  placeholder="Enter calories amount"
  keyboardType="numeric"
  unit="kcal"
/>

 {/* Protein Input with Unit */}
    <AddTextField
    value={protein}
    onChangeText={setProtein}
    placeholder="Enter protein amount"
    keyboardType="numeric" 
    unit="g" 
    />  
    
    {/* Carbs Input with Unit */}
    <AddTextField
    value={carbs}
    onChangeText={setCarbs}
    placeholder="Enter carbs amount"
    keyboardType="numeric" 
    unit="g" 
    />  

    {/* Fat Input with Unit */}
    <AddTextField
    value={fat}
    onChangeText={setFat}
    placeholder="Enter fat amount"
    keyboardType="numeric" 
    unit="g" 
    />  
            {/* Button container for action buttons */}
            <View style={styles.buttonContainer}>
                <Btn onClick={updateDailyIntake} text='Enter' style={styles.submitButton}/> 
            </View>
            <View style={styles.buttonContainer}>
                <Btn onClick={handleAddNewFood} text='Add New Food' style={styles.addButton}/>
                <Btn onClick={handleDeleteNewFood} text='Delete Food' style={styles.deleteButton}/>
            </View>
        </ScrollView>
    );
}

