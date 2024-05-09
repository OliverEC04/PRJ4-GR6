import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image, ScrollView } from "react-native";
import style from "../../styles/infoStyle";
import { Dropdown } from "react-native-element-dropdown";
import TextField from "../../components/TextField";
import Btn from "../../components/Btn";
import { textStyles } from "../../styles/textStyles";
import Server from "../../models/Server";
import { currentUser } from "../../models/User";

export default function InfoPage() {
  useEffect(() => {
    Server.getUser().then(() => {
      setHeight(currentUser.height);
      setCurrentWeight(currentUser.weight);
      setAge(currentUser.age);
      setGender(currentUser.gender);
    });
  });

  const [isEditing, setIsEditing] = useState(false); // edit stuff
  const [height, setHeight] = useState(170);
  const [currentWeight, setCurrentWeight] = useState(79);
  const [age, setAge] = useState(22);
  const [gender, setGender] = useState("null");

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
    <View>
      <Dropdown
        style={[style.dropdown]}
        placeholderStyle={style.placeholderText}
        selectedTextStyle={style.placeholderText}
        data={allGenders}
        labelField="label"
        valueField="value"
        placeholder={!isEditing ? "Select Gender" : "--------"}
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
        label="Age"
        value={age}
        setValue={setAge}
        units="years"
        isEditing={isEditing}
      />
      {renderGenderDropdown()}
      <View style={[{ alignItems: "center" }]}>
        <Btn
          text={isEditing ? "Save" : "Edit Profile"}
          onClick={handleEditPress}
          style={style.button}
        />
      </View>
    </ScrollView>
  );
}
