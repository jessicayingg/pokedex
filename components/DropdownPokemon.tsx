import { PokemonInfo } from "@/types/types";

type PokemonProps = {
  pokemon: PokemonInfo;
};

const DropdownPokemon = ({ pokemon }: PokemonProps) => (
  <button className="dropdown">
    <img src={pokemon.image}></img>
    <p>{pokemon.name}</p>
  </button>
);

export default DropdownPokemon;
