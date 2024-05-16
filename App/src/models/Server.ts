import { User, currentUser } from "./User";
import FormData from 'form-data';
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



  public async PutForm(
    gender: string,
    height: number,
    currentWeight: number,
    age: number,
    targetWeight: number,
    activityLevel : number,
    difficultyLevel : number,
    dailyWater :number 
  ): Promise<void> {
    const url = `${this.url}AppUser/FillOutForm?Gender=${gender}&Height=${height}&TargetWeight=${targetWeight}&Weight=${currentWeight}&activityLevel=${activityLevel}&difficultyLevel=${difficultyLevel}&DailyWater=${dailyWater}&age=${age}`;
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
        currentCalories: 0,
        dailyCalories: user.dailyCalories,
        dailyProtein: user.dailyProtein,
        currentProtein: 0,
        dailyCarbs: user.dailyCarbs,
        currentCarbs: 0,
        dailyFat: user.dailyFat,
        currentFat: 0,
        age: user.age,
        dailyWater: user.dailyWater,
        currentWater: 0,
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
				throw new Error(`putWater error ${e.status}`)
			});
	}

	public async fetchImage(id: string): Promise<string | null> {
    try {
      const imageUrl = `${this.url}Image/${id}`;
      const response = await fetch(imageUrl, {
        headers: {
          Authorization: 'Bearer ' + currentUser.token,
        }
      });
      if (!response.ok) {
        console.error(`Error fetching image. Status: ${response.status} ${response.statusText}`);
        return null;
      }
      const blob = await response.blob();
      console.log(`Blob size: ${blob.size}`);
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = (error) => {
          console.error("Error reading blob:", error);
          reject(error);
        };
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error fetching image:", (error as Error).message);
      console.error((error as Error).stack);
      return null;
    }
  }

  public async saveImage(imageUri: string) {
    const photo = {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'photo.jpg',
    };

    const formData = new FormData();
    formData.append('image', photo);

    try {
      const response = await fetch(`${this.url}Image`, {
        method: 'POST',
        body: formData as any,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: 'Bearer ' + currentUser.token,
        },
      });
      console.log('Response:', response);
      console.log('Response status:', response.status);
      console.log('Response text:', await response.text());
      if (!response.ok) {
        throw new Error(`Failed to upload image with status: ${response.status}`);
      }
    
        console.log('Success', 'Image uploaded successfully');
      } catch (error) {
        console.error('Error uploading image:', error);
        console.log('Error', `Failed to upload image`);
      }
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
