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
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
},
modalText: {
    fontSize: 20,
    color: "white",
    marginBottom: 20,
    textAlign: "center"
},
modalBtn: {
    backgroundColor: "#98C379",
    padding: 15,
    borderRadius: 10
},
modalBtnText: {
    color: "white",
    fontSize: 18
}
});
