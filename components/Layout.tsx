import Header from "./Header";
import navButtons, { navHomeButton } from "../config/buttons";

const Layout = (props: any) => (
  <div className="Layout">
    <Header navButtons={navButtons} />
    <div className="Content">
      The stuff that gets passed into props will display here: {props.children}
    </div>
  </div>
);

export default Layout;
