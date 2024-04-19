import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "../screens/Home";
import AddFood from "../screens/AddFood/AddFood";
import infoPage from "../screens/infoPage/infoPage";
import LoginPage from '../screens/LoginPage';

export default function TabFooter()
{
    const Tab = createMaterialBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="AddFood" component={AddFood} />
            <Tab.Screen name="infoPage" component={infoPage} />
            <Tab.Screen name="LoginPage" component={LoginPage} />
        </Tab.Navigator>
    );
}
