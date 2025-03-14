import Header from "./Header";
import {
  navButtonsLoggedOut,
  navHomeButton,
  navButtonsLoggedIn,
} from "../config/buttons";

const Layout = (props: any) => (
  <div className="Layout">
    <Header
      navButtons={navButtonsLoggedIn}
      loggedIn={true}
      loggedInName={"Jessica"}
    />
    <div className="Content">{props.children}</div>
  </div>
);

export default Layout;
