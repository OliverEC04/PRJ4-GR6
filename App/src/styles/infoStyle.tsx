import {StyleSheet} from "react-native";

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
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 15,
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 10,
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
    backgroundColor: 'black',
    width: "100%",
    height: 50,
  }
});

export default style;
