import { PokemonInfo } from "@/types/types";

type DropDownProps = {
  pokemon: PokemonInfo;
  onSelect: (query: string) => void;
};

const DropdownPokemon = ({ pokemon, onSelect }: DropDownProps) => {
  const handleSelect = () => {
    onSelect(pokemon.name);
  };

  return (
    <button className="dropdown" onClick={handleSelect}>
      <img src={pokemon.image}></img>
      <p>{pokemon.name}</p>
    </button>
  );
};

export default DropdownPokemon;
