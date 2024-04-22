export class User {
    public email: string;
    public fullName: string;
    public calories: number = 0;
    public proteins: number = 0;
    public carbs: number = 0;
    public fats: number = 0;
    public water: number = 0;
    public token: string = "";

    constructor(email: string, fullName: string) {
        this.email = email;
        this.fullName = fullName;
    }
}

export let currentUser: User;