import React from "react";
import { ActivityIndicator, View } from "react-native";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Server from "../models/Server";
import { currentUser } from "../models/User";
import Btn from "../components/Btn";
import { textStyles } from "../styles/textStyles";
// import styles from "../styles/AddTextFieldStyle";

type LogoutPageProps = {
    navigation: any,
    setRenderFooter: any,
    setRenderLogin: any,
    setRenderInitial: any,
};

export default function LogoutPage(
  {
    navigation,
    setRenderFooter,
    setRenderLogin,
    setRenderInitial,
  }: LogoutPageProps
): React.ReactNode {


  useEffect(() => {
        // const fetchToken = async () => {
        //   const result = await Server.checkUserToken().then (result => {
        //     currentUser.token = result;
        //     setToken(result);
        //     console.log("Awaited token: " + token);
        //     return result
        //   });
        // };
    
        // fetchToken();
        // loadNextPage();

      }, []);
    
    //   async function checkLoggedIn(): Promise<boolean>{
    //     const result = await Server.checkUserToken()
    //     .then(result => {        
    //     if (result != "emptyToken" && result != "") // basically, en "if (response.ok)"
    //       return true;
    //     return false;
    //     });
    //     return result;
    //   }

    function logoutUser(){
        Server.logoutUser();
        navigation.navigate("Login");
        setRenderFooter(false);
        setRenderLogin(true);
    }
    
    const debugShowToken = () => {
      console.log("[LogoutPage]token: ");
      console.log(currentUser.token);
    };
  
    return (
        <View style={[styles.container, styles.horizontal]}>
            <Btn
                          style={textStyles.button}
                          text="Log out"
                          onClick={() => logoutUser()}
            >
            </Btn>
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

