import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },

  logo: {
    alignSelf: "center",
    width: "60%",
    height: 200,
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
  },
  label: {
    fontSize: 18,
    color: "gray",
  },
  input: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    textAlign: "left",
    paddingLeft: 10,
    width: "65%",
  },
  units: {
    fontSize: 18,
    color: "gray",
    marginLeft: 6,
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
    marginTop: 20,
    backgroundColor: "black",
    width: "96%",
    marginLeft: "0%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    fontSize: 18,
    color: "black",
    borderWidth: 1,
    borderColor: "darkgray",
    borderRadius: 5,
    width: "95%",
  },
});

export default style;
