import React from "react";
import { ActivityIndicator, View, Text } from "react-native";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Server from "../models/Server";
import { currentUser } from "../models/User";
import Screen  from "../components/TabFooter";
import Btn from "../components/Btn";
import { textStyles } from "../styles/textStyles";
// import styles from "../styles/AddTextFieldStyle";

type InitialPageProps = {
    navigation: any,
    setRenderFooter: any,
    setRenderLogin: any,
    setRenderInitial: any,
};

export default function InitialPage(
  {
    navigation,
    setRenderFooter,
    setRenderLogin,
    setRenderInitial,
  }: InitialPageProps
): React.ReactNode {

  const [token, setToken] = useState("");
  console.log("Setting both states true");
  setRenderFooter(true);
  setRenderLogin(true);


  useEffect(() => {
        const fetchToken = async () => {
          const result = await Server.checkUserToken().then (result => {
            currentUser.token = result;
            setToken(result);
            console.log("[InitialPage]Awaited token: " + token);
            return result
          });
        };
    
        fetchToken();
        loadNextPage();

      }, []);
    
      async function checkLoggedIn(): Promise<boolean>{
        const result = await Server.checkUserToken()
        .then(result => {        
        if (result != "emptyToken" && result != "") // basically, en "if (response.ok)"
          return true;
        return false;
        });
        return result;
      }

    async function loadNextPage(){
      console.log("[InitialPage]loadNextPage called");
        const loggedIn = await checkLoggedIn().then(result => {
          console.log("[InitialPage]result: " + result + " new token: " + currentUser.token);
          if (result){
              navigation.navigate("Home");
              setRenderFooter(true)
              setRenderInitial(false);
              setRenderLogin(false);
             
          }
          
          else{
            navigation.navigate("LoginPage");
            setRenderFooter(false);
            setRenderInitial(false);
            setRenderLogin(true);
          }
          return result;
          });
        // if (loggedIn) // Added parentheses after checkLoggedIn
        // {
        //         navigation.navigate('Home');
        //         setRenderInitial(false);
        //         console.log("user logged in, going to homepage")
        // }
        // else
        // {
        //         navigation.navigate('LoginPage');
        //         setRenderInitial(false);
        //         // kun render loginpage
        //         console.log("user not logged in, going to loginpage")
        // }
    }

    function logoutUser(){
        Server.logoutUser();
        setRenderFooter(true);
        setRenderLogin(true);
        loadNextPage();
    }
    
    const debugShowToken = () => {
      console.log("[InitialPage]stored token: " + currentUser.token);
    };
  
    return (
        <View style={[styles.container, styles.horizontal]}>
         
            <ActivityIndicator size="large" color="blue" />
        </View>);

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});

