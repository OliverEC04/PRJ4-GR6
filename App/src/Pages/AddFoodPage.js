import React from "react";
import { useState } from "react";

export default function AddFoodPage() {

    const [foodName, setFoodName] = useState("");
    const [calories, setCalories] = useState("");
    const [protein, setProtein] = useState("");
    const [carbs, setCarbs] = useState("");
    const [fat, setFat] = useState("");
    
    const handleSubmit = (event) => {
    event.preventDefault();
    
    const numCalories = Number(calories);
    const numProtein = Number(protein);
    const numCarbs = Number(carbs);
    const numFat = Number(fat);

    if(!foodName.trim()){
        alert("Please enter a food name");
        return;
    }

    if(numCalories < 1 || numProtein < 1 || numCarbs < 1 || numFat < 1){
        alert("Please enter a valid number for each field");
        return;
    }

    console.log({ foodName, numCalories, numProtein, numCarbs, numFat })
  }

  return (
    <div>
      <h1>Add Food Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
            Food Name:
            <input type="text" name="foodName" value={foodName} onChange={(e) => setFoodName(e.target.value)} />
        </label>
        <label>
            Calories:
            <input type="number" name="calories" min="1" step="1" value={calories} onChange={(e) => setCalories(e.target.value)}/>
        </label>
        <label>
            Protein (g):
            <input type="number" name="protein" min="1" step="1" value={protein} onChange={(e) => setProtein(e.target.value)}/>
        </label>
        <label>
            Carbs (g):
            <input type="number" name="carbs" min="1" step="1" value={carbs} onChange={(e) => setCarbs(e.target.value)}/>
        </label>
        <label>
            Fat (g):
            <input type="number" name="fat" min="1" step="1" value={fat} onChange={(e) => setFat(e.target.value)}/>
        </label>
        <button type="submit">Enter</button>
     </form>
    </div>
  );

}


