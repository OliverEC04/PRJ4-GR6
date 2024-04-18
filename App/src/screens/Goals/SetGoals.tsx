import { View, Text } from "react-native";
import TextField from "../../components/NumberInput";
import GoalWeight from "../../components/GoalWeight";

export default function SetGoals() {
  return (
    <View>
      <GoalWeight />
      <TextField placeholder="Enter your current weight" />
      <TextField placeholder="Enter your target weight" />
    </View>
  );
}
