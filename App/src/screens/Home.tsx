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

    //return bmr;
    // Calculate calorie goal

    if (user.currentWeight < user.targetWeight)
        return bmr * user.activityLevel + user.difficultyLevel;
    
    else
        return bmr * user.activityLevel - user.difficultyLevel;
    
}

function getProteinGoal(calGoal: number): number
{
    return calGoal / 16;
}

function getCarbsGoal(calGoal: number): number
{
    return calGoal / 8;
}

function getFatsGoal(calGoal: number): number
{
    return calGoal / 36;
}

export default function Home()
{
    const [name, setName] = useState("world");
    const [calories, setCalories] = useState(0);
    const [calGoal, setCalGoal] = useState(0);
    const [calBarColors, setCalBarColors] = useState(["#98C379", "#E5C07B", "#E06C75"]);
    const [protein, setProtein] = useState(0);
    const [proteinGoal, setProteinGoal] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [carbsGoal, setCarbsGoal] = useState(0)
    const [fats, setFats] = useState(0);
    const [fatsGoal, setFatsGoal] = useState(0);
    const [water, setWater] = useState(0);
    const [waterGoal, setWaterGoal] = useState(0);
    const [addWaterPopupVisible, setAddWaterPopupVisible] = useState(false);

    useFocusEffect(() => {      
        if (currentUser.token == undefined || currentUser.token == "")
        {
            setName("please log in");
            return;
        }

        server.getUserInfo().then((r) => {
            setName(currentUser.fullName.split(" ")[0]);
            setCalories(Math.round(currentUser.currentCalories));
            setProtein(Math.round(currentUser.currentProtein));
            setCarbs(Math.round(currentUser.currentCarbs));
            setFats(Math.round(currentUser.currentFat));
            setWater(+currentUser.currentWater.toFixed(3));
            setWaterGoal(+currentUser.dailyWater.toFixed(3));

            // Calculate and set goals (except water)
            currentUser.dailyCalories = getCalGoal(currentUser);
            currentUser.dailyProtein = getProteinGoal(currentUser.dailyCalories);
            currentUser.dailyCarbs = getCarbsGoal(currentUser.dailyCalories);
            currentUser.dailyFat = getFatsGoal(currentUser.dailyCalories);

            server.putUser(currentUser);

            setCalGoal(Math.round(currentUser.dailyCalories));
            setProteinGoal(Math.round(currentUser.dailyProtein));
            setCarbsGoal(Math.round(currentUser.dailyCarbs));
            setFatsGoal(Math.round(currentUser.dailyFat));
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
            <StatBar title="Protein" val={protein} maxVal={proteinGoal} unit="g" height={26}></StatBar>
            <StatBar title="Carbs" val={carbs} maxVal={carbsGoal} unit="g" height={26}></StatBar>
            <StatBar title="Fats" val={fats} maxVal={fatsGoal} unit="g" height={26}></StatBar>
            <View style={HomeStyle.waterCont}>
                <StatBar title="Water" val={water} maxVal={waterGoal} unit="L" height={26} colors={["#E06C75", "#61AFEF"]} width={300 - (60 + 4 + 10)}></StatBar>
                <RoundBtn onClick={() => {setAddWaterPopupVisible(true)}} icon={"plus"} size={60} style={HomeStyle.waterBtn}/>
            </View>
            <PopupField
                onEnter={v => {
                    const water = Number(v);

                    currentUser.currentWater += water;
                    setWater(+currentUser.currentWater.toFixed(3));
                    server.putWater(water);
                }}
                visible={addWaterPopupVisible}
                setVisible={setAddWaterPopupVisible}
                fieldPlaceholder="Enter liters of water to add"
                fieldUnit="L"
            />
        </View>
    );
}