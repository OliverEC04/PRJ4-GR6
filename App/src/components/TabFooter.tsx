import React, { useEffect, useState } from 'react';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../screens/Home";
import AddFood from "../screens/AddFood/AddFood";
import InfoPage from "../screens/infoPage/infoPage";
import LoginNav from "../screens/LoginPage/LoginNav";
import GoalPage from "../screens/GoalPage/GoalPage";
import Server from "../models/Server";
import { TouchableOpacity } from "react-native";
import { currentUser } from "../models/User";
import InitialPage from "../screens/InitialPage";

export default function TabFooter() {
  const Tab = createMaterialBottomTabNavigator();
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      const result = await Server.checkUserToken().then (result => {
        currentUser.token = result;
        setToken(result);
        console.log("Awaited token: " + token);
        return result
      });
      // currentUser.token = result; 
      // setToken(result); // returner en token eller ""
      console.log("result: " + result);
      console.log("token : " + token);
    };

    fetchToken();
  }, []);

  async function checkLoggedIn(){
    const result = await Server.checkUserToken();
    if (result != "emptyToken" && result != "") // basically, en "if (response.ok)"
      return true;
    return false;
  }
  return (    
    // <Tab.Navigator initialRouteName={token === "" || token === "emptyToken" ? "LoginPage" : "Home"}>     
    // Det her virker ikk, i stedet render det hele baseret på async storage
    <Tab.Navigator initialRouteName={"InitialPage"}>      
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name={"home"} color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="AddFood"
        component={AddFood}
        options={{
          tabBarLabel: "Add Food",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="food-fork-drink"
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="GoalPage"
        component={GoalPage}
        options={{
          tabBarLabel: "Goals",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="target" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="infoPage"
        component={InfoPage}
        options={{
          tabBarLabel: "Info",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="information"
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tab.Screen
        name="LoginPage"
        component={LoginNav}
        options={{
          tabBarLabel: "Login",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="login" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="InitialPage"
        component={InitialPage}
        options={{
          tabBarLabel: "Initial",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="login" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
