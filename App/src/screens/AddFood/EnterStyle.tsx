import { StyleSheet } from "react-native";

// Styles are defined outside of the component to use Flexbox effectively
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'space-around',
    },
    dropdown: {
        height: 45,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderColor: 'gray',
        borderWidth: 1,
        alignSelf: 'center',
        width: '85%',
    },
    item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textItem: {
        flex: 1,
        fontSize: 16,
    },
    label: {
        fontSize: 18,
        marginTop: 15,
        marginBottom: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        alignSelf: 'center',
        width: '85%',
        height: 60,
        backgroundColor: 'white',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButton: {
        backgroundColor: '#4169e1', 
        width: "41.5%",
        borderRadius: 20,
    },
    submitButton: {
        backgroundColor: '#333', 
        width: "85%",
        borderRadius: 20,
    },

    deleteButton: {
        backgroundColor: '#fa8072', 
        width: "41.5%",
        borderRadius: 20,
    },
});

export default styles;