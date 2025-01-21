import { NavButton } from "@/types/types";
import Button from "./Button";

type HeaderProps = {
  navButtons: NavButton[];
};

const Header = ({ navButtons }: HeaderProps) => (
  <div className="NavBar">
    {navButtons.map((button) => (
      <Button key={button.label} navButton={button} />
    ))}
  </div>
);

export default Header;
