import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import TestScreen from './src/screens/Test';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
		  <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Test" component={TestScreen}/>
	  </Stack.Navigator>
    </NavigationContainer>
  );
}