import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabFooter from './src/components/TabFooter';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { AppRegistry } from 'react-native';
import { startNotificationService } from './src/models/NotificationService'; 

AppRegistry.registerComponent('main', () => App);
const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    const cleanup = startNotificationService();
    return cleanup;
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
