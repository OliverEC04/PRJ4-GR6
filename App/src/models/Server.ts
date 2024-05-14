import { User, currentUser } from "./User";
import AsyncStorage from '@react-native-async-storage/async-storage';

class Server {
	private url: string;

	constructor(url: string = "http://rottehjem.duckdns.org:5000/") {
		this.url = url;
	}
	// api/me

	public async registerUser(
		nameArg: string,
		passwordArg: string,
		emailArg: string
	) {
		try {
			console.log("fetching... ");
			const response = await fetch(this.url + "Account/Register", {
				method: "POST",
				headers: {
					Accept: "*/*",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					fullName: nameArg,
					password: passwordArg,
					email: emailArg,
				}),
			});
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
		} catch (error) {
			console.error("Error registering user:", error);
		}
	}

	// en put metode til at opdatere user data

	public async getUserInfo(): Promise<User> {
		const response = await fetch(`${this.url}AppUser/me`, {
			// TJEK URL
			method: "GET",
			headers: {
				Authorization: "Bearer " + currentUser.token,
			},
		});

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		const data = await response.json();

		currentUser.update(data);

		return data;
	}

	public async putWater(liters: number) {
		const response = fetch(`${this.url}AppUser/me`, {
			method: "PUT",
			headers: {
				Authorization: "Bearer " + currentUser.token,
			},
			body: JSON.stringify({
				currentWater: liters,
			})
		});
	}

	public async loginUser(nameArg: string, passwordArg: string) {
		try {
			console.log("logging in with url: ", this.url + "Account/Login");
			const response = await fetch(this.url + "Account/Login", {
				method: "POST",
				headers: {
					Accept: "*/*",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userName: nameArg,
					password: passwordArg,
				}),
			});
			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}
			currentUser.token = await response.text();
			if (currentUser.token === "") {
				throw new Error("No token received");
			}
			await AsyncStorage.setItem("token", currentUser.token);
		} catch (error) {
			console.error("Error logging in:", error);
		}
	}

	public async checkUserToken() : Promise<string> {
		try {
			const token = await AsyncStorage.getItem("token");
			if (token !== null) {
			currentUser.token = token; // directly assign the token
            return token.toString(); // ellers prøv uden toString
			// return { token: token }; // return an object with a token property
			}
		} catch (error) {
			console.error("Error checking token, user should log in:", error);
		}
        return "";
	}

    public logoutUser(){
        currentUser.token = "";
        AsyncStorage.removeItem("token");
    }

	public async getUser(): Promise<void> {
	    await fetch(this.url + `GetUser`)
	       .then((response) => {
	       if (response.ok) return response.json();
	       else throw new Error("getUser fucked up :(");
	    })
	     .then((data) => {
	       console.debug(data);
	    });
	}

}

export default new Server();
