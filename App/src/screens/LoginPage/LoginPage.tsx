import { View, Text, TextInput, Image } from "react-native";
import { textStyles } from "../../styles/textStyles";
import { useState } from "react";
import Server from "../../models/Server";
import Btn from "../../components/Btn";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

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
    Server.loginUser(username, password);
  };

  return (
    <View style={textStyles.container}>
      <Image
        source={require("../../../assets/logo.png")}
        resizeMode="contain"
        style={textStyles.logo}
      />
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
