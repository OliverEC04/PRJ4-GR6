import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabFooter from './src/components/TabFooter';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import Server from './src/models/Server';
import { AppRegistry } from 'react-native';
import HomeScreen from './src/screens/Home';
import LoginPage from './src/screens/LoginPage/LoginPage';
import InitialPage from './src/screens/InitialPage';

AppRegistry.registerComponent('main', () => App);
const Stack = createNativeStackNavigator();

export default function App()
{
	return (
		<>
			<StatusBar/>
			<View style={styles.appBar}></View>
			<NavigationContainer>
				<TabFooter/>
				{/* <Stack.Navigator>
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen name="LoginPage" component={LoginPage} />
					<Stack.Screen name="InitialPage" component={InitialPage} />
				</Stack.Navigator> */}
			</NavigationContainer>
			
		</>
	);
}

const styles = StyleSheet.create({
	appBar: {
		height: 40
	},
	navCont: {

	},
});