import { User } from "./User";

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

    public loginUser(nameArg: string, passwordArg: string) {
        fetch(this.url + "Account/Login", {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameArg,
                password: passwordArg
            })
        });
    }

    public async getUser(email: string): Promise<User> {
        const response = await fetch(this.url + `GetUser/${email}`);

        return new User(email, "");
    }
}

export default new Server();