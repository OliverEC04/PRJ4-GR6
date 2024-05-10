import { StyleSheet } from "react-native";

const textStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 0,
  },
  button: {
    alignSelf: "center",
    justifyContent: "center",
  },
  logoCont: {
    width: "10%",
    height: "10%",
    flex: 1,
  },
  logo: {
    width: "60%",
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
});

export { textStyles };
