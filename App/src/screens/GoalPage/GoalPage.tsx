import React, { useState } from "react";
import { View, Text, TextInput, Image, ScrollView } from "react-native";
import style from "./GoalStyle";
import { Dropdown } from "react-native-element-dropdown";
import TargetWeight from "../../components/TargetWeight";
import Btn from "../../components/Btn";
import AntDesign from "@expo/vector-icons/AntDesign";
import StatBar from "../../components/StatBar";

export default function Home() {
  const [isEditing, setIsEditing] = useState(false); // edit stuff
  const [targetWeight, setTargetWeight] = useState("100");
  const [hydration, setHydration] = useState("2 Litre");
  const [difficulty, setDiffuclty] = useState("Helicopter");

  // just mock data
  const userGoal = "Gain Weight";

  const handleEditPress = () => {
    setIsEditing(!isEditing);
  };

  const Difficulty = [
    { label: "Easy", value: "Easy" },
    { label: "Normal", value: "Normal" },
    { label: "Hard", value: "Hard" },
  ];

  const renderDifficultyDropdown = () => (
    <View style={style.entry}>
      <Dropdown
        style={[style.dropdown, isEditing && { borderColor: "gray" }]}
        placeholderStyle={style.placeholderStyle}
        selectedTextStyle={style.selectedTextStyle}
        data={Difficulty}
        labelField="label"
        valueField="value"
        placeholder={
          !isEditing ? "Choose Goal Difficulty" : "Choose Goal Difficulty"
        }
        value={difficulty}
        onChange={(item) => setDiffuclty(item.value)}
      />
    </View>
  );

  const Activity = [
    { label: "0 Hours", value: "1" },
    { label: "1-2 Hours", value: "1.2" },
    { label: "3-4 Hours", value: "1.4" },
    { label: "5-6 Hours", value: "1.6" },
    { label: "7+ Hours", value: "1.8" },
  ];
  const renderActivityDropdown = () => (
    <View style={style.entry}>
      <Dropdown
        style={[style.dropdown, isEditing && { borderColor: "gray" }]}
        placeholderStyle={style.placeholderStyle}
        selectedTextStyle={style.selectedTextStyle}
        data={Activity}
        labelField="label"
        valueField="value"
        placeholder={!isEditing ? "Weekly activity" : "3-4 Hours"}
        value={difficulty}
        onChange={(item) => setDiffuclty(item.value)}
      />
    </View>
  );
  const Hydration = [
    { label: "1 Litre", value: "1 Litre" },
    { label: "2 Litre", value: "2 Litre" },
    { label: "3 Litre", value: "3 Litre" },
  ];

  const renderHydrationDropdown = () => (
    <View style={style.entry}>
      <Dropdown
        style={[style.dropdown, isEditing && { borderColor: "gray" }]}
        placeholderStyle={style.placeholderStyle}
        selectedTextStyle={style.selectedTextStyle}
        data={Hydration}
        labelField="label"
        valueField="value"
        placeholder={!isEditing ? "Choose Hydration goal" : "2 Litre"}
        value={hydration}
        onChange={(item) => setHydration(item.value)}
      />
    </View>
  );

  return (
    <ScrollView style={style.container}>
      <Text style={style.targetWeight}>Goals</Text>
      <Text style={style.goalType}>Goal: {userGoal}</Text>
      <TargetWeight
        label="Target Weight"
        value={targetWeight}
        setValue={setTargetWeight}
        units="kg"
      />
      {renderDifficultyDropdown()}
      {renderActivityDropdown()}
      {renderHydrationDropdown()}
    </ScrollView>
  );
}
