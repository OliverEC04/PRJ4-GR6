import { View, Text, Image } from "react-native";
import StatBar from "../components/StatBar";
import HomeStyle from "../styles/HomeStyle";
import RoundBtn from "../components/RoundBtn";
import server from "../models/Server";
import { currentUser } from "../models/User";
import PopupField from "../components/PopupField";
import { useEffect, useState } from "react";

export default function Home()
{
    const [name, setName] = useState("world");
    const [calories, setCalories] = useState(1000);
    const [protein, setProtein] = useState(126);
    const [carbs, setCarbs] = useState(100);
    const [fats, setFats] = useState(50);
    const [water, setWater] = useState(2);
    const [addWaterPopupVisible, setAddWaterPopupVisible] = useState(false);

    useEffect(() => {
        // TODO: evt. update currentUser fra server her, eller gør det inde i server.
        server.getUser(currentUser.email).then((u) => {
            console.debug(u);

            setName(currentUser.fullName.split(" ")[0]);
            setCalories(currentUser.calories);
            setProtein(currentUser.proteins);
            setCarbs(currentUser.carbs);
            setFats(currentUser.fats);
            setWater(currentUser.water);
        });
     });

    return (
        <View style={HomeStyle.container}>
            <Image source={require('./../../assets/logo.png')} resizeMode="contain" style={HomeStyle.logo} />
            <Text style={{fontSize: 30, fontWeight: "200"}}>
                {`Hello ${name}!`}
            </Text>
            <StatBar title="Calories" val={calories} maxVal={2500} unit="kcal" height={60} colors={["#98C379", "#E5C07B", "#E06C75"]}></StatBar>
            <StatBar title="Protein" val={protein} maxVal={126} unit="g" height={26}></StatBar>
            <StatBar title="Carbs" val={carbs} maxVal={126} unit="g" height={26}></StatBar>
            <StatBar title="Fats" val={fats} maxVal={126} unit="g" height={26}></StatBar>
            <View style={HomeStyle.waterCont}>
                <StatBar title="Water" val={water} maxVal={3} unit="L" height={26} colors={["#E06C75", "#61AFEF"]} width={300 - (60 + 4 + 10)}></StatBar>
                <RoundBtn onClick={() => {setAddWaterPopupVisible(true)}} icon={"plus"} size={60} style={HomeStyle.waterBtn}/>
            </View>
            <PopupField
                onEnter={v => currentUser.addWater(+v)}
                visible={addWaterPopupVisible}
                setVisible={setAddWaterPopupVisible}
                fieldPlaceholder="Enter liters of water to add"
                fieldUnit="L"
            />
        </View>
    );
}