import { View, Text } from "react-native";
import StatBar from "../components/StatBar";
import HomeStyle from "../styles/HomeStyle";

export default function Home()
{
    return (
        <View style={HomeStyle.container}>
            <Text className="italic text-orange-600">GYMRATS</Text>
            <StatBar title="Calories" val={2000} maxVal={2500} unit="kcal" height={60} colors={["#98C379", "#E5C07B", "#E06C75"]}></StatBar>
            <StatBar title="Protein" val={120} maxVal={126} unit="g" height={26}></StatBar>
            <StatBar title="Carbs" val={30} maxVal={126} unit="g" height={26}></StatBar>
            <StatBar title="Fats" val={60} maxVal={126} unit="g" height={26}></StatBar>
            <StatBar title="Water" val={3} maxVal={3} unit="L" height={26} colors={["#E06C75", "#61AFEF"]}></StatBar>
        </View>
    );
}