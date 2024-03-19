import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";


export default function Home()
{
    const navigation = useNavigation();

    return (
        <View>
            <Text className="italic text-orange-600">Home screen</Text>
            <Button title="TestScreen" onPress={() => navigation.navigate("Test")} />
        </View>
    );
}