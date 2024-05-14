import { User, currentUser } from "./User";
// import AsyncStorage from '@react-native-async-storage/async-storage';

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
  public async putInfoPage(
    height: number,
    gender: string,
    currentWeight: number,
    age: number
  ): Promise<void> {
    const url = `${this.url}AppUser/UpdateInfo?Gender=${gender}&Age=${age}&Height=${height}&CurrentWeight=${currentWeight}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + currentUser.token,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to update profile with status: ${response.status}`
        );
      }
      console.log("Success", "Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      console.log("Error", `Failed to update profile`);
    }
  }

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

  public async putUser(user: User) {
    fetch(`${this.url}AppUser/me`, {
      method: "PUT",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + currentUser.token,
      },
      body: JSON.stringify({
        email: user.email,
        fullName: user.fullName,
        height: user.height,
        gender: user.gender,
        currentWeight: user.height,
        targetWeight: user.targetWeight,
        activityLevel: user.activityLevel,
        difficultyLevel: user.difficultyLevel,
        currentCalories: user.currentCalories,
        dailyCalories: user.dailyCalories,
        dailyProtein: user.dailyProtein,
        currentProtein: user.currentProtein,
        dailyCarbs: user.dailyCarbs,
        currentCarbs: user.currentCarbs,
        dailyFat: user.dailyFat,
        currentFat: user.currentFat,
        age: user.age,
        dailyWater: user.dailyWater,
        currentWater: user.currentWater,
      }),
    })
      .then((r) => {
        return r;
      })
      .catch((e) => {
        console.warn(e);
        throw new Error(`putUser error ${e.status}`);
      });
  }

  public async putWater(liters: number) {
    fetch(`${this.url}AppUser/updateDailyIntake?water=${liters}`, {
      method: "PUT",
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + currentUser.token,
      },
    })
      .then((r) => {
        return r;
      })
      .catch((e) => {
        console.warn(e);
        throw new Error(`putWater error ${e.status}`);
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
    } catch (error) {
      console.error("Error logging in:", error);
    }
  }
}

export default new Server();
