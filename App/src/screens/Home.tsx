import { View, Text } from "react-native";
import StatBar from "../components/StatBar";

export default function Home()
{
    return (
        <View>
            <Text className="italic text-orange-600">GYMRATS</Text>
            <StatBar></StatBar>
        </View>
    );
}