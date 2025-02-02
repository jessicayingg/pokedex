import { NavButton } from "@/types/types";

type ButtonProps = {
  navButton: NavButton;
  activePage: string;
};

const Button = ({ navButton, activePage }: ButtonProps) => {
  const extraClass = activePage == navButton.path ? "cur-page-navbutton" : "";

  return (
    <div className={`NavButton ${navButton.extraClasses} ${extraClass}`}>
      <a
        className={`NavButton-text ${navButton.extraClasses}-text`}
        href={navButton.path}
      >
        {navButton.label}
      </a>
    </div>
  );
};

export default Button;
