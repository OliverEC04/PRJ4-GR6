import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import StatBar from "../components/StatBar";
import HomeStyle from "../styles/HomeStyle";
import RoundBtn from "../components/RoundBtn";
import server from "../models/Server";
import AddTextField from "../components/AddTextField";
import { currentUser, User } from "../models/User";
import PopupField from "../components/PopupField";
import { useFocusEffect } from "@react-navigation/native";

type welcomeProps = {
  setShowWelcome: any;
};

export default function Welcome({ setShowWelcome }: welcomeProps) {
  const [showModal, setShowModal] = useState(false);
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [open4, setOpen4] = useState(false);
  const [targetWeight, setTargetWeight] = useState("");
  const [hydration, setHydration] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [activity, setActivity] = useState("0");

  const Activity = [
    { label: "Sedentary (little to no exercise)", value: "120" },
    {
      label: "Lightly active (light exercise or sports 1-3 days a week)",
      value: "138",
    },
    {
      label: "Moderately active (moderate exercise or sports 3-5 days a week)",
      value: "155",
    },
    {
      label: "Very active (hard exercise or sports 6-7 days a week)",
      value: "173",
    },
    {
      label:
        "Super active (very hard exercise and a physical job or training twice a day)",
      value: "190",
    },
  ];

  const Hydration = [
    { label: "1 Litre", value: "1" },
    { label: "2 Litre", value: "2" },
    { label: "3 Litre", value: "3" },
  ];

  const Difficulty = [
    { label: "Easy", value: "250" },
    { label: "Normal", value: "500" },
    { label: "Hard", value: "750" },
  ];

  const allGenders = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

  const renderDropdown = (
    openState,
    valueState,
    setOpenState,
    setValueState,
    items,
    placeholder
  ) => (
    <Dropdown
      style={HomeStyle.dropdown}
      data={items}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      value={valueState}
      onChange={(item) => {
        setValueState(item.value);
      }}
      renderLeftIcon={() => <Text style={{ marginRight: 10 }}>▹</Text>}
      open={openState}
      onOpen={() => setOpenState(true)}
      onClose={() => setOpenState(false)}
    />
  );

  useEffect(() => {
    if (currentUser.firsTimeOrNot === 0) {
      setShowModal(true);
    }
  }, []);

  const handleWelcomeButtonPress = async () => {
    if (
      !gender ||
      !height ||
      !weight ||
      !age ||
      !targetWeight ||
      !activity ||
      !difficulty ||
      !hydration
    ) {
      Alert.alert("Error", "Please fill out all fields in the form.");
      return; // Exit the function early
    }

    await server.PutForm(
      gender,
      height,
      weight,
      age,
      targetWeight,
      activity,
      difficulty,
      hydration
    );

    setShowModal(false);
    setShowWelcome(false);
  };

  return (
    <Modal visible={showModal} transparent={true}>
      <View style={HomeStyle.modalView}>
        <Text style={HomeStyle.modalText}>
          Welcome to the Gym rats Fitness App! Fill out this form to get started
        </Text>
        {renderDropdown(
          open,
          gender,
          setOpen,
          setGender,
          allGenders,
          "Select your gender"
        )}
        {renderDropdown(
          open2,
          difficulty,
          setOpen2,
          setDifficulty,
          Difficulty,
          "Choose Goal Difficulty"
        )}
        {renderDropdown(
          open3,
          activity,
          setOpen3,
          setActivity,
          Activity,
          "Choose Activity level"
        )}
        {renderDropdown(
          open4,
          hydration,
          setOpen4,
          setHydration,
          Hydration,
          "Choose Hydration"
        )}

        <AddTextField
          value={height}
          onChangeText={setHeight}
          placeholder="Enter your height in cm"
          keyboardType="numeric"
          unit=""
        />
        <AddTextField
          value={weight}
          onChangeText={setWeight}
          placeholder="Enter your weight in kg"
          keyboardType="numeric"
          unit=""
        />
        <AddTextField
          value={age}
          onChangeText={setAge}
          placeholder="Enter your age"
          keyboardType="numeric"
          unit=""
        />
        <AddTextField
          value={targetWeight}
          onChangeText={setTargetWeight}
          placeholder="Enter your target weight"
          keyboardType="numeric"
          unit=""
        />
        <TouchableOpacity
          style={HomeStyle.modalBtn}
          onPress={handleWelcomeButtonPress}
        >
          <Text style={HomeStyle.modalBtnText}>Get started!</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
