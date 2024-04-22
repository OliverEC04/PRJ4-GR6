import { View, Text, TextInput } from "react-native";
import { textStyles } from "../../styles/textStyles";
import { useState } from "react";
import Server from "../../models/Server";
import Btn from "../../components/Btn";
import logo from "../../../assets/logo.png";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // const fetchUserInfo = async (username, password) => {
  //     const options = {
  //         method: 'GET',
  //         // url: ' url her ',
  //         params: {
  //             // query: en query
  //         },
  //         headers: {
  //             // 'X-RapidAPI-Key': '76a997481amsh760010dadfad3f4p1059ebjsn0c157546bc30',
  //             // 'X-RapidAPI-Host': 'barcodes1.p.rapidapi.com'
  //         }
  //     };
  // }
  function handleChangeName(e: string) {
    setUsername(e);
  }

  function handleChangePassword(e: string) {
    setPassword(e);
  }

  function handleChangeEmail(e: string) {
    setEmail(e);
  }

  const handleLogin = () => {
    // fetchUserInfo(username, password);
  };

  return (
    <View style={textStyles.container}>
      <Image source={logo} />
      <Text style={textStyles.pageTitle}>Login screen</Text>
      <Text className="text-3xl">Username</Text>
      <TextInput
        value={username}
        placeholder="Enter your username"
        onChangeText={handleChangeName}
      />
      <Text className="text-3xl">Email</Text>
      <TextInput
        value={email}
        placeholder="Enter your email"
        onChangeText={handleChangeEmail}
      />
      <Text className="text-3xl">Password</Text>
      <TextInput
        value={password}
        placeholder="Enter your password"
        secureTextEntry={true}
        onChangeText={handleChangePassword}
      />
      <Btn style={textStyles.button} text="Log In" onClick={handleLogin} />
    </View>
  );
}
