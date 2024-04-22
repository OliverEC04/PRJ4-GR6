class Server {
    private url: string;

    constructor(url: string = "https://brief-oriole-causal.ngrok-free.app/rest_api/") {
        this.url = url;
    }
    

    public getUsers(): void {
        
        fetch(this.url+"url her");
    }

    public async registerUser(nameArg: string, passwordArg: string, emailArg: string){
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

    public loginUser(name: string, password: string){
        fetch(this.url+"Login", {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                password: password
            })
        });
    }
}

export default new Server();