export class User {
    public email: string;
    public fullName: string;
    public height: number = 0;
    public gender: string = "";
    public currentWeight: number = 0;
    public targetWeight: number = 0;
    public activityLevel: number = 0;
    public difficultyLevel: number = 0;
    public currentCalories: number = 0;
    public dailyCalories: number = 0;
    public currentProtein: number = 0;
    public dailyProtein: number = 0;
    public currentCarbs: number = 0;
    public dailyCarbs: number = 0;
    public currentFat: number = 0;
    public dailyFat: number = 0;
    public age: number = 0;
    public currentWater: number = 0;
    public dailyWater: number = 0;
    public token: string = "";

    constructor(email: string, fullName: string) {
        this.email = email;
        this.fullName = fullName;
    }

    public update(user: User): void {
        this.email = user.email;
        this.fullName = user.fullName;
        this.height = user.height;
        this.gender = user.gender;
        this.currentWeight = user.currentWeight;
        this.targetWeight = user.targetWeight;
        this.activityLevel = user.activityLevel;
        this.difficultyLevel = user.difficultyLevel;
        this.currentCalories = user.currentCalories;
        this.dailyCalories = user.dailyCalories;
        this.currentProtein = user.currentProtein;
        this.dailyProtein = user.dailyProtein;
        this.currentCarbs = user.currentCalories;
        this.dailyCarbs = user.dailyCarbs;
        this.currentFat = user.currentFat;
        this.dailyFat = user.dailyFat;
        this.age = user.age;
        this.currentWater = user.currentWater;
        this.dailyWater = user.dailyWater;

        if (user.token != undefined && user.token != "")
            this.token = user.token;
    }

    public addWater(liters: number): void {
        this.currentWater += liters;
    }
}

export const currentUser: User = new User("", "");
