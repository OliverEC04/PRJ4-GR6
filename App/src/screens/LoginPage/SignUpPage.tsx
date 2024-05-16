import { View, Text, Image, TextInput, Alert } from 'react-native';
import { textStyles } from '../../styles/textStyles';
import { useState } from 'react';
import Server from '../../models/Server';
import Btn from '../../components/Btn';
import TextBox from '../../components/TextBox';

type signUpPageProps = {
	navigation: any;
	setShowWelcome: any;
	setRenderFooter: any;
	setRenderLogin: any;
};

export default function SignUpPage({
	navigation,
	setShowWelcome,
	setRenderFooter,
	setRenderLogin,
}: signUpPageProps) {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');

	function passwordCheck(password: any) {
		const hasNumber = /\d/;
		const hasLowercase = /[a-z]/;
		const hasUppercase = /[A-Z]/;
		const nonCase = /[\W_]/; // som !? osv.
		const minLength = 8;

		if (
			!hasNumber.test(password) ||
			!hasLowercase.test(password) ||
			!hasUppercase.test(password) ||
			!nonCase.test(password) ||
			password.lenght < minLength
		) {
			return false;
		}
		return true;
	}

	function createNewUser() {
		if (!passwordCheck(password)) {
			Alert.alert(
				'Password not allowed',
				'Password must be 8 characters long, include numbers, lowercase, uppercase, and special characters',
			);
			return;
		}
		console.log(
			'Creating new user with username: ' +
				username +
				', password: ' +
				password +
				', email: ' +
				email,
		);
		Server.registerUser(username, password, email).then(() => {
			Server.loginUser(email, password).then(() => {
				setShowWelcome(true);
				navigation.navigate('Welcome');
				//setRenderFooter(true);
				setRenderLogin(false);
				
			});
		});
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
				source={require('../../../assets/logo.png')}
				resizeMode='contain'
				style={textStyles.logo}
			/>
			<Text style={textStyles.underTitle}>Username</Text>
			<TextBox
				label='Enter your Username'
				value={username}
				setValue={setUsername}
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
			<Btn
				style={textStyles.button2}
				text='Sign up'
				onClick={createNewUser}
			/>
		</View>
	);
}
