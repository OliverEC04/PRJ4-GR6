import { TouchableOpacity } from "react-native";
import BtnStyle from "../styles/BtnStyle";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type RoundBtnProps = {
    onClick: () => void,
    icon: string,
    size?: number,
    btnColor?: string,
    iconColor?: string,
    style?: {},
};

export default function RoundBtn({
    onClick,
    icon,
    size = 60,
    btnColor = "#61AFEF",
    iconColor = "white",
    style = {},
}: RoundBtnProps)
{
    return (
        <TouchableOpacity
            onPress={onClick}
            style={[
                BtnStyle.round,
                { width: size, height: size, borderRadius: size / 2, backgroundColor: btnColor },
                style
            ]}>
            <MaterialCommunityIcons
                name={icon as any}
                color={iconColor}
                size={size / 2}
            />
        </TouchableOpacity>
    );
}