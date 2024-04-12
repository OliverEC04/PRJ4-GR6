import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  userName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
    alignSelf: "center",
    marginBottom: 4,
  },
  goalType: {
    fontSize: 20,
    fontStyle: "italic",
    color: "#555",
    alignSelf: "center",
    marginBottom: 20,
  },
  entry: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  label: {
    fontSize: 18,
    color: "#666",
  },
  value: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: "center",
    marginBottom: 20,
  },
  input: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "right",
  },
  units: {
    fontSize: 18,
    color: "#666",
  },
});

export default style;
