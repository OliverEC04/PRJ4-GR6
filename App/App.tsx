import { NavigationContainer } from '@react-navigation/native';
import TabFooter from './src/components/TabFooter';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';


export default function App()
{
	return (
		<>
			<StatusBar/>
			<View style={styles.appBar}></View>
			<NavigationContainer>
				<TabFooter/>
			</NavigationContainer>
		</>
	);
}

const styles = StyleSheet.create({
	appBar: {
		height: 40
	},
	navCont: {

	},
});