import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
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
  waterCont: {
    display: "flex",
    flexDirection: "row",
    width: 300,
  },
  waterBtn: {
    alignSelf: "flex-end",
    marginTop: 22,
    marginLeft: 10,
  },
});
