import React, { useEffect, useState } from "react";
import { View, Text, Image, Modal, TouchableOpacity, Alert } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import StatBar from "../components/StatBar";
import HomeStyle from "../styles/HomeStyle";
import RoundBtn from "../components/RoundBtn";
import server from "../models/Server";
import AddTextField from "../components/AddTextField";
import { currentUser } from "../models/User";
import PopupField from "../components/PopupField";
import { useFocusEffect } from "@react-navigation/native";

function getCalGoal(user) {
    let bmr;
    if (user.gender === "Male") {
        bmr = 10 * user.currentWeight + 6.25 * user.height - 5 * user.age + 5;
    } else if (user.gender === "Female") {
        bmr = 10 * user.currentWeight + 6.25 * user.height - 5 * user.age - 161;
    } else {
        console.warn("Received gender does not exist, cannot calculate BMR.");
        return -1;
    }
    if (user.currentWeight < user.targetWeight) {
        return bmr * user.activityLevel + user.difficultyLevel;
    } else {
        return bmr * user.activityLevel - user.difficultyLevel;
    }
}

function getProteinGoal(calGoal) {
    return calGoal / 16;
}

function getCarbsGoal(calGoal) {
    return calGoal / 8;
}

function getFatsGoal(calGoal) {
    return calGoal / 36;
}

export default function Home() {
    const [name, setName] = useState("world");
    const [calories, setCalories] = useState(0);
    const [calGoal, setCalGoal] = useState(0);
    const [calBarColors, setCalBarColors] = useState(["#98C379", "#E5C07B", "#E06C75"]);
    const [protein, setProtein] = useState(0);
    const [proteinGoal, setProteinGoal] = useState(0);
    const [carbs, setCarbs] = useState(0);
    const [carbsGoal, setCarbsGoal] = useState(0);
    const [fats, setFats] = useState(0);
    const [fatsGoal, setFatsGoal] = useState(0);
    const [water, setWater] = useState(0);
    const [waterGoal, setWaterGoal] = useState(0);
    const [addWaterPopupVisible, setAddWaterPopupVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [weight, setWeight] = useState(null);   
    const [height, setHeight] = useState(null);
    const [age, setAge] = useState(null);
    const [gender, setGender] = useState("");
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [open4, setOpen4] = useState(false);
    const [targetWeight, setTargetWeight] = useState("");
    const [hydration, setHydration] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [activity, setActivity] = useState("0");

    const Activity = [
        { label: "Sedentary (little to no exercise)", value: "1.2" },
        { label: "Lightly active (light exercise or sports 1-3 days a week)", value: "1.375" },
        { label: "Moderately active (moderate exercise or sports 3-5 days a week)", value: "1.55" },
        { label: "Very active (hard exercise or sports 6-7 days a week)", value: "1.725" },
        { label: "Super active (very hard exercise and a physical job or training twice a day)", value: "1.9" },
    ];

    const Hydration = [
        { label: "1 Litre", value: "1" },
        { label: "2 Litre", value: "2" },
        { label: "3 Litre", value: "3" },
    ];

    const Difficulty = [
        { label: "Easy", value: "250" },
        { label: "Normal", value: "500" },
        { label: "Hard", value: "750" },
    ];

    const allGenders = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
    ];

    const renderDropdown = (openState, valueState, setOpenState, setValueState, items, placeholder) => (
        <Dropdown
            style={HomeStyle.dropdown}
            data={items}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={placeholder}
            value={valueState}
            onChange={item => {
                setValueState(item.value);
            }}
            renderLeftIcon={() => (
                <Text style={{ marginRight: 10 }}>▹</Text>
            )}
            open={openState}
            onOpen={() => setOpenState(true)}
            onClose={() => setOpenState(false)}
        />
    );

    useEffect(() => {
        if (currentUser.firsTimeOrNot === 0) {
            setShowModal(true);
        }
    }, []);

    useFocusEffect(() => {
        if (!currentUser.token) {
            setName("please log in");
            return;
        }

        server.getUserInfo().then(() => {
            setName(currentUser.fullName.split(" ")[0]);
            setCalories(Math.round(currentUser.currentCalories));
            setProtein(Math.round(currentUser.currentProtein));
            setCarbs(Math.round(currentUser.currentCarbs));
            setFats(Math.round(currentUser.currentFat));
            setWater(+currentUser.currentWater.toFixed(3));
            setWaterGoal(+currentUser.dailyWater.toFixed(3));

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
        });
    });

    useEffect(() => {
        if (calories > calGoal) {
            setCalBarColors(["#E06C75", "#E06C75"]);
        } else {
            setCalBarColors(["#98C379", "#E5C07B", "#E06C75"]);
        }
    }, [calories, calGoal]);

    const handleWelcomeButtonPress = async() => {

        if (!gender || !height || !weight || !age || !targetWeight || !activity || !difficulty || !hydration) {
            Alert.alert("Error", "Please fill out all fields in the form.");
            return; // Exit the function early
        }

        await server.PutForm(gender,height,weight,age,targetWeight,activity,difficulty,hydration);
       
        setShowModal(false);
    };

    return (
        <View style={HomeStyle.container}>
            <Image source={require('./../../assets/logo.png')} resizeMode="contain" style={HomeStyle.logo} />
            <Text style={{ fontSize: 30, fontWeight: "200" }}>
                {`Hello ${name}!`}
            </Text>
            <StatBar title="Calories" val={calories} maxVal={calGoal} unit="kcal" height={60} colors={calBarColors}></StatBar>
            <StatBar title="Protein" val={protein} maxVal={proteinGoal} unit="g" height={26}></StatBar>
            <StatBar title="Carbs" val={carbs} maxVal={carbsGoal} unit="g" height={26}></StatBar>
            <StatBar title="Fats" val={fats} maxVal={fatsGoal} unit="g" height={26}></StatBar>
            <View style={HomeStyle.waterCont}>
                <StatBar title="Water" val={water} maxVal={waterGoal} unit="L" height={26} colors={["#E06C75", "#61AFEF"]} width={300 - (60 + 4 + 10)}></StatBar>
                <RoundBtn onClick={() => { setAddWaterPopupVisible(true) }} icon={"plus"} size={60} style={HomeStyle.waterBtn} />
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
            <Modal visible={showModal} transparent={true}>
                <View style={HomeStyle.modalView}>
                    <Text style={HomeStyle.modalText}>Welcome to the Gym rats Fitness App!   Fill out this form to get started</Text>
                    {renderDropdown(open, gender, setOpen, setGender, allGenders, "Select your gender")}
                    {renderDropdown(open2, difficulty, setOpen2, setDifficulty, Difficulty, "Choose Goal Difficulty")}
                    {renderDropdown(open3, activity, setOpen3, setActivity, Activity, "Choose Activity level")}
                    {renderDropdown(open4, hydration, setOpen4, setHydration, Hydration, "Choose Hydration")}

                    <AddTextField
                        value={height}
                        onChangeText={setHeight}
                        placeholder="Enter your height in cm"
                        keyboardType="numeric"
                        unit=""
                    />
                    <AddTextField
                        value={weight}
                        onChangeText={setWeight}
                        placeholder="Enter your weight in kg"
                        keyboardType="numeric"
                        unit=""
                    />
                    <AddTextField
                        value={age}
                        onChangeText={setAge}
                        placeholder="Enter your age"
                        keyboardType="numeric"
                        unit=""
                    />
                    <AddTextField
                        value={targetWeight}
                        onChangeText={setTargetWeight}
                        placeholder="Enter your target weight"
                        keyboardType="numeric"
                        unit=""
                    />
                    <TouchableOpacity style={HomeStyle.modalBtn} onPress={handleWelcomeButtonPress}>
                        <Text style={HomeStyle.modalBtnText}>Get started!</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}
