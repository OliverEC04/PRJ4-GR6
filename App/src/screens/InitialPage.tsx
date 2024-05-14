import React from "react";
import { ActivityIndicator, View } from "react-native";
import { StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Server from "../models/Server";
import { currentUser } from "../models/User";
// import styles from "../styles/AddTextFieldStyle";

export default function InitialPage({ navigation }: any): React.ReactNode {

    const [token, setToken] = useState("");

    useEffect(() => {
        const fetchToken = async () => {
          const result = await Server.checkUserToken().then (result => {
            currentUser.token = result;
            setToken(result);
            console.log("Awaited token: " + token);
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
        if (await checkLoggedIn()) // Added parentheses after checkLoggedIn
        {
                navigation.navigate('Home');
                console.log("user logged in, going to homepage")
        }
        else
        {
                navigation.navigate('LoginPage');
                console.log("user not logged in, going to loginpage")
        }
    }
    
    return (
        <View style={[styles.container, styles.horizontal]}>
            {/* <ActivityIndicator />
            <ActivityIndicator size="large" />
            <ActivityIndicator size="small" color="#0000ff" /> */}
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

