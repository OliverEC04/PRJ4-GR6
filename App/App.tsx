import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabFooter from './src/components/TabFooter';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { AppRegistry } from 'react-native';
import Server from './src/models/Server';
import { startNotification } from './src/models/NotificationService'; 

AppRegistry.registerComponent('main', () => App);
const Stack = createNativeStackNavigator();

export default function App() {
  const [LoggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const LoginStatus = async () => {
      const isLogged = await Server.UserLoggedIn();
      setLoggedIn(isLogged);
      if(isLogged){
        const cleanup = startNotification();
        return cleanup;
      }
    };
    LoginStatus();
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
