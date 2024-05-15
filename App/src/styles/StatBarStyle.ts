import { StyleSheet } from "react-native";

export default StyleSheet.create({
    title: {
        textAlign: "center",
        paddingTop: 20,
    },
    text: {
        textAlign: "center",
        color: "white",
        textShadowColor: "#000000A0",
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 10,
        zIndex: 10,
        position: "absolute",
        alignSelf: "center"
    },
    bar: {
        backgroundColor: "grey",
        textAlign: "center",
    },
    barCover: {
        backgroundColor: "#999999",
        alignSelf: "flex-end",
        position: "absolute",
        zIndex: 1
    },
    barEnd: {
    }
});