import React, { useState } from "react";
import { View, Text, TextInput, Image, Button } from "react-native";
import style from "./infoStyle";

export default function Home() {
  const [isEditing, setIsEditing] = useState(false); // edit stuff, still prototype
  const [height, setHeight] = useState("170");
  const [currentWeight, setCurrentWeight] = useState("79");
  const [targetWeight, setTargetWeight] = useState("100");
  const [burnedCalories, setBurnedCalories] = useState("1000");

  const userName = "Albert Einstein";
  const userGoal = "Gain Weight";
  const profilePicture =
    "https://hips.hearstapps.com/hmg-prod/images/albert-einstein-sticks-out-his-tongue-when-asked-by-news-photo-1681316749.jpg";

  const handleEditPress = () => {
    setIsEditing(!isEditing);
  };

  // editing here:
  const renderEditableField = (label: any, value: any, setValue: any) => (
    <View style={style.entry}>
      <Text style={style.label}>{label}:</Text>
      <TextInput
        style={style.input}
        onChangeText={setValue}
        value={value}
        editable={isEditing}
        keyboardType="numeric"
      />
    </View>
  );

  return (
    <View style={style.container}>
      <Image source={{ uri: profilePicture }} style={style.profilePic} />
      <Text style={style.userName}>{userName}</Text>
      <Text style={style.goalType}>Goal: {userGoal}</Text>

      {renderEditableField("Height", height, setHeight)}
      {renderEditableField("Current Weight", currentWeight, setCurrentWeight)}
      {renderEditableField("Target Weight", targetWeight, setTargetWeight)}
      {renderEditableField("Burned Today", burnedCalories, setBurnedCalories)}

      <Button
        title={isEditing ? "Save" : "Edit"}
        color="#F94F6D"
        onPress={handleEditPress}
      />
    </View>
  );
}
