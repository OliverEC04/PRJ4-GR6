import { StyleSheet } from "react-native";

const textStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 0,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10, // Adjust this value as needed
  },
  button: {
    alignSelf: "center",
    justifyContent: "center",
  },
  button2: {
    fontSize: 20,
    color: "black",
    marginTop: 0,
    marginBottom: 100,
    textAlign: "center",
    width: "100%",
  },
  logo: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "blue",
  },
  pageTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "orange",
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
  underTitle: {
    fontSize: 26,
    color: "black",
    marginBottom: 4,
    marginLeft: "2%",
  },
});

export { textStyles };
