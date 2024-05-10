import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Modal, ScrollView, Alert } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import AddTextField from "../../components/AddTextField";
import Btn from "../../components/Btn";
import styles from "./ScanStyle";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [foodInfo, setFoodInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState('');
  const [consumedGrams, setConsumedGrams] = useState('');
  const [intakeInfo, setIntakeInfo] = useState(null);
  const [foodName, setFoodName] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const isFocused = useIsFocused();

  const askForCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
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
        const headers = { 'Authorization': 'Bearer ' + currentUser.token };
        const localResponse = await fetch(`https://brief-oriole-causal.ngrok-free.app/rest_api/api/Barcode/GetBarcodeInfo/${barcode}`, { headers });
        result = await localResponse.json();

        if (!result || !result.product) {
          setModalVisible(true);
          return;
        }
      }

      if (result && result.product) {
        const { brand, nutrition_facts } = result.product;
        const nutrition = parseNutritionFacts(nutrition_facts);
        setFoodInfo({
          brand,
          ...nutrition
        });
      }
    } catch (error) {
      console.error("Error fetching food info:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const handleAddNewFood = async () => {
    const headers = { 'Authorization': 'Bearer ' + currentUser.token};
    try {
        const response = await fetch(`https://brief-oriole-causal.ngrok-free.app/rest_api/api/Barcode/AddMealWithBarcode?BarcodeId=${scannedBarcode}&mealName=${foodName}&calories=${calories}&protein=${protein}&carbs=${carbs}&fat=${fat}`, {
            method: 'POST',
            headers: headers
        });
        if (response.ok) {
            Alert.alert('Success', 'New barcode added successfully!');
            setFoodName('');
            setProtein('');
            setCarbs('');
            setFat('');
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
        <View style={styles.cameraContainer}>
          <Camera
            onBarCodeScanned={handleBarCodeScanned}
            style={styles.camera}
          />
        </View>
      )}
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        foodInfo && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>Brand: {foodInfo.brand}</Text>
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
      <Button title={'Scan again?'} onPress={() => setScanned(false)} color="tomato" />
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
            <ScrollView style={{ paddingTop: 60, paddingHorizontal: 20 }}>
               {/* Display scanned barcode ID */}
              <Text style={styles.barcodeText}>Scanned Barcode: {scannedBarcode}</Text>

              {/* Input fields for food information */}
              <AddTextField
                value={foodName}
                onChangeText={setFoodName}
                placeholder="Enter food name"
                keyboardType="default"
                unit=""
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
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}
