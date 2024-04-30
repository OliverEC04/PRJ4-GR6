import { View, Text, TextInput, Image } from "react-native";
import { textStyles } from "../../styles/textStyles";
import { useState } from "react";
import Server from "../../models/Server";
import Btn from "../../components/Btn";
import TextBox from "../../components/TextBox";

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
    <View>
      <Image
        source={require("../../../assets/logo.png")}
        resizeMode="contain"
        style={textStyles.logo}
      />
      <Text style={textStyles.underTitle}>Email</Text>

      <TextBox
        label="Enter your Email"
        value={email}
        setValue={setEmail}
        units=""
      />
      <Text style={textStyles.underTitle}>Password</Text>
      <TextBox
        label="Enter your Password"
        value={password}
        setValue={setPassword}
        units=""
      />
      {/* <TextInput
        value={password}
        placeholder="Enter your password"
        secureTextEntry={true}
        onChangeText={handleChangePassword}
      /> */}
      <Btn style={textStyles.button} text="Log In" onClick={handleLogin} />
    </View>
  );
}
