import { View, Text, TextInput } from "react-native";
import { textStyles } from "../styles/textStyles";
import { useState, useEffect } from "react";
import { Alert } from "react-native";

export default function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleAddNewUser = async () => {
        try {
            const response = await fetch(`endpoint/${username}nogetmeretekst${password}`, {
                method: 'POST'
            });
            if (response.ok) {
                Alert.alert('Success', 'New user added successfully!');
                // setFoodName('');
                // setCalories('');
                // setProtein('');
                // setCarbs('');
                // setFat('');
                // fetchMeals();
            } else {
                Alert.alert('Error', 'Failed to add new user. Please try again later.');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to add new user. Please check your network connection and try again.');
        }
    };

    const handleLogin = () => {
        // fetchUserInfo(username, password);
    }

    return (
        <View>
            {/* <Text className="italic text-orange-600">Login screen</Text> */}
            <Text style={textStyles.pageTitle}>Login screen</Text>
            <Text className="text-3xl">Username</Text>
            <TextInput 
                            value={username} 
                            placeholder="Enter your username" 
                            onChangeText={(text: string) => setUsername(text)}
             />
            <Text className="text-3xl">Email</Text>
            <TextInput value="emailBox" placeholder="Enter your email" />
            <Text className="text-3xl">Password</Text>
            <TextInput value="passwordBox" placeholder="Enter your password" secureTextEntry={true} />

        </View>
    );
}