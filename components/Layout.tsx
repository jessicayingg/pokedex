import Header from "./Header";
import navButtons from "../config/buttons";

const Layout = (props: any) => (
  <div className="Layout">
    This dictates the layout of the pages. This is the baseline of content so
    each pages so far gets a header.
    <Header navButtons={navButtons} />
    <div className="Content">
      The stuff that gets passed into props will display here: {props.children}
    </div>
  </div>
);

export default Layout;
