import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    cameraContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 300,
      width: 300,
      overflow: 'hidden',
      borderRadius: 30,
      backgroundColor: 'tomato',
      marginBottom: 20,
    },
    camera: {
      height: '100%',
      width: '100%',
    },
    resultContainer: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#ccc',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    infoContainer: {
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      marginBottom: 15,
      alignSelf: 'center',
      width: '85%',
      backgroundColor: 'white',
    },
    resultText: {
      fontSize: 24,
      fontFamily: 'monospace',
      textAlign: 'center',
      marginVertical: 5,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '90%',
      marginBottom: 20,
    },
    EnterButton: {
      backgroundColor: '#61AFEF', 
      width: "45%",
      borderRadius: 20,
    }, 
    barcodeText: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
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
      height: '55%', 
      marginBottom: 10,
      paddingVertical: 15,
      paddingHorizontal: 15,
      borderWidth: 1,
      borderColor: "black",
    },
    modalTitle: {
      fontSize: 17,
      fontWeight: 'normal',
      includeFontPadding: false,
      textDecorationLine: 'underline',
      marginBottom: -50,
      textAlign: 'center',
    },
    scanAgainText: {
      position: 'absolute',
      bottom: 20,
      fontSize: 18,
      color: 'red',
    }
  });

  export default styles;