import { StyleSheet } from 'react-native';

const textStyles = StyleSheet.create({
    'title': {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'blue',
    },
    'pageTitle': {
        fontSize: 36,
        fontWeight: 'bold',
        color: 'orange',
    },
    userName: {
        fontSize: 26,
        fontWeight: "bold",
        color: "black",
        alignSelf: "center",
        marginBottom: 4,
      },
      goalType: {
        fontSize: 20,
        color: "gray",
        alignSelf: "center",
        marginBottom: 20,
      },
});

export {textStyles};