import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Modal, ScrollView, Alert } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useIsFocused } from '@react-navigation/native';
import AddTextField from "../../components/AddTextField";
import Btn from "../../components/Btn";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [foodInfo, setFoodInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [foodName, setFoodName] = useState('');
  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');
  const [scannedBarcode, setScannedBarcode] = useState('');
  const isFocused = useIsFocused();

  const askForCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === 'granted');
  };


  
  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  function Profile() {
    const isFocused = useIsFocused();
  
    return <Text>{isFocused ? 'focused' : 'unfocused'}</Text>;
  }

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const fetchFoodInfo = async (barcode) => {
    setLoading(true);
    
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
  
      if (!result || !result.product) {
        const headers = { 'Authorization': 'Bearer ' + currentUser.token};
        const localResponse = await fetch(`https://brief-oriole-causal.ngrok-free.app/rest_api/api/Barcode/GetBarcodeInfo/${barcode}`, { headers });
        result = await localResponse.json();
  
        if (!foodName.trim() || !carbs.trim() || !protein.trim() || !fat.trim()) {
          setModalVisible(true);
          return;
        }
      }
      setFoodInfo(result);
      setScannedBarcode(barcode); 
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    fetchFoodInfo(data);
    setScannedBarcode(data);
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
    {isFocused && hasPermission && (
      <View style={styles.cameraContainer}>
        <Camera
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.camera}
        />
      </View>
    )}
      {loading ? (
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
},
  EnterButton: {
    backgroundColor: '#333', 
    width: "45%",
    borderRadius: 20,
}, 

barcodeText: {
  fontSize: 18,
  fontWeight: 'bold',
  marginBottom: 10,
},
cancelButton: {
    backgroundColor: '#fa8072', 
    width: "45%",
    borderRadius: 20,
},
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: '90%', 
    height: '55%', 
    marginBottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "black",

  },
  modalTitle: {
    fontSize: 17,
    fontWeight: 'normal',
    includeFontPadding: false,
    textDecorationLine: 'underline',
    marginBottom: -50,
    textAlign: 'center',
  }
});