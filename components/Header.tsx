import { NavButton } from "@/types/types";
import Button from "./Button";

type HeaderProps = {
  navButtons: NavButton[];
  logoButton: NavButton;
};

const Header = ({ navButtons, logoButton }: HeaderProps) => (
  <div className="NavBar">
    <div className="Logo">
      <Button key={logoButton.label} navButton={logoButton} />
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
