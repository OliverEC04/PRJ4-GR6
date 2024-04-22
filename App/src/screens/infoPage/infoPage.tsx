import React, { useState } from "react";
import { View, Text, TextInput, Image, ScrollView } from "react-native";
import style from "./infoStyle";
import { Dropdown } from "react-native-element-dropdown";
import TextField from "../../components/TextField";
import Btn from "../../components/Btn";
import { textStyles } from "../../styles/textStyles";

export default function Home() {
  const [isEditing, setIsEditing] = useState(false); // edit stuff
  const [height, setHeight] = useState("170");
  const [currentWeight, setCurrentWeight] = useState("79");
  const [targetWeight, setTargetWeight] = useState("100");
  const [age, setAge] = useState("22");
  const [gender, setGender] = useState("Helicopter");

  const allGenders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Email", value: "email" },
  ];

  // just mock data
  const userName = "Albert Einstein";
  const userGoal = "Lose Weight";
  const profilePicture =
    "https://hips.hearstapps.com/hmg-prod/images/albert-einstein-sticks-out-his-tongue-when-asked-by-news-photo-1681316749.jpg";

  const handleEditPress = () => {
    setIsEditing(!isEditing);
  };

  const renderGenderDropdown = () => (
    <View style={style.entry}>
      <Dropdown
        style={[style.dropdown, isEditing && { borderColor: "gray" }]}
        placeholderStyle={style.placeholderStyle}
        selectedTextStyle={style.selectedTextStyle}
        data={allGenders}
        labelField="label"
        valueField="value"
        placeholder={!isEditing ? "Select Gender" : "Email??"}
        value={gender}
        onChange={(item) => setGender(item.value)}
        disable={!isEditing}
      />
    </View>
  );

  return (
    <ScrollView style={style.container}>
      <Image source={{ uri: profilePicture }} style={style.profilePic} />
      <Text style={textStyles.userName}>{userName}</Text>
      <Text style={textStyles.goalType}>Goal: {userGoal}</Text>

      <TextField
        label="Height"
        value={height}
        setValue={setHeight}
        units="cm"
        isEditing={isEditing}
      />
      <TextField
        label="Current Weight"
        value={currentWeight}
        setValue={setCurrentWeight}
        units="kg"
        isEditing={isEditing}
      />
      <TextField
        label="Target Weight"
        value={targetWeight}
        setValue={setTargetWeight}
        units="kg"
        isEditing={isEditing}
      />
      <TextField
        label="Age"
        value={age}
        setValue={setAge}
        units="years"
        isEditing={isEditing}
      />
      {renderGenderDropdown()}
      <View style={[{ alignItems: "center" }]}>
        <Btn
          text={isEditing ? "Save" : "Edit"}
          onClick={handleEditPress}
          style={style.button}
        />
      </View>
    </ScrollView>
  );
}
