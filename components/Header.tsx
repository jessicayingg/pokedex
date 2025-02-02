import { NavButton } from "@/types/types";
import Button from "./Button";
import { useRouter } from "next/router";

type HeaderProps = {
  navButtons: NavButton[];
};

const Header = ({ navButtons }: HeaderProps) => {
  const router = useRouter();
  const curPage = router.pathname;

  return (
    <div className="NavBar">
      <div className="Logo">
        <a className="logo-button" href="/">
          <img className="logo-icon" src="images/pokeball.png"></img>
        </a>
      </div>
      <div></div>
      <div className="NavBar-buttons">
        {navButtons.map((button) => (
          <Button key={button.label} navButton={button} activePage={curPage} />
        ))}
      </div>
    </div>
  );
};

export default Header;
