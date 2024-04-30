import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
        height: 45,
        backgroundColor: 'white',
    },
});

export default styles;