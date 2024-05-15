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
});

export default styles;