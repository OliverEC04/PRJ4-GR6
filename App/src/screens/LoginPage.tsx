import { View, Text, TextInput } from "react-native";
import { textStyles } from "../styles/textStyles";

export default function LoginPage() {
    return (
        <View>
            {/* <Text className="italic text-orange-600">Login screen</Text> */}
            <Text style={textStyles.pageTitle}>Login screen</Text>
            <Text className="text-3xl">Username</Text>
            <TextInput placeholder="Enter your username" />
            <Text className="text-3xl">Password</Text>
            <TextInput placeholder="Enter your password" secureTextEntry={true} />
        </View>
    );
}