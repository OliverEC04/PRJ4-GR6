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
  dropdown: {
    borderColor: "darkgray",
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginBottom: 10,
    alignSelf: "center",
    width: "87%",
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
    backgroundColor: "white"
},
modalText: {
    fontSize: 20,
    color: "black",
    marginBottom: 20,
    textAlign: "center",
},
modalBtn: {
    
    padding: 15,
    alignSelf: "center",
    width: '87%',
    borderRadius: 20,
    marginBottom: 50,
    backgroundColor: "black",
    height: 50,
},
modalBtnText: {
    color: "white",
    alignSelf: "center",
    fontSize: 18
}
});
