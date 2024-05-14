import React, { useState } from "react";
import { currentUser, User } from "../models/User";
import { View, Text, Image } from "react-native";

export default function displayGoal() {
  // if (user.currentWeight < user.targetWeight) {
  //     <Image source={require('./../../../assets/logo.png')} resizeMode="contain" />
  // {/* <Text style={style.goalType}>Goal: Gain Weight</Text> */}
  //   }
  //   else if (user.currentWeight === user.targetWeight) {
  // <Text style={style.goalType}>Goal: Maintain Weight</Text>
  //   }
  //   else {
  // <Text style={style.goalType}>Goal: Loose Weight</Text>
  //   }
  return (
    <View>
      <Image
        source={require("../../assets/logo.png")}
        style={{ width: 200, height: 200 }} // adjust width and height as needed
      />
    </View>
  );
}
