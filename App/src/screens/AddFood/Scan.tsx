import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showScanner, setShowScanner] = useState(true);
  const [foodInfo, setFoodInfo] = useState(null);
  const [inputGrams, setInputGrams] = useState('');
  const [nutritionInfo, setNutritionInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // Fetch food information from API
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
      const response = await fetch(options.url + '?' + queryString, options);
      const result = await response.json();
      setFoodInfo(result.product); 
      setShowScanner(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    fetchFoodInfo(data);
  };

  const handleConfirmPress = () => {
    const grams = parseFloat(inputGrams);
    if (!isNaN(grams) && foodInfo) {
      const factor = grams / 100;
      setNutritionInfo({
        calories: (foodInfo.calories * factor).toFixed(2),
        fat: (foodInfo.fat * factor).toFixed(2),
        protein: (foodInfo.protein * factor).toFixed(2),
        carbs: (foodInfo.carbs * factor).toFixed(2),
      });
      setInputGrams('');
    }
  };

  if (hasPermission === null) {
    return <View style={styles.container}><Text>Anmoder om kameratilladelse...</Text></View>;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>Ingen adgang til kamera</Text>
        <Button title="Tillad kamera" onPress={() => Camera.requestCameraPermissionsAsync()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {showScanner && (
        <Camera
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.camera}
        />
      )}

      {loading && <Text>Indlæser...</Text>}

      {!loading && !showScanner && foodInfo && (
        <View style={styles.infoContainer}>
          <Text style={styles.header}>Product Info:</Text>
          <Text style={styles.infoText}>Brand: {foodInfo.brand}</Text>
          <Text style={styles.infoText}>Calories: {foodInfo.calories}</Text>
          <Text style={styles.infoText}>Fat: {foodInfo.fat}</Text>
          <Text style={styles.infoText}>Protein: {foodInfo.protein}</Text>
          <Text style={styles.infoText}>Carbs: {foodInfo.carbs}</Text>
          
          <TextInput
            style={styles.input}
            value={inputGrams}
            onChangeText={setInputGrams}
            placeholder="Enter intake (grams)"
            keyboardType="numeric"
          />

          <Button title="Confirm " onPress={handleConfirmPress} />

          {nutritionInfo && (
            <View>
              <Text style={styles.header}>Your Intake:</Text>
              <Text style={styles.infoText}>Calories: {nutritionInfo.calories}</Text>
              <Text style={styles.infoText}>Fat: {nutritionInfo.fat}</Text>
              <Text style={styles.infoText}>Protein: {nutritionInfo.protein}</Text>
              <Text style={styles.infoText}>Carbs: {nutritionInfo.carbs}</Text>
            </View>
          )}

          <Button title="Scan again?" onPress={() => setShowScanner(true)} color="tomato" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    height: '50%',
    width: '100%',
    overflow: 'hidden',
  },
  infoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    margin: 20,
  },
  infoText: {
    fontSize: 18,
    margin: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%',
    fontSize: 18,
  },
});
