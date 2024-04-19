import { Text, TouchableOpacity } from "react-native";
import BtnStyle from "../styles/BtnStyle";

type BtnProps = {
    text?: string,
    onClick: () => void,
    style?: {},
    textStyle?: {},
};

export default function Btn({
    text = "Button",
    onClick,
    style = {},
    textStyle = {},
}: BtnProps)
{
    return (
        <TouchableOpacity
            onPress={onClick}
            style={[BtnStyle.toBtn, style]}>
            <Text style={[BtnStyle.text, textStyle]}>{text}</Text>
        </TouchableOpacity>
    );
}