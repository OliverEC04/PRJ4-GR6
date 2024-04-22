import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  targetWeight: {
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
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    flex: 1,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  icon: {
    marginRight: 5,
  },
  button: {
    marginBottom: 50,
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "black",
    width: 340,
    height: 50,
  },
});

export default style;
