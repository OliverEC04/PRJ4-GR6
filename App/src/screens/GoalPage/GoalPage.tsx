import React, { useState } from "react";
import { View, Text, TextInput, Image, ScrollView, Alert } from "react-native";
import style from "../../styles/GoalStyle";
import { Dropdown } from "react-native-element-dropdown";
import NumericInput from "../../components/NumericInput";
import { currentUser, User } from "../../models/User";
import Btn from "../../components/Btn";
import TextField from "../../components/TextField";

function displayGoal(user: User) {
  if (user.currentWeight < user.targetWeight) {
    return (
      <>
        <Image
          source={require("../../../assets/logo.png")}
          style={style.logo}
        />

        <Text style={style.goalType}>Goal: Gaining Weight</Text>
      </>
    );
  } else if (user.currentWeight === user.targetWeight) {
    return (
      <>
        <Image
          source={require("../../../assets/logo.png")}
          style={style.logo}
        />
        <Text style={style.goalType}>Goal: Maintaining Weight</Text>
      </>
    );
  } else {
    return (
      <>
        <Image
          source={require("../../../assets/Cutting.png")}
          style={style.logo}
        />
        <Text style={style.goalType}>Goal: Loosing Weight</Text>
      </>
    );
  }
}

export default function GoalPage() {
  const [targetWeight, setTargetWeight] = useState("");
  const [hydration, setHydration] = useState("2");
  const [difficulty, setDiffuclty] = useState("500");
  const [activity, setActivity] = useState("1.2");

  const handleSavePress = async () => {
    const newdifficulty = parseFloat(difficulty);
    const newactivity = parseFloat(activity);
    const newhydration = parseFloat(hydration);
    const newtargetWeight = parseFloat(targetWeight);
    try {
      const response = await fetch(
        `http://rottehjem.duckdns.org:5000/AppUser/me/GoalPage?TargetWeight=${newtargetWeight.toFixed(
          2
        )}&activityLevel=${newactivity.toFixed(
          3
        )}&difficultyLevel=${newdifficulty.toFixed(
          1
        )}&DailyWater=${newhydration.toFixed(1)}`,
        {
          method: "PUT",
          headers: { Authorization: "Bearer " + currentUser.token },
        }
      );
      console.log(response);
      if (response.ok) {
        Alert.alert("Success", "Your Goals have been updated.");
      } else {
        Alert.alert("Error", "Failed to update your goals. Please try again.");
      }
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to update your goals. Please check your network connection and try again."
      );
    }
  };

  const Difficulty = [
    { label: "Easy", value: "250" },
    { label: "Normal", value: "500" },
    { label: "Hard", value: "750" },
  ];

  const renderDifficultyDropdown = () => (
    <View style={style.entry}>
      <Dropdown
        style={[style.dropdown, { borderColor: "gray" }]}
        placeholderStyle={style.placeholderText}
        selectedTextStyle={style.placeholderText}
        data={Difficulty}
        labelField="label"
        valueField="value"
        placeholder={"Choose Goal Difficulty"}
        value={difficulty}
        onChange={(item) => setDiffuclty(item.value)}
      />
    </View>
  );

  const Activity = [
    { label: "Sedentary (little to no exercise)", value: "1.2" },
    {
      label: "Lightly active (light exercise or sports 1-3 days a week)",
      value: "1.375",
    },
    {
      label: "Moderately active (moderate exercise or sports 3-5 days a week)",
      value: "1.55",
    },
    {
      label: "Very active (hard exercise or sports 6-7 days a week)",
      value: "1.725",
    },
    {
      label:
        "Super active (very hard exercise and a physical job or training twice a day)",
      value: "1.9",
    },
  ];
  const renderActivityDropdown = () => (
    <View style={style.entry}>
      <Dropdown
        style={[style.dropdown, { borderColor: "gray" }]}
        placeholderStyle={style.placeholderText}
        selectedTextStyle={style.placeholderText}
        data={Activity}
        labelField="label"
        valueField="value"
        placeholder={"Weekly activity"}
        value={activity}
        onChange={(item) => setActivity(item.value)}
      />
    </View>
  );
  const Hydration = [
    { label: "1 Litre", value: "1" },
    { label: "2 Litre", value: "2" },
    { label: "3 Litre", value: "3" },
  ];

  const renderHydrationDropdown = () => (
    <View style={style.entry}>
      <Dropdown
        style={style.dropdown}
        placeholderStyle={style.placeholderText}
        selectedTextStyle={style.placeholderText}
        data={Hydration}
        labelField="label"
        valueField="value"
        placeholder={"Choose Hydration goal"}
        value={hydration}
        onChange={(item) => setHydration(item.value)}
      />
    </View>
  );

  return (
    <ScrollView style={style.container}>
      {displayGoal(currentUser)}
      <TextInput
        style={style.inputContainer}
        value={"Current streak: " + currentUser.currentStreak.toString()}
        editable={false}
      />
      
      <NumericInput
        label="Target Weight"
        value={targetWeight}
        setValue={setTargetWeight}
        units="kg"
      />
      
      {renderDifficultyDropdown()}
      {renderActivityDropdown()}
      {renderHydrationDropdown()}
      <Btn text={"Save"} onClick={handleSavePress} style={style.button} />
    </ScrollView>
  );
}
