import { StyleSheet } from "react-native";

const textStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
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
});

export { textStyles };
