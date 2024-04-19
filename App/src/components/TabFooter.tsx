import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import Home from "../screens/Home";
import AddFood from "../screens/AddFood/AddFood";
import infoPage from "../screens/infoPage/infoPage";
import LoginPage from '../screens/LoginPage';

export default function TabFooter()
{
    const Tab = createMaterialBottomTabNavigator();

    return (
        <Tab.Navigator initialRouteName="Home">
<Tab.Screen
  name="Home"
  component={Home}
  options={{
    tabBarLabel: 'Home',
    tabBarIcon: ({ color }) => (
      <MaterialCommunityIcons name="home" color={color} size={24} />
    ),
  }}
/>

<Tab.Screen
  name="AddFood"
  component={AddFood}
  options={{
    tabBarLabel: 'Add Food',
    tabBarIcon: ({ color }) => (
      <MaterialCommunityIcons name="food-fork-drink" color={color} size={24} />
    ),
  }}
/>
<Tab.Screen
  name="infoPage"
  component={infoPage}
  options={{
    tabBarLabel: 'Info',
    tabBarIcon: ({ color }) => (
      <MaterialCommunityIcons name="information" color={color} size={24} />
    ),
  }}
/>
<Tab.Screen
  name="LoginPage"
  component={LoginPage}
  options={{
    tabBarLabel: 'Login',
    tabBarIcon: ({ color }) => (
      <MaterialCommunityIcons name="login" color={color} size={24} />
    ),
  }}
/>
        </Tab.Navigator>
    );
}
