import { View, Text, TextInput } from "react-native";


export default function TestScreen()
{
    return (
        <View>
            <Text>Test screen</Text>
            <TextInput placeholder='Enter Email...' className='border border-dotted p-2 text-gray-500 border-amber-400 mt-1'/>
        </View>
    );
}