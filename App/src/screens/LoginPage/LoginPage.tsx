import { View, Text, TextInput, Image } from 'react-native';
import { textStyles } from '../../styles/textStyles';
import { SetStateAction, useState, Dispatch } from 'react';
import { currentUser } from '../../models/User';
import Server from '../../models/Server';
import Btn from '../../components/Btn';
import TextBox from '../../components/TextBox';
// import { Dispatch } from "redux";
// import { userLoggedIn, userNotLoggedIn } from "../../../App"

type LoginPageProps = {
	// setRenderFooter: Dispatch<SetStateAction<boolean>>,
	// setRenderLogin: Dispatch<SetStateAction<boolean>>,
	navigation: any;
	setRenderFooter: any;
	setRenderLogin: any;
	setShowWelcome: any;
};

// export default function LoginPage({navigation} : any,{
export default function LoginPage({
	navigation,
	setRenderFooter,
	setRenderLogin,
	setShowWelcome,
}: LoginPageProps) {
	function callSetRenderFooter() {
		console.log('Rendering footer');
		setRenderFooter(true);
		setRenderLogin(false);
	}

	function callSetRenderLogin() {
		console.log('Rendering loginpage');
		setRenderFooter(false);
		setRenderLogin(true);
	}

	// const navigation = useNavigation();

	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	function handleChangePassword(e: string) {
		setPassword(e);
	}

	function handleChangeEmail(e: string) {
		setEmail(e);
	}

	const handleLogin = async () => {
		await Server.loginUser(email, password).then(() => {
			if (currentUser.token) {
				console.log('Login successful');

				Server.getUserInfo();

				if (currentUser.firsTimeOrNot === 0) {
					setShowWelcome(true);
					navigation.navigate('Welcome');
				} else navigation.navigate('Home');

				callSetRenderFooter();
				// ChangePage();
				// route
			} else {
				console.log('Login failed');
				alert('Login failed');
				// navigation.navigate('InitialPage');
				// console.log("Login failed, banishing user to the shadow realm");
			}
		});
		// when finished:
		// navigate til "Home";
		// skal den bare kalde en ny functon?
	};

	function testNavigation() {
		// navigation.navigate('Home');
	}

	function onHandleLogout(): void {
		Server.logoutUser();

		callSetRenderLogin();
		// navigate til "LoginPage";
	}

	const debugShowToken = () => {
		console.log('token: ');
		console.log(currentUser.token);
	};

	return (
		<View>
			<Image
				source={require('../../../assets/logo.png')}
				resizeMode='contain'
				style={textStyles.logo}
			/>
			<Text style={textStyles.underTitle}>Email</Text>

			<TextBox
				label='Enter your Email'
				value={email}
				setValue={setEmail}
			/>
			<Text style={textStyles.underTitle}>Password</Text>
			<TextBox
				label='Enter your Password'
				value={password}
				setValue={setPassword}
				password={true}
			/>
			<View style={textStyles.buttonContainer}>
				<Btn
					style={textStyles.button}
					text='Log In'
					onClick={handleLogin}
				/>
				<Btn
					style={textStyles.button}
					text='Show token'
					onClick={debugShowToken}
				/>
				<Btn
					style={textStyles.button}
					text='Log out'
					onClick={onHandleLogout}
				/>
			</View>
		</View>
	);
}
