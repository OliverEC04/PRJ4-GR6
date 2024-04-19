import { View, Text, TextInput } from "react-native";
import { textStyles } from "../styles/textStyles";
import { useState } from "react";

export default function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // const fetchUserInfo = async (username, password) => {
    //     const options = {
    //         method: 'GET',
    //         // url: ' url her ',
    //         params: {
    //             // query: en query
    //         },
    //         headers: {
    //             // 'X-RapidAPI-Key': '76a997481amsh760010dadfad3f4p1059ebjsn0c157546bc30',
    //             // 'X-RapidAPI-Host': 'barcodes1.p.rapidapi.com'
    //         }
    //     };
    // }

    const handleLogin = () => {
        // fetchUserInfo(username, password);
    }

    return (
        <View>
            {/* <Text className="italic text-orange-600">Login screen</Text> */}
            <Text style={textStyles.pageTitle}>Login screen</Text>
            <Text className="text-3xl">Username</Text>
            <TextInput value="usernameBox" placeholder="Enter your username" />
            <Text className="text-3x1">Email</Text>
            <TextInput value="emailBox" placeholder="Enter your email" />
            <Text className="text-3xl">Password</Text>
            <TextInput value="passwordBox" placeholder="Enter your password" secureTextEntry={true} />

        </View>
    );
}