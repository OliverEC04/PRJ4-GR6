class Server {
    private url: string;

    constructor(url: string = "https://brief-oriole-causal.ngrok-free.app/rest_api/api") {
        this.url = url;
    }
    

    public getUsers(): void {
        
        fetch(this.url+"url her");
    }

    public async registerUser(nameArg: string, passwordArg: string, emailArg: string){
        try {
            console.log("fetching... ");
            await fetch(this.url+"/Account/Register", {
                method: 'POST',
                body: JSON.stringify({
                    fullName: nameArg,
                    password: passwordArg,
                    email: emailArg
                })
            });
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