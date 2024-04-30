import { User, currentUser } from "./User";

class Server {
    private url: string;

    constructor(url: string = "https://brief-oriole-causal.ngrok-free.app/rest_api/") {
        this.url = url;
    }
    // api/me

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

    public async getUserInfo(): Promise<User>  {
        const response = await fetch('https://brief-oriole-causal.ngrok-free.app/rest_api/Account/UserInfo', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + currentUser.token,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        var userInfo = new User('dummy mail', 'dummy name');
        userInfo.calories = data.calories;
        userInfo.proteins = data.proteins;
        userInfo.carbs = data.carbs;
        userInfo.fats = data.fats;
        userInfo.water = data.water;
        return userInfo;
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

    // public async getUser(email: string): Promise<User> {
    //     const response = await fetch(this.url + `GetUser/${email}`);

    //     return new User(email, "");
    // }
}


export default new Server();