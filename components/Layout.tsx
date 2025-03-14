import Header from "./Header";
import {
  navButtonsLoggedOut,
  navHomeButton,
  navButtonsLoggedIn,
} from "../config/buttons";
import { useSession, signOut } from "next-auth/react";

const Layout = (props: any) => {
  const { data: session, status } = useSession();

  const loggedIn = !!session;
  const loggedInName = session?.user?.name || "Guest";

  console.log(loggedIn);

  return (
    <div className="Layout">
      <Header
        navButtons={loggedIn ? navButtonsLoggedIn : navButtonsLoggedOut}
        loggedIn={loggedIn}
        loggedInName={loggedInName}
      />
      <div className="Content">{props.children}</div>
    </div>
  );
};

export default Layout;
