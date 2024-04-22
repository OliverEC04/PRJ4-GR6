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
  logoCont: {
    width: "10%",
    height: "10%",
    flex: 1,
  },
  logo: {
    width: "60%",
    height: 200,
  },
});

export { textStyles };
