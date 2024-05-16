import React, { useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabFooter from './src/components/TabFooter';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, LogBox } from 'react-native';
import { AppRegistry } from 'react-native';
import Server from './src/models/Server';
import { startNotification } from './src/models/NotificationService';

LogBox.ignoreAllLogs(); // Removes all in-app warnings, disable when debugging

AppRegistry.registerComponent('main', () => App);
const Stack = createNativeStackNavigator();

export default function App() {
	const [loggedIn, setLoggedIn] = useState(false);
	const notificationCleanupRef = useRef<() => void>(() => {});

	useEffect(() => {
		const loginStatus = async () => {
			const isLogged = await Server.UserLoggedIn();
			setLoggedIn(isLogged);
			console.log(`User logged in: ${isLogged}`);

			if (isLogged) {
				console.log('Starting notification service');
				notificationCleanupRef.current = startNotification();
			} else {
				if (notificationCleanupRef.current) {
					console.log('Stopping notification service');
					notificationCleanupRef.current();
				}
			}
		};

		loginStatus();

		return () => {
			if (notificationCleanupRef.current) {
				console.log('Cleaning up notification service on unmount');
				notificationCleanupRef.current();
			}
		};
	}, []);

	return (
		<>
			<StatusBar />
			<View style={styles.appBar}></View>
			<NavigationContainer>
				<TabFooter />
			</NavigationContainer>
		</>
	);
}

const styles = StyleSheet.create({
	appBar: {
		height: 40,
	},
	navCont: {},
});
