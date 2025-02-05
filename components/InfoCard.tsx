import { PokemonInfo } from "@/types/types";
import { capitalize } from "@/config/helper_functions";

type PokemonProps = {
  pokemon: PokemonInfo;
};

function display_types(strList: any[]) {
  if (strList.length == 2) {
    return (
      <p className="types-container">
        Types:
        <div className={`${strList[0].type.name}-type pokemon-type`}>
          {capitalize(strList[0].type.name)}
        </div>
        <div className={`${strList[1].type.name}-type pokemon-type`}>
          {capitalize(strList[1].type.name)}
        </div>
      </p>
    );
  } else if (strList.length == 1) {
    return (
      <p className="types-container">
        Type:
        <div className={`${strList[0].type.name}-type pokemon-type`}>
          {capitalize(strList[0].type.name)}
        </div>
      </p>
    );
  } else {
    return <p className="types-container">Type: No type found</p>;
  }
}

const InfoCard = ({ pokemon }: PokemonProps) => (
  <div className="info-card">
    <div>
      <div>
        <p>
          {pokemon.name}{" "}
          <span className="pokemon-number"> (No. {pokemon.id}) </span>
        </p>
      </div>
      <img src={pokemon.image}></img>
    </div>
    {display_types(pokemon.types)}
    <p> Height: {Number(pokemon.height) / 10} m </p>
    <p> Weight: {Number(pokemon.weight) / 10} kg </p>
  </div>
);

export default InfoCard;
