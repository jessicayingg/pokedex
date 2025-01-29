import { PokemonInfo } from "@/types/types";

type PokemonProps = {
  pokemon: PokemonInfo;
};

const DropdownPokemon = ({ pokemon }: PokemonProps) => (
  <div className="dropdown">
    <img src={pokemon.image}></img>
    <p>{pokemon.name}</p>
  </div>
);

export default DropdownPokemon;
