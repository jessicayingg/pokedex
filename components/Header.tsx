import { NavButton } from "@/types/types";
import Button from "./Button";
import { useRouter } from "next/router";

type HeaderProps = {
  navButtons: NavButton[];
  loggedIn: boolean;
  loggedInName: String;
};

const Header = ({ navButtons, loggedIn, loggedInName }: HeaderProps) => {
  const router = useRouter();
  const curPage = router.pathname;

  const profileButton = (name: String) => {
    if (loggedIn) {
      return <button className="NavButton profile-button">{name}</button>;
    }
  };

  return (
    <div className="NavBar">
      <div className="Logo">
        <a className="logo-button" href="/">
          <img className="logo-icon" src="images/pokeball.png"></img>
        </a>
      </div>
      <div className="nav-buttons">
        {navButtons.map((button) => (
          <Button key={button.label} navButton={button} activePage={curPage} />
        ))}
        {profileButton(loggedInName)}
      </div>
    </div>
  );
};

export default Header;
