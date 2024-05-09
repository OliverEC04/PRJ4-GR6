import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 100,
    alignSelf: "center",
    marginBottom: 10,
  },
  dropdown: {
    borderColor: "darkgray",
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginBottom: 10,
    alignSelf: "center",
    width: "95%",
  },
  placeholderText: {
    color: "gray",
    fontSize: 18,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  button: {
    borderRadius: 20,
    marginBottom: 50,
    backgroundColor: "black",
    width: "95%",
    height: 50,
  },
});

export default style;
