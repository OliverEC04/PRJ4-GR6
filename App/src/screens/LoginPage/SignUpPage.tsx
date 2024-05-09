import { View, Text, Image, TextInput } from "react-native";
import { textStyles } from "../../styles/textStyles";
import { useState } from "react";
import Server from "../../models/Server";
import Btn from "../../components/Btn";
import TextBox from "../../components/TextBox";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  function createNewUser(): void {
    console.log(
      "Creating new user with username: " +
      username +
      ", password: " +
      password +
      ", email: " +
      email
    );
    Server.registerUser(username, password, email);
  }

  function handleChangeName(e: string) {
    setUsername(e);
  }

  function handleChangePassword(e: string) {
    setPassword(e);
  }

  function handleChangeEmail(e: string) {
    setEmail(e);
  }

  return (
    <View>
      <Image
        source={require("../../../assets/logo.png")}
        resizeMode="contain"
        style={textStyles.logo}
      />
      <Text style={textStyles.underTitle}>Username</Text>
      <TextBox
        label="Enter your Username"
        value={username}
        setValue={setUsername}
      />
      <Text style={textStyles.underTitle}>Email</Text>
      <TextBox label="Enter your Email" value={email} setValue={setEmail} />
      <Text style={textStyles.underTitle}>Password</Text>
      <TextBox
        label="Enter your Password"
        value={password}
        setValue={setPassword}
      />
      <Btn style={textStyles.button} text="Sign up" onClick={createNewUser} />
    </View>
    // <View style={textStyles.container}>
    //   {/* <Text className="italic text-orange-600">Login screen</Text> */}
    //   <Text style={textStyles.pageTitle}>Signup screen</Text>
    //   <Text className="text-3xl">Username</Text>
    //   <TextInput
    //     value={username}
    //     onChangeText={handleChangeName}
    //     placeholder="Enter your username"
    //   />
    //   <Text className="text-3xl">Email</Text>
    //   <TextInput
    //     value={email}
    //     onChangeText={handleChangeEmail}
    //     placeholder="Enter your email"
    //   />
    //   <Text className="text-3xl">Password</Text>
    //   <TextInput
    //     value={password}
    //     onChangeText={handleChangePassword}
    //     placeholder="Enter your password"
    //     secureTextEntry={true}
    //   />
    //   <Btn text="Sign up" onClick={createNewUser} />
    // </View>
  );
}
