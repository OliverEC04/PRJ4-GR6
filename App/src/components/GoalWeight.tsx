import React from "react";
import { View, Text, StyleSheet } from "react-native";

const GoalWeight = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>70</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  number: {
    fontSize: 40,
    fontWeight: "bold",
    color: "black",
  },
});

export default GoalWeight;
