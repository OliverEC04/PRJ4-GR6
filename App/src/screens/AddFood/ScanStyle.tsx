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
      fontSize: 14,
      fontFamily: 'monospace',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
  },
    EnterButton: {
      backgroundColor: '#61AFEF', 
      width: "45%",
      borderRadius: 20,
  }, 
  
  barcodeText: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
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
      maxHeight: '85%', 
      paddingBottom: 10,  
      paddingTop: 10,
      borderWidth: 1,
      borderColor: "black",
  
    },
    modalTitle: {
      fontSize: 17,
      fontWeight: 'normal',
      includeFontPadding: false,
      textDecorationLine: 'underline',
      textAlign: 'center',
    }
  });

  export default styles;