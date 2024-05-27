import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Modal,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import { currentUser } from "../../models/User";
import AddTextField from "../../components/AddTextField";
import Btn from "../../components/Btn";
import styles from "./ScanStyle";
import { useIsFocused } from "@react-navigation/native";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [foodInfo, setFoodInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [brandName, setBrandName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState("");
  const [consumedGrams, setConsumedGrams] = useState("");
  const [intakeInfo, setIntakeInfo] = useState(null);
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [isInFoodInfoScreen, setIsInFoodInfoScreen] = useState(true);
  const IsFocused = useIsFocused();

  const handleBackButtonPress = () => {
    setIsInFoodInfoScreen(true);
    setIntakeInfo(null);
  };
  const askForCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasPermission(status === "granted");
  };

  const updateDailyIntake = async () => {
    try {
      const url = `http://rottehjem.duckdns.org:5000/AppUser/updateDailyIntake?calories=${intakeInfo.calories.toFixed(
        2
      )}&protein=${intakeInfo.protein.toFixed(
        2
      )}&carbs=${intakeInfo.carbs.toFixed(2)}&fat=${intakeInfo.fat.toFixed(
        2
      )}&water=0`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + currentUser.token,
        },
      });

      if (response.ok) {
        Alert.alert("Success", "Daily intake updated successfully!");
        resetScanner();
      } else {
        Alert.alert(
          "Error",
          "Failed to update daily intake. Please try again later."
        );
        resetScanner();
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to update daily intake. Please check your network connection and try again."
      );
      resetScanner();
    }
  };

  const resetScanner = () => {
    setScanned(false);
    setScannedBarcode("");
    setFoodInfo(null);
    setIntakeInfo(null);
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const parseNutritionFacts = (factsString) => {
    const nutrition = {};
    const regex = /(\d+\.?\d*)\s*g/; // Regex to find values followed by 'g'

    factsString.split(", ").forEach((fact) => {
      if (fact.includes("Calories") || fact.includes("Energy")) {
        const kcalValue = fact.match(/(\d+)\s*kcal/);
        if (kcalValue) {
          nutrition["calories"] = parseInt(kcalValue[1], 10);
        }
      } else if (fact.includes("Protein")) {
        const proteinValue = fact.match(regex);
        if (proteinValue) {
          nutrition["protein"] = parseFloat(proteinValue[1]);
        }
      } else if (fact.includes("Carbohydrates")) {
        const carbsValue = fact.match(regex);
        if (carbsValue) {
          nutrition["carbs"] = parseFloat(carbsValue[1]);
        }
      } else if (fact.includes("Fat") && !fact.includes("Saturated Fat")) {
        const fatValue = fact.match(regex);
        if (fatValue) {
          nutrition["fat"] = parseFloat(fatValue[1]);
        }
      }
    });

    return nutrition;
  };

  const fetchFoodInfo = async (barcode) => {
    setLoading(true);
    const options = {
      method: "GET",
      url: "https://barcodes1.p.rapidapi.com/",
      params: { query: barcode },
      headers: {
        "X-RapidAPI-Key": "76a997481amsh760010dadfad3f4p1059ebjsn0c157546bc30",
        "X-RapidAPI-Host": "barcodes1.p.rapidapi.com",
      },
    };
    try {
      const queryString = Object.keys(options.params)
        .map(
          (key) =>
            encodeURIComponent(key) +
            "=" +
            encodeURIComponent(options.params[key])
        )
        .join("&");
      const response = await fetch(options.url + "?" + queryString, {
        method: options.method,
        headers: options.headers,
      });
      let result = await response.json();

      if (!result || !result.product) {
        console.log("Barcode not found in external API, trying local API");
        const headers = { Authorization: "Bearer " + currentUser.token };
        const localResponse = await fetch(
          `http://rottehjem.duckdns.org:5000/api/Barcode/GetBarcodeInfo/${barcode}`,
          { headers }
        );
        result = await localResponse.json();

        if (result.status !== 404) {
          setFoodInfo(result);
          setBrandName(result.mealName);
        } else {
          setModalVisible(true);
        }
      }

      if (result && IsFocused && result.product) {
        const { brand, nutrition_facts } = result.product;
        const nutrition = parseNutritionFacts(nutrition_facts);
        setFoodInfo({
          brand,
          ...nutrition,
        });
        setBrandName(brand);
      }
      if (!response.ok) {
        setModalVisible(true);
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
    try {
      const response = await fetch(
        `http://rottehjem.duckdns.org:5000/api/Barcode/AddMealWithBarcode?BarcodeId=${scannedBarcode}&mealName=${foodName}&calories=${calories}&protein=${protein}&carbs=${carbs}&fat=${fat}`,
        {
          method: "POST",
          headers: { Authorization: "Bearer " + currentUser.token },
        }
      );

      if (response.ok) {
        Alert.alert("Success", "New barcode added successfully!");
        setFoodName("");
        setCalories("");
        setProtein("");
        setCarbs("");
        setFat("");
      } else {
        Alert.alert("Error", "Failed to add new food. Please try again later.");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to add new food. Please check your network connection and try again."
      );
    }
  };

  const handleBackToFoodInfo = () => {
    setIntakeInfo(null);
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
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!scanned && hasPermission && (
        <Camera onBarCodeScanned={handleBarCodeScanned} style={styles.camera} />
      )}
      {loading ? (
        <View style={[styles.container2, styles.horizontal]}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <>
          {foodInfo && !intakeInfo && (
            <View style={styles.container2}>
              <Text style={styles.modalText}>
                Please enter the amount of the meal you consumed in grams!
              </Text>
              <Text style={styles.resultText}>Meal Name: {brandName}</Text>
              <Text style={styles.resultText}>
                Calories: {foodInfo.calories}
              </Text>
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
              <View style={styles.buttonContainer}>
                <Btn
                  onClick={calculateIntake}
                  text="Calculate"
                  style={styles.calculatebutton}
                />
              </View>
            </View>
          )}
          {intakeInfo && (
            <View style={styles.container2}>
              <Text style={styles.modalText2}>
                Press enter to add the amount to your daily intake!
              </Text>
              <Text style={styles.resultText}>
                Calories consumed: {intakeInfo.calories.toFixed(2)}
              </Text>
              <Text style={styles.resultText}>
                Protein consumed: {intakeInfo.protein.toFixed(2)}
              </Text>
              <Text style={styles.resultText}>
                Carbs consumed: {intakeInfo.carbs.toFixed(2)}
              </Text>
              <Text style={styles.resultText}>
                Fat consumed: {intakeInfo.fat.toFixed(2)}
              </Text>
              <View style={styles.buttonContainer}>
                <Btn
                  onClick={updateDailyIntake}
                  text="Enter"
                  style={styles.EnterButton}
                />
                <Btn
                  onClick={handleBackButtonPress}
                  text="back?"
                  style={styles.backbutton}
                />
              </View>
            </View>
          )}
          <Btn
            onClick={resetScanner}
            text="Scan Again?"
            style={styles.buttons}
          />
          {/* Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>
                  Barcode not found, add it to the database
                </Text>
                <Text style={styles.barcodeText}>
                  Scanned Barcode: {scannedBarcode}
                </Text>
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
                <View style={styles.buttonContainer}>
                  <Btn
                    onClick={handleAddNewFood}
                    text="Enter"
                    style={styles.enterButton}
                  />
                  <Btn
                    onClick={() => setModalVisible(false)}
                    text="Close"
                    style={styles.cancelButton}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
}
