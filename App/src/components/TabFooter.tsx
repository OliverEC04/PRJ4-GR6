import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Home from "../screens/Home";
import AddFood from "../screens/AddFood/AddFood";
import GoalPage from "../screens/Goals/GoalPage";

export default function TabFooter() {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="AddFood" component={AddFood} />
      <Tab.Screen name="SetGoals" component={GoalPage} />
    </Tab.Navigator>
  );
}
