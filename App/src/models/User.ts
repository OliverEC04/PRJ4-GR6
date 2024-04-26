import Server from "../models/Server";

export class User {
    public email: string;
    public fullName: string;
    public height: number = 0;
    public gender: string = "";
    public weight: number = 0;
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

    public update(user:User):void{
        this.fullName = user.fullName;
        this.gender = user.gender;
        this.weight = user.weight;
        this.calories = user.calories;
        this.proteins = user.proteins;
        this.carbs = user.carbs;
        this.fats = user.fats;
        this.water = user.water;
        this.token = user.token;
    }

    public addWater(liters: number): void {
        this.water += liters;

        // TODO: post added water to server ( server.PostWater(this.water) eller noget )
    }
}

export let currentUser: User = new User("", "");