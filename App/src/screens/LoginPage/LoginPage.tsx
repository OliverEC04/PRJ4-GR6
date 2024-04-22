import { View, Text, TextInput } from "react-native";
import { textStyles } from "../../styles/textStyles";
import { useState } from "react";
import Server from "../../models/Server";
import Btn from "../../components/Btn";

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

  const handleLogin = () => {
    Server.loginUser(username, password);
  };

  return (
    <View style={textStyles.container}>
      {/* <Text className="italic text-orange-600">Login screen</Text> */}
      <Text style={textStyles.pageTitle}>Login screen</Text>
      <Text className="text-3xl">Username</Text>
      <TextInput value={username} placeholder="Enter your username" />
      <Text className="text-3xl">Email</Text>
      <TextInput value={email} placeholder="Enter your email" />
      <Text className="text-3xl">Password</Text>
      <TextInput
        value={password}
        placeholder="Enter your password"
        secureTextEntry={true}
      />
      <Btn text="Log In" onClick={handleLogin} />
    </View>
  );
}
