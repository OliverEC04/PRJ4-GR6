import { StyleSheet } from "react-native";

export default StyleSheet.create({
  entry: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "darkgray",
    borderRadius: 5,
    width: "95%",
    marginLeft: "2%",
  },
  label: {
    fontSize: 18,
    color: "gray",
  },
  input: {
    width: "100%",
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    textAlign: "left",
  },
  units: {
    fontSize: 18,
    color: "gray",
    marginLeft: 6,
  },
});
