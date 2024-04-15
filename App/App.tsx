import React from 'react';
import { View, StyleSheet } from 'react-native';
import AddFoodPage from './src/Pages/AddFoodPage'; // Assuming AddFoodPage is imported correctly

export default function App() {
  return (
    <View style={styles.container}>
      <AddFoodPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Makes sure that the container takes up the full screen
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10, // Provides some padding around the inner content
  },
});
