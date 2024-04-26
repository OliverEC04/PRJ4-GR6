import { User, currentUser } from "./User";

class Server {
    private url: string;

    constructor(url: string = "https://brief-oriole-causal.ngrok-free.app/rest_api/") {
        this.url = url;
    }

    public async registerUser(nameArg: string, passwordArg: string, emailArg: string) {
        try {
            console.log("fetching... ");
            const response = await fetch(this.url + "Account/Register", {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullName: nameArg,
                    password: passwordArg,
                    email: emailArg
                })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
        }
        catch (error) {
            console.error('Error registering user:', error);
        };
    }

    public async loginUser(nameArg: string, passwordArg: string) {
        try {
            console.log("logging in with url: ", this.url + "Account/Login");
            const response = await fetch(this.url + "Account/Login", {
                method: 'POST',
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userName: nameArg,
                    password: passwordArg,
                })
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            currentUser.token = await response.text();
            if (currentUser.token === "") {
                throw new Error("No token received");
            }

            console.log("token: ", currentUser.token);
        }
        catch (error) {
            console.error('Error logging in:', error);
        };
    }
// the big user
    public async getUser(): Promise<void> {
        await fetch(this.url + `GetUser`)
            .then((response) => {
                if (response.ok)
                    return response.json();
                else
                    throw new Error("getUser fucked up :(");
            })
            .then((data) => {
                console.debug(data);
            });
    }
}


export default new Server();