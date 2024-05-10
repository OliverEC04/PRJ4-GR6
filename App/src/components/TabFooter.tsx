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

export default function TabFooter() {
  const Tab = createMaterialBottomTabNavigator();

  Server.checkUserToken();

  if(currentUser.token){
    return (
      <Tab.Navigator initialRouteName="Home">
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
      </Tab.Navigator>
    );
  } else {
    return (
      <Tab.Navigator initialRouteName="LoginPage">
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
      </Tab.Navigator>
    );
  }
  
}
