import { PokemonInfo } from "@/types/types";

type PokemonProps = {
  pokemon: PokemonInfo;
};

const InfoCard = ({ pokemon }: PokemonProps) => (
  <div className="info-card">
    <p>
      Name: {pokemon.name} <span> ({pokemon.number}) </span>
    </p>
    <p> Type: {pokemon.type[0]} </p>
  </div>
);

export default InfoCard;
