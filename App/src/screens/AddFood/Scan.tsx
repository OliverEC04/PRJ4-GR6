import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Camera } from 'expo-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [foodInfo, setFoodInfo] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state

  const askForCameraPermission = async () => {
    const { status } = await Camera.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // Fetch food information from API
  const fetchFoodInfo = async (barcode) => {
    setLoading(true); // Set loading state to true
    const options = {
      method: 'GET',
      url: 'https://barcodes1.p.rapidapi.com/',
      params: {
        query: barcode
      },
      headers: {
        'X-RapidAPI-Key': '76a997481amsh760010dadfad3f4p1059ebjsn0c157546bc30',
        'X-RapidAPI-Host': 'barcodes1.p.rapidapi.com'
      }
    };
  
    try {
      const queryString = Object.keys(options.params)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(options.params[key]))
        .join('&');
      const response = await fetch(options.url + '?' + queryString, {
        method: options.method,
        headers: options.headers
      });
      let result = await response.json();
  
      // If the result is empty, fetch from localhost
      if (!result || !result.product) {
        const localResponse = await fetch(`https://brief-oriole-causal.ngrok-free.app/rest_api/api/Barcode/GetBarcodeInfo/${barcode}`);
        result = await localResponse.json();
      }
  
      setFoodInfo(result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); // Set loading state to false when API call is complete
    }
  };
  

  // What happens when we scan the barcode
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    console.log('Type: ' + type + '\nData: ' + data);
    fetchFoodInfo(data);
  };
// Check permissions and return the screens
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
    <View style={styles.cameraContainer}>
      <Camera
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.camera}
      />
    </View>
    {loading ? ( // Conditionally render "Loading" text based on loading state
      <Text>Loading...</Text>
    ) : (
      <View style={styles.resultContainer}>
        {foodInfo && foodInfo.product && (
          <View>
            {foodInfo.product.brand && (
              <Text style={styles.resultText}>Brand: {foodInfo.product.brand}</Text>
            )}
            {foodInfo.product.nutrition_facts && (
              <Text style={styles.resultText}>Nutritional Facts:</Text>
            )}
            {foodInfo.product.nutrition_facts && foodInfo.product.nutrition_facts.split(',').map((fact, index) => (
              <Text key={index} style={styles.resultText}>{fact.trim()}</Text>
            ))}
          </View>
        )}
        {foodInfo && !foodInfo.product && (
          <View>
            <Text style={styles.resultText}>Meal Name: {foodInfo.mealName}</Text>
            <Text style={styles.resultText}>Calories: {foodInfo.calories}</Text>
            <Text style={styles.resultText}>Protein: {foodInfo.protein}</Text>
            <Text style={styles.resultText}>Carbs: {foodInfo.carbs}</Text>
            <Text style={styles.resultText}>Fat: {foodInfo.fat}</Text>
          </View>
        )}
      </View>
    )}
    {scanned && (
      <Button title={'Scan again?'} onPress={() => setScanned(false)} color="tomato" />
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
  cameraContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato',
    marginBottom: 20,
  },
  camera: {
    height: '100%',
    width: '100%',
  },
  resultContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    maxHeight: 400,
  },
  resultText: {
    fontSize: 14,
    fontFamily: 'monospace',
  },
});
