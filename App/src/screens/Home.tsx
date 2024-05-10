import { View, Text, Image } from "react-native";
import StatBar from "../components/StatBar";
import HomeStyle from "../styles/HomeStyle";
import RoundBtn from "../components/RoundBtn";
import server from "../models/Server";
import { User, currentUser } from "../models/User";
import PopupField from "../components/PopupField";
import { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";

function getCalGoal(user: User): number
{
    // Calculate BMR

    let bmr: number;

    if (user.gender === "Male")
        bmr = 10 * user.currentWeight + 6.25 * user.height - 5 * user.age + 5;

    else if (user.gender === "Female")
        bmr = 10 * user.currentWeight + 6.25 * user.height - 5 * user.age - 161;
    
    else
    {
        console.warn("Received gender does not exist, cannot calculate BMR.");
        return -1;
    }

    // Calculate calorie goal

    if (user.currentWeight < user.targetWeight)
        return bmr * user.activityLevel + user.difficultyLevel;
    
    else
        return bmr * user.activityLevel - user.difficultyLevel;
    
}

export default function Home()
{
    const [name, setName] = useState("world");
    const [calories, setCalories] = useState(3000);
    const [calGoal, setCalGoal] = useState(2500);
    const [calBarColors, setCalBarColors] = useState(["#98C379", "#E5C07B", "#E06C75"]);
    const [protein, setProtein] = useState(126);
    const [carbs, setCarbs] = useState(100);
    const [fats, setFats] = useState(50);
    const [water, setWater] = useState(2);
    const [addWaterPopupVisible, setAddWaterPopupVisible] = useState(false);

    useFocusEffect(() => {      
        server.getUserInfo().then((r) => {
            console.log(currentUser.token);
            
            if (currentUser.token == undefined || currentUser.token == "")
            {
                setName("please log in");
                return;
            }

            setName(currentUser.fullName.split(" ")[0]);
            setCalories(currentUser.currentCalories);
            setProtein(currentUser.currentProtein);
            setCarbs(currentUser.currentCarbs);
            setFats(currentUser.currentFat);
            setWater(currentUser.currentWater);

            setCalGoal(getCalGoal(currentUser));
        }).catch((e) => {
            setName("FETCH FAILED");
         }
        );
    });
    
    useEffect(() => {
        if (calories > calGoal)
        {
            setCalBarColors(["#E06C75", "#E06C75"]);
        }
        else
        {
            setCalBarColors(["#98C379", "#E5C07B", "#E06C75"]);
        }
    }, [calories, calGoal]);

    return (
        <View style={HomeStyle.container}>
            <Image source={require('./../../assets/logo.png')} resizeMode="contain" style={HomeStyle.logo} />
            <Text style={{fontSize: 30, fontWeight: "200"}}>
                {`Hello ${name}!`}
            </Text>
            <StatBar title="Calories" val={calories} maxVal={calGoal} unit="kcal" height={60} colors={calBarColors}></StatBar>
            <StatBar title="Protein" val={protein} maxVal={126} unit="g" height={26}></StatBar>
            <StatBar title="Carbs" val={carbs} maxVal={126} unit="g" height={26}></StatBar>
            <StatBar title="Fats" val={fats} maxVal={126} unit="g" height={26}></StatBar>
            <View style={HomeStyle.waterCont}>
                <StatBar title="Water" val={water} maxVal={3} unit="L" height={26} colors={["#E06C75", "#61AFEF"]} width={300 - (60 + 4 + 10)}></StatBar>
                <RoundBtn onClick={() => {setAddWaterPopupVisible(true)}} icon={"plus"} size={60} style={HomeStyle.waterBtn}/>
            </View>
            <PopupField
                onEnter={v => {
                    currentUser.addWater(+v);
                    server.putWater(currentUser.currentWater);
                }}
                visible={addWaterPopupVisible}
                setVisible={setAddWaterPopupVisible}
                fieldPlaceholder="Enter liters of water to add"
                fieldUnit="L"
            />
        </View>
    );
}