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
import { useState } from 'react';

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

// export function setRenderStates(isLoggedIn: boolean) {
// 	setRenderFooter(isLoggedIn);
// 	setRenderLogin(!isLoggedIn);
//   }

// function userLoggedIn(setRenderFooter: React.Dispatch<React.SetStateAction<boolean>>, setRenderLogin: React.Dispatch<React.SetStateAction<boolean>>){
// 	setRenderFooter(true);
// 	setRenderLogin(false);
// }

// function userNotLoggedIn(setRenderFooter: React.Dispatch<React.SetStateAction<boolean>>, setRenderLogin: React.Dispatch<React.SetStateAction<boolean>>){
// 	setRenderFooter(false);
// 	setRenderLogin(true);
// }

// export {userLoggedIn, userNotLoggedIn};