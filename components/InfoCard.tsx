import { PokemonInfo } from "@/types/types";

type PokemonProps = {
  pokemon: PokemonInfo;
};

const InfoCard = ({ pokemon }: PokemonProps) => (
  <div className="info-card">
    <h1>
      Name: {pokemon.name} <span> ({pokemon.number}) </span>
    </h1>
    <h1> Type: {pokemon.type[0]} </h1>
  </div>
);

export default InfoCard;
