import { View, Text, TextInput, Image } from "react-native";
import { textStyles } from "../../styles/textStyles";
import { useState } from "react";
import { currentUser } from "../../models/User";
import Server from "../../models/Server";
import Btn from "../../components/Btn";
import TextBox from "../../components/TextBox";
import { useNavigation } from "@react-navigation/native";
import { NavigationProp, ParamListBase } from '@react-navigation/native';


export default function LoginPage() {

  const navigation = useNavigation();
  
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function handleChangePassword(e: string) {
    setPassword(e);
  }

  function handleChangeEmail(e: string) {
    setEmail(e);
  }

  const goToHome = () => {
    // navigation.navigate({name: "Home", params: {name: "Home"});
  };
  // function ChangePage(){
  //   const navigation = useNavigation();
  //   navigation.navigate("Home");
  //   };

  const handleLogin = async () => {
    await Server.loginUser(email, password)
    .then(() => {
      if (currentUser.token) {
        console.log("Login successful");
        // ChangePage();
        // route
      }
    })
    // when finished:
    // navigate til "Home";
    // skal den bare kalde en ny functon?
  };

  function onHandleLogout() : void {
    Server.logoutUser();
    // navigate til "LoginPage";
  }

  const debugShowToken = () => {
    console.log("token: ");
    console.log(currentUser.token);
  };

  return (
    <View>
      <Image
        source={require("../../../assets/logo.png")}
        resizeMode="contain"
        style={textStyles.logo}
      />
      <Text style={textStyles.underTitle}>Email</Text>

      <TextBox label="Enter your Email" value={email} setValue={setEmail} />
      <Text style={textStyles.underTitle}>Password</Text>
      <TextBox
        label="Enter your Password"
        value={password}
        setValue={setPassword}
      />
      <View style={textStyles.buttonContainer}>
        <Btn style={textStyles.button} text="Log In" onClick={handleLogin} />
        <Btn
          style={textStyles.button}
          text="Show token"
          onClick={debugShowToken}
        />
        <Btn
          style={textStyles.button} 
          text="Log out" 
          onClick={onHandleLogout} />
      </View>
    </View>
  );
}
