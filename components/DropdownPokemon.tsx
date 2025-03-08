import { PokemonInfo } from "@/types/types";

type DropDownProps = {
  pokemon: PokemonInfo;
  onSelect: (query: string) => void;
};

function get_type(strList: any[]) {
  if (strList.length == 2 && strList[1].type.name === "normal") {
    return `${strList[1].type.name}-type`;
  } else {
    return `${strList[0].type.name}-type`;
  }
}

const DropdownPokemon = ({ pokemon, onSelect }: DropDownProps) => {
  const handleSelect = () => {
    onSelect(pokemon.name);
  };

  return (
    <button
      className={`dropdown ${get_type(pokemon.types)}`}
      onClick={handleSelect}
    >
      <img src={pokemon.image}></img>
      <div className="dropdown-pokemon-name-container">
        <p className="dropdown-pokemon-name">{pokemon.name}</p>
      </div>
    </button>
  );
};

export default DropdownPokemon;
