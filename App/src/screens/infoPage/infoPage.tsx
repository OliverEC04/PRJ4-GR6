import React, { useState } from "react";
import { View, Text, TextInput, Image, Button, ScrollView } from "react-native";
import style from "./infoStyle";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from '@expo/vector-icons/AntDesign'


export default function Home() {
  const [isEditing, setIsEditing] = useState(false); // edit stuff
  const [height, setHeight] = useState("170");
  const [currentWeight, setCurrentWeight] = useState("79");
  const [targetWeight, setTargetWeight] = useState("100");
  const [burnedCalories, setBurnedCalories] = useState("1000");
  const [gender, setGender] = useState("Helicopter");

  const allGenders = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
    { label: 'Email', value: 'email' },
  ];

  // just mock data
  const userName = "Albert Einstein";
  const userGoal = "Gain Weight";
  const profilePicture =
    "https://hips.hearstapps.com/hmg-prod/images/albert-einstein-sticks-out-his-tongue-when-asked-by-news-photo-1681316749.jpg";

  const handleEditPress = () => {
    setIsEditing(!isEditing);
  };

  // editing here:
  const renderEditableField = (
    label: any,
    value: any,
    setValue: any,
    units: any
  ) => (
    <View style={style.entry}>
      <Text style={style.label}>{label}:</Text>
      {/* make it so units are next to text, good very good great success yes */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          style={style.input}
          onChangeText={setValue}
          value={value}
          editable={isEditing}
          keyboardType="numeric"
          underlineColorAndroid="transparent" // remove the ugly lines under eww
        />
        <Text style={style.units}>{units}</Text>
      </View>
    </View>
  );

  const renderGenderDropdown = () => (
    <View style={style.entry}>
      <Dropdown
        style={[style.dropdown, isEditing && { borderColor: 'blue' }]}
        placeholderStyle={style.placeholderStyle}
        selectedTextStyle={style.selectedTextStyle}
        iconStyle={style.iconStyle}
        data={allGenders}
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={!isEditing ? 'Select Gender' : 'Email??'}
        value={gender}
        onChange={item => setGender(item.value)}
        disable={!isEditing}
      />
    </View>
  );

  return (
    <ScrollView style={[style.container, { paddingBottom: 60 }]}>
      <Image source={{ uri: profilePicture }} style={style.profilePic} />
      <Text style={style.userName}>{userName}</Text>
      <Text style={style.goalType}>Goal: {userGoal}</Text>

      {renderEditableField("Height", height, setHeight, "cm")}
      {renderEditableField(
        "Current Weight",
        currentWeight,
        setCurrentWeight,
        "kg"
      )}
      {renderEditableField(
        "Target Weight",
        targetWeight,
        setTargetWeight,
        "kg"
      )}
      {renderEditableField(
        "Burned Today",
        burnedCalories,
        setBurnedCalories,
        "kcal"
      )}
      {renderGenderDropdown()}

      <Button
        title={isEditing ? "Save" : "Edit"}
        color="#1C2833"
        onPress={handleEditPress}
      />
    </ScrollView>
  );
}
