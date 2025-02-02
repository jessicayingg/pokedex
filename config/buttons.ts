import { NavButton } from "@/types/types";

// ask jennifer about this export thing
export const navHomeButton: NavButton = {
  label: "Home",
  path: "/",
  extraClasses: "",
};

const navButtons: NavButton[] = [
  {
    label: "Pokemon",
    path: "/",
    extraClasses: "",
  },
  {
    label: "Moves",
    path: "/page1",
    extraClasses: "",
  },
  {
    label: "Types",
    path: "/page2",
    extraClasses: "",
  },
  {
    label: "Abilities",
    path: "/page2",
    extraClasses: "",
  },
  {
    label: "Moves",
    path: "/page2",
    extraClasses: "",
  },
  {
    label: "Map",
    path: "/page2",
    extraClasses: "",
  },
  {
    label: "My Team",
    path: "/page2",
    extraClasses: "",
  },
  {
    label: "Log In",
    path: "/page2",
    extraClasses: "log-in-button",
  },
  {
    label: "Register",
    path: "/page2",
    extraClasses: "register-button",
  },
];

export default navButtons;
