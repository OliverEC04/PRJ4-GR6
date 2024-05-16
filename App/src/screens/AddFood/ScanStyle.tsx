import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    camera: {
      height: '100%',
      width: '100%',
    },
    resultContainer: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ccc',
      marginBottom: 20,
      maxHeight: 400,
    },
    resultText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderColor: 'gray',
      alignSelf: 'center',
      width: '87%',
      height: 45,
      backgroundColor: 'white',
      borderWidth: 1,
      borderRadius: 5,
      paddingVertical: 5,
      paddingHorizontal: 15,
      marginBottom: 10,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
  },
    EnterButton: {
      borderRadius: 20,
      marginBottom: 50,
      backgroundColor: "black",
      width: "45%",
      height: 50,
  }, 
  calculatebutton: {
    borderRadius: 20,
    marginBottom: 50,
    backgroundColor: "#61AFEF",
    width: "45%",
    height: 50,
}, 
  
  barcodeText: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
   container2: {
    flex: 1,
    height: '100%',
    width: '100%',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
  cancelButton: {
      backgroundColor: '#E06C75', 
      width: "45%",
      borderRadius: 20,
  },
    modalBackground: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      backgroundColor: 'white',
      borderRadius: 10,
      width: '90%', 
      height: '85%', 
     
      borderWidth: 1,
      borderColor: "black",
  
    },
    modalTitle: {
      fontSize: 17,
      fontWeight: 'normal',
      includeFontPadding: false,
      textDecorationLine: 'underline',
      textAlign: 'center',
    },
    buttons:{
      alignSelf: "flex-end",
      width: '100%',
      marginRight: 0,
      marginBottom: 0,
      borderRadius: 0,
      backgroundColor: "black",
      height: 70,
    }
  });

  export default styles;