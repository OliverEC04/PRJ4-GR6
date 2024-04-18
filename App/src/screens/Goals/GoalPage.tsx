import TabHeader from "../../components/TabHeader";
import { TabScreen } from "../../components/TabHeader";
import Achievements from "./Achievements";
import SetGoals from "./SetGoals";

export default function Goals() {
  return (
    <TabHeader
      screens={[
        new TabScreen("Goals", SetGoals),
        new TabScreen("Achievements", Achievements),
      ]}
    />
  );
}
