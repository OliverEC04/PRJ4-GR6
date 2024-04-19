import TabHeader from "../../components/TabHeader";
import { TabScreen } from "../../components/TabHeader";
import Scan from "./Scan";
import Enter from "./Enter";


export default function AddFood()
{
    return (
        <TabHeader screens={[
            new TabScreen("Scan", Scan),
            new TabScreen("Enter", Enter)
        ]}/>
    );
}
