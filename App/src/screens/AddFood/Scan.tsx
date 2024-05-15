import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Modal, ScrollView, Alert } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { currentUser } from '../../models/User';
import { useIsFocused } from '@react-navigation/native';
import AddTextField from "../../components/AddTextField";
import Btn from "../../components/Btn";
import styles from "./ScanStyle";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [foodInfo, setFoodInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [branName, setBrandName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState('');
  const [consumedGrams, setConsumedGrams] = useState('');
  const [intakeInfo, setIntakeInfo] = useState(null);
  const [foodName, setFoodName] = useState('');
  const [calories, setCalories] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const isFocused = useIsFocused();

  const askForCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };


  
  const updateDailyIntake = async () => {
    try {
        const url = `http://rottehjem.duckdns.org:5000/AppUser/updateDailyIntake?calories=${intakeInfo.calories.toFixed(2)}&protein=${intakeInfo.protein.toFixed(2)}&carbs=${intakeInfo.carbs.toFixed(2)}&fat=${intakeInfo.fat.toFixed(2)}&water=0`;
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + currentUser.token
            }
        });

        if (response.ok) {
            Alert.alert('Success', 'Daily intake updated successfully!');
            setScanned(false);
            setScannedBarcode(null);
            setFoodInfo(null);
        
        } else {
            Alert.alert('Error', 'Failed to update daily intake. Please try again later.');
            setScanned(false);
            setScannedBarcode(null);
            setFoodInfo(null);
        }
    } catch (error) {
        Alert.alert('Error', 'Failed to update daily intake. Please check your network connection and try again.');
        setScanned(false);
            setScannedBarcode(null);
            setFoodInfo(null);
    }
};



  useEffect(() => {
    askForCameraPermission();
  }, []);

  
  const parseNutritionFacts = (factsString) => {
    const nutrition = {};
    const regex = /(\d+\.?\d*)\s*g/; // Regex to find values followed by 'g'

    factsString.split(', ').forEach(fact => {
      if (fact.includes("Calories") || fact.includes("Energy")) {
        const kcalValue = fact.match(/(\d+)\s*kcal/);
        if (kcalValue) {
          nutrition['calories'] = parseInt(kcalValue[1], 10);
        }
      } else if (fact.includes("Protein")) {
        const proteinValue = fact.match(regex);
        if (proteinValue) {
          nutrition['protein'] = parseFloat(proteinValue[1]);
        }
      } else if (fact.includes("Carbohydrates")) {
        const carbsValue = fact.match(regex);
        if (carbsValue) {
          nutrition['carbs'] = parseFloat(carbsValue[1]);
        }
      } else if (fact.includes("Fat") && !fact.includes("Saturated Fat")) {
        const fatValue = fact.match(regex);
        if (fatValue) {
          nutrition['fat'] = parseFloat(fatValue[1]);
        }
      }
    });

    return nutrition;
  };

  const fetchFoodInfo = async (barcode) => {
    setLoading(true);
    const options = {
      method: 'GET',
      url: 'https://barcodes1.p.rapidapi.com/',
      params: { query: barcode },
      headers: {
        'X-RapidAPI-Key': '76a997481amsh760010dadfad3f4p1059ebjsn0c157546bc30',
        'X-RapidAPI-Host': 'barcodes1.p.rapidapi.com'
      }
    };
    try {
      const queryString = Object.keys(options.params)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(options.params[key]))
        .join('&');
      const response = await fetch(options.url + '?' + queryString, { method: options.method, headers: options.headers });
      let result = await response.json();
  
      if (!result || !result.product) {
        console.log("Barcode not found in external API, trying local API");
        const headers = { 'Authorization': 'Bearer ' + currentUser.token };
        const localResponse = await fetch(`http://rottehjem.duckdns.org:5000/api/Barcode/GetBarcodeInfo/${barcode}`, { headers });
        result = await localResponse.json();
        console.log(response.status)
        
      
  

        if (result.status != 404){
        setFoodInfo(result);
        setBrandName(result.mealName);
        }
        else
        {
          setModalVisible(true);
        }
      }
  
      
      if (result && result.product) {
        const { brand, nutrition_facts } = result.product;
        const nutrition = parseNutritionFacts(nutrition_facts);
        setFoodInfo({
          brand,
          ...nutrition
        });
        setBrandName(brand);
      }
      if (!response.ok){
        setModalVisible(true);
      }
    } catch (error) {
      console.error("Error fetching food info:", error);
      // Handle the error, e.g., display an error message to the user
    } finally {
      setLoading(false);
    }
  }

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    fetchFoodInfo(data);
    setScannedBarcode(data);
  };

  const calculateIntake = () => {
    if (foodInfo && consumedGrams) {
      const gramsFactor = parseFloat(consumedGrams) / 100;
      setIntakeInfo({
        calories: foodInfo.calories * gramsFactor,
        protein: foodInfo.protein * gramsFactor,
        carbs: foodInfo.carbs * gramsFactor,
        fat: foodInfo.fat * gramsFactor,
      });
    }
  };


  const setscanendfalsemethod = () => {
    setScanned(false);
    setScannedBarcode(null);
    setFoodInfo(null);

  }
  const handleAddNewFood = async () => {
    try {
        const response = await fetch(`http://rottehjem.duckdns.org:5000/api/Barcode/AddMealWithBarcode?BarcodeId=${scannedBarcode}&mealName=${foodName}&calories=${calories}&protein=${protein}&carbs=${carbs}&fat=${fat}`, {
            method: 'POST',
            headers: { 'Authorization': 'Bearer ' + currentUser.token}
        });
  
        
        if (response.ok) {
            Alert.alert('Success', 'New barcode added successfully!');
            setFoodName('');
            setProtein('');
            setCarbs('');
            setFat('');
            setCalories(''); // Clear calorie input field after successful addition
        } else {
            Alert.alert('Error', 'Failed to add new food. Please try again later.');
        }
    } catch (error) {
        Alert.alert('Error', 'Failed to add new food. Please check your network connection and try again.');
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }



  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>
    );
  }
  
  return (
    <View style={styles.container}> 
      {!scanned && isFocused && hasPermission && (
        
          <Camera
            onBarCodeScanned={handleBarCodeScanned}
            style={styles.camera}
          />
 
      )}
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        foodInfo && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Meal Name: {branName}</Text>
            <Text style={styles.resultText}>Calories: {foodInfo.calories}</Text>
            <Text style={styles.resultText}>Protein: {foodInfo.protein}</Text>
            <Text style={styles.resultText}>Carbs: {foodInfo.carbs}</Text>
            <Text style={styles.resultText}>Fat: {foodInfo.fat}</Text>
            <AddTextField
              value={consumedGrams}
              onChangeText={setConsumedGrams}
              placeholder="Enter the amount consumed in grams"
              keyboardType="numeric"
              unit="g"
            />
            <Btn onClick={calculateIntake} text='Calculate' style={styles.EnterButton} />
            <Btn onClick={updateDailyIntake} text='Enter' style={styles.EnterButton} />
            {intakeInfo && (
              <View>
                <Text style={styles.resultText}>Calories consumed: {intakeInfo.calories.toFixed(2)}</Text>
                <Text style={styles.resultText}>Protein consumed: {intakeInfo.protein.toFixed(2)}</Text>
                <Text style={styles.resultText}>Carbs consumed: {intakeInfo.carbs.toFixed(2)}</Text>
                <Text style={styles.resultText}>Fat consumed: {intakeInfo.fat.toFixed(2)}</Text>
              </View>
            )}
          </View>
        )
      )}
      <Btn onClick={setscanendfalsemethod} text='Scan Again?' style={styles.buttons}/>
    {/* Modal */}
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        {/* Transparent grey background */}
        <View style={styles.modalBackground}>
          {/* Container for modal content */}
          <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Barcode not found, add it to the database</Text>
         
               {/* Display scanned barcode ID */}
            <Text style={styles.barcodeText}>Scanned Barcode: {scannedBarcode}</Text>

            {/* Input fields for food information */}
            <AddTextField
              value={foodName}
              onChangeText={setFoodName}
              placeholder="Enter brand name"
              keyboardType="default"
              unit=""
            />
            <AddTextField
              value={calories}
              onChangeText={setCalories}
              placeholder="Enter calorie amount"
              keyboardType="numeric"
              unit="cal"
            />
            <AddTextField
              value={protein}
              onChangeText={setProtein}
              placeholder="Enter protein amount"
              keyboardType="numeric"
              unit="g"
            />
            <AddTextField
              value={carbs}
              onChangeText={setCarbs}
              placeholder="Enter carbs amount"
              keyboardType="numeric"
              unit="g"
            />
            <AddTextField
              value={fat}
              onChangeText={setFat}
              placeholder="Enter fat amount"
              keyboardType="numeric"
              unit="g"
            />
            {/* Button container for action buttons */}
            <View style={styles.buttonContainer}>
                <Btn onClick={handleAddNewFood} text='Enter' style={styles.EnterButton} />
                <Btn onClick={() => setModalVisible(false)} text='close' style={styles.cancelButton}/>
            </View>
     
          </View>
        </View>
      </Modal>
    </View>
  );
}
