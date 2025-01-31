import Header from "./Header";
import navButtons, { navHomeButton } from "../config/buttons";

const Layout = (props: any) => (
  <div className="Layout">
    <Header navButtons={navButtons} />
    <div className="Content">{props.children}</div>
  </div>
);

export default Layout;
