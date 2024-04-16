import { View, Text, ColorValue } from "react-native";
import StatBarStyle from "../styles/StatBarStyle"
import { LinearGradient } from "expo-linear-gradient";

type StatBarProps = {
    title: string;
    val?: number;
    minVal?: number;
    maxVal: number;
    unit?: string;
    height?: number;
    colors?: string[]
};

export default function StatBar({
    title,
    val = 0,
    minVal = 0,
    maxVal,
    unit = "",
    height = 20,
    colors = ["#E06C75", "#E5C07B", "#98C379"]
}: StatBarProps)
{
    return (
        <View style={StatBarStyle.container}>
            <Text style={StatBarStyle.title}>
                {title}
            </Text>
            <LinearGradient colors={colors} style={[StatBarStyle.bar, {height: height, borderRadius: height / 2}]} start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
                <Text className="font-semibold" style={[StatBarStyle.text, {lineHeight: height, fontSize: height > 40 ? height * 0.4 : 14}]}>
                    {val} / {maxVal} {unit} 
                </Text>
            </LinearGradient>
        </View>
    );
}