import { NavButton } from "@/types/types";

// ask jennifer about this export thing
export const navHomeButton: NavButton = {
  label: "Home",
  path: "/",
};

const navButtons: NavButton[] = [
  {
    label: "Pokemon",
    path: "/",
  },
  {
    label: "Moves",
    path: "/page1",
  },
  {
    label: "Types",
    path: "/page2",
  },
  {
    label: "Abilities",
    path: "/page2",
  },
  {
    label: "Moves",
    path: "/page2",
  },
  {
    label: "Map",
    path: "/page2",
  },
  {
    label: "My Team",
    path: "/page2",
  },
  {
    label: "Log In",
    path: "/page2",
  },
  {
    label: "Register",
    path: "/page2",
  },
];

export default navButtons;
