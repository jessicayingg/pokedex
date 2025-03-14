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

  const putButtons = () => {
    if (loggedIn) {
      return (
        <div className="nav-buttons">
          {navButtons.map((button) => (
            <Button
              key={button.label}
              navButton={button}
              activePage={curPage}
            />
          ))}
          <button className="NavButton profile-button">{loggedInName}</button>
          <button className="NavButton log-in-button">Log out</button>
        </div>
      );
    } else {
      return (
        <div className="nav-buttons">
          {navButtons.map((button) => (
            <Button
              key={button.label}
              navButton={button}
              activePage={curPage}
            />
          ))}
        </div>
      );
    }
  };

  return (
    <div className="NavBar">
      <div className="Logo">
        <a className="logo-button" href="/">
          <img className="logo-icon" src="images/pokeball.png"></img>
        </a>
      </div>
      {putButtons()}
    </div>
  );
};

export default Header;
