import { StyleSheet } from "react-native";

export default StyleSheet.create({
  entry: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "darkgray",
    borderRadius: 5,
  },
  label: {
    fontSize: 18,
    color: "gray",
  },
  input: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    textAlign: "right",
  },
  units: {
    fontSize: 18,
    color: "gray",
    marginLeft: 6,
  },
});
