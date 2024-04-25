import TabHeader from "../../components/TabHeader";
import { TabScreen } from "../../components/TabHeader";
import LoginPage from "./LoginPage";
import SignUpPage from "./SignUpPage";

export default function LoginNav() {
  return (
    <TabHeader
      screens={[
        new TabScreen("Log In", LoginPage),
        new TabScreen("Sign Up", SignUpPage),
      ]}
    />
  );
}
