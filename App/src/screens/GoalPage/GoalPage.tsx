import React, { useState, useEffect } from "react";
import { View, Text, Image, ScrollView, Alert, TextInput } from "react-native";
import style from "../../styles/GoalStyle";
import { Dropdown } from "react-native-element-dropdown";
import NumericInput from "../../components/NumericInput";
import { currentUser } from "../../models/User";
import Btn from "../../components/Btn";
import Server from "../../models/Server";

// function displayGoal() {
//   if (currentUser.currentWeight < currentUser.targetWeight) {
//     return (
//       <>
//         <Image
//           source={require("../../../assets/Bulking.png")}
//           style={style.logo}
//         />

//         <Text style={style.goalType}>Goal: Gaining Weight</Text>
//       </>
//     );
//   } else if (currentUser.currentWeight === currentUser.targetWeight) {
//     return (
//       <>
//         <Image
//           source={require("../../../assets/logo.png")}
//           style={style.logo}
//         />
//         <Text style={style.goalType}>Goal: Maintaining Weight</Text>
//       </>
//     );
//   } else {
//     return (
//       <>
//         <Image
//           source={require("../../../assets/Cutting.png")}
//           style={style.logo}
//         />
//         <Text style={style.goalType}>Goal: Loosing Weight</Text>
//       </>
//     );
//   }
// }

export default function GoalPage() {
  const [targetWeight, setTargetWeight] = useState("0");
  const [hydration, setHydration] = useState("0");
  const [difficulty, setDiffuclty] = useState("500");
  const [activity, setActivity] = useState("1.2");
  const [displayGoalKey, setDisplayGoalKey] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await Server.getUserInfo();
        console.log("userData:", userData); // Log userData to inspect its structure
        currentUser.update(userData);
        console.log("currentUser:", userData.currentStreak); // Log currentUser to inspect its structure
        const StringTargetWeight = userData.targetWeight.toString();

        // // Check if userData.dailyWater exists before calling toString()
        // const StringHydration = userData.dailyWater
        //   ? userData.dailyWater.toString()
        //   : "0";
        // const selectedHydration = Hydration.find(
        //   (item) => item.value === StringHydration
        // );

        // if (selectedHydration) {
        //   setHydration(selectedHydration.label && selectedHydration.value);
        // }

        const StringDifficulty = userData.difficultyLevel.toString();
        const selectedDifficulty = Difficulty.find(
          (item) => item.value === StringDifficulty
        );
        // const StringActivity = userData.activityLevel.toString();
        setTargetWeight(StringTargetWeight);
        // setHydration(StringHydration); // No need for the additional check here
        setDiffuclty(
          (selectedDifficulty.label && selectedDifficulty.value) || "500"
        );

        // setActivity(StringActivity);
      } catch (error) {
        console.error("fetch failed: ", error); // Log the error
      }
    };

    fetchUser();
  }, [displayGoalKey]);

  const handleSavePress = async () => {
    const newdifficulty = parseInt(difficulty);
    const newactivity = parseInt(activity);
    const newhydration = parseInt(hydration);
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
        setDisplayGoalKey(displayGoalKey + 1);
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

  const displayGoal = () => {
    if (currentUser.currentWeight < currentUser.targetWeight) {
      return (
        <>
          <Image
            source={require("../../../assets/Bulking.png")}
            style={style.logo}
          />
          <Text style={style.goalType}>Goal: Gaining Weight</Text>
        </>
      );
    } else if (currentUser.currentWeight === currentUser.targetWeight) {
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
          <Text style={style.goalType}>Goal: Losing Weight</Text>
        </>
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
      {displayGoal()}
      { <TextInput
        style={style.inputContainer}
        value={"Current streak: " + currentUser.currentStreak.toString()}
        editable={false}
      /> }

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
