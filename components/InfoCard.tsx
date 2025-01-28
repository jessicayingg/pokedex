import { PokemonInfo } from "@/types/types";

type PokemonProps = {
  pokemon: PokemonInfo;
};

const InfoCard = ({ pokemon }: PokemonProps) => (
  <div className="info-card">
    <p>
      Name: {pokemon.name} <span> ({pokemon.id}) </span>
    </p>
    <p> Type: add later </p>
  </div>
);

export default InfoCard;
