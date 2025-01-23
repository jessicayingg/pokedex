import { NavButton } from "@/types/types";

type ButtonProps = {
  navButton: NavButton;
};

const Button = ({ navButton }: ButtonProps) => (
  <div className="NavButton">
    <a className="NavButton" href={navButton.path}>
      {navButton.label}
    </a>
  </div>
);

export default Button;
