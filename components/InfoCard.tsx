import { PokemonInfo } from "@/types/types";

type PokemonProps = {
  pokemon: PokemonInfo;
};

const InfoCard = ({ pokemon }: PokemonProps) => (
  <div className="info-card">
    <a>{pokemon.name}</a>
  </div>
);

export default InfoCard;
