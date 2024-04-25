import { View, Text, Image } from "react-native";
import StatBar from "../components/StatBar";
import HomeStyle from "../styles/HomeStyle";
import RoundBtn from "../components/RoundBtn";
import Server from "../models/Server";
import { currentUser } from "../models/User";

export default function Home()
{
    return (
        <View style={HomeStyle.container}>
            <Image source={require('./../../assets/logo.png')} resizeMode="contain" style={HomeStyle.logo} />
            
            <StatBar title="Calories" val={2000} maxVal={2500} unit="kcal" height={60} colors={["#98C379", "#E5C07B", "#E06C75"]}></StatBar>
            <StatBar title="Protein" val={120} maxVal={126} unit="g" height={26}></StatBar>
            <StatBar title="Carbs" val={30} maxVal={126} unit="g" height={26}></StatBar>
            <StatBar title="Fats" val={60} maxVal={126} unit="g" height={26}></StatBar>
            <View style={HomeStyle.waterCont}>
                <StatBar title="Water" val={3} maxVal={3} unit="L" height={26} colors={["#E06C75", "#61AFEF"]} width={300 - (60 + 4 + 10)}></StatBar>
                <RoundBtn onClick={() => { }} icon={"plus"} size={60} style={HomeStyle.waterBtn}/>
            </View>
        </View>
    );
}