import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image, ScrollView, Alert, ActivityIndicator } from "react-native";
import style from "../../styles/infoStyle";
import { Dropdown } from "react-native-element-dropdown";
import TextField from "../../components/TextField";
import Btn from "../../components/Btn";
import { textStyles } from "../../styles/textStyles";
import Server from "../../models/Server";
import { currentUser } from "../../models/User";
import Avatar from "../../components/Avatar";

export default function InfoPage() {
  const [isEditing, setIsEditing] = useState(false); // edit stuff
  const [height, setHeight] = useState(0);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("------");
  const [username, setUsername] = useState("");
  const [profilePicture, setProfilePicture] = useState<string | null>("");  const [id, getUserid] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const placeholder = 'https://toppng.com/public/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png';

  const allGenders = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
  ];

    useEffect(() => {
      const fetchUser = async () => {
        try {
          setIsLoading(true);
          const userData = await Server.getUserInfo();
          currentUser.update(userData);
          setHeight(userData.height || 0);
          setCurrentWeight(userData.currentWeight || 0);
          setAge(userData.age || 0);
          setGender((userData.gender && userData.gender.toLocaleLowerCase()) || "------");
          setUsername(currentUser.fullName);
          getUserid(userData.id);
            await Server.fetchImage(userData.id).then((image) => setProfilePicture(image || placeholder));
          setIsLoading(false);
      } catch (error) {
          console.error("fetch failed: ", error);
        }
      };
        fetchUser();
    }, []);

  const handleSavePress = async () => {
    setIsEditing(!isEditing);
    if (isEditing) {
      await Server.putInfoPage(height, gender, currentWeight, age);
    }
  };

  const findGoal = () => {
    if (currentWeight > currentUser.targetWeight) {
      return "Losing Weight";
    } else if (currentWeight < currentUser.targetWeight) {
      return "Gaining Weight";
    } else {
      return "Maintaining Weight";
    }
  };

  const renderGenderDropdown = () => (
    <View>
      <Dropdown
        style={[style.dropdown]}
        placeholderStyle={style.placeholderText}
        selectedTextStyle={[style.placeholderText, { color: isEditing ? "black" : "grey" }, {fontWeight: isEditing ? "bold" : "normal"}]}
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
    {isLoading ? (
      <ActivityIndicator size="large" color="#0000ff" className="load"/> 
    ) : (
      <>
        {profilePicture && (
          <Avatar
            imageUrl={profilePicture}
            altText={"Profile Picture"}
            isEditing={isEditing}
          />
        )}
        <Text style={textStyles.userName}>{currentUser.fullName}</Text>
        <Text style={textStyles.goalType}>Goal: {findGoal()}</Text>

        <TextField
          label="Height"
          value={(height || '').toString()}
          setValue={setHeight}
          units="cm"
          isEditing={isEditing}
        />
        <TextField
          label="Current Weight"
          value={(currentWeight || '').toString()}
          setValue={setCurrentWeight}
          units="kg"
          isEditing={isEditing}
        />
        <TextField
          label="Age"
          value={(age || '').toString()}
          setValue={setAge}
          units="years"
          isEditing={isEditing}
        />
        {renderGenderDropdown()}
        <View style={[{ alignItems: "center" }]}>
          <Btn
            text={isEditing ? "Save" : "Edit Profile"}
            onClick={handleSavePress}
            style={style.button}
          />
        </View>
      </>
    )}
  </ScrollView>
);
}
