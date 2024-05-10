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
  const [isEditing, setIsEditing] = useState(false); // edit stuff
  const [height, setHeight] = useState(170);
  const [currentWeight, setCurrentWeight] = useState(79);
  const [age, setAge] = useState(22);
  const [gender, setGender] = useState("null");

  const allGenders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];

  // just mock data
  const profilePicture =
    "https://hips.hearstapps.com/hmg-prod/images/albert-einstein-sticks-out-his-tongue-when-asked-by-news-photo-1681316749.jpg";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await Server.getUserInfo();
        currentUser.update(userData);
        setHeight(userData.height);
        setCurrentWeight(userData.currentWeight);
        setAge(userData.age);
        setGender(userData.gender);
      } catch (error) {
        console.error("fetch failed: ", error);
      }
    };

    fetchUser();
  }, []);

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
      <Text style={textStyles.userName}>{currentUser.fullName}</Text>
      <Text style={textStyles.goalType}>Goal: {currentUser.targetWeight}</Text>

      <TextField
        label="Height"
        value={height.toString()}
        setValue={(value) => setHeight(Number(value))}
        units="cm"
        isEditing={isEditing}
      />
      <TextField
        label="Current Weight"
        value={currentWeight.toString()}
        setValue={(value) => setCurrentWeight(Number(value))}
        units="kg"
        isEditing={isEditing}
      />
      <TextField
        label="Age"
        value={age.toString()}
        setValue={(value) => setAge(Number(value))}
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
