export type NavButton = {
  label: string;
  path: string;
  extraClasses: string;
};

export type PokemonInfo = {
  name: string;
  id: string;
  types: string[];
  height: string;
  weight: string;
  image: string; // url of the image

  /*
  gen: string;
  desc: string;
  evolutions: string[];
  abilities: { name: string; description: string }[]; */
};
