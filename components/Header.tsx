import { NavButton } from "@/types/types";
import Button from "./Button";

type HeaderProps = {
  navButtons: NavButton[];
};

const Header = ({ navButtons }: HeaderProps) => (
  <div className="NavBar">
    <div className="Logo">
      <button className="logo-button">
        <img className="logo-icon" src="images/pokeball.png"></img>
      </button>
    </div>
    <div></div>
    <div className="NavBar-buttons">
      {navButtons.map((button) => (
        <Button key={button.label} navButton={button} />
      ))}
    </div>
  </div>
);

export default Header;
