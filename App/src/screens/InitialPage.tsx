import React from "react";
import { ActivityIndicator, View } from "react-native";
import { StyleSheet } from "react-native";
// import styles from "../styles/AddTextFieldStyle";

export default function InitialPage(): React.ReactNode {
    return (
        <View style={[styles.container, styles.horizontal]}>
            {/* <ActivityIndicator />
            <ActivityIndicator size="large" />
            <ActivityIndicator size="small" color="#0000ff" /> */}
            <ActivityIndicator size="large" color="blue" />
        </View>);

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});

