import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, StatusBar } from 'react-native';
import Scanner from './components/Scanner'; // Assuming Scanner is in the components folder

export default function App() {
  const [showScanner, setShowScanner] = useState(false);

  if (showScanner) {
    return <Scanner />;
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button
        title="Go to Scanner"
        onPress={() => setShowScanner(true)}
      />
      <StatusBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
