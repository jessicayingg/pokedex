import { PokemonInfo } from "@/types/types";
import { capitalize } from "@/config/helper_functions";

type PokemonProps = {
  pokemon: PokemonInfo;
};

function display_pokemon({ pokemon }: PokemonProps) {
  if (pokemon.types.length == 2 && pokemon.types[0].type.name === "normal") {
    return (
      <div className={`${pokemon.types[1].type.name}-type-darker info-card`}>
        <div className={`${pokemon.types[1].type.name}-type info-card-colour`}>
          <div className="pokemon-name-container">
            <p>
              {pokemon.name}{" "}
              <span className="pokemon-number"> (No. {pokemon.id}) </span>
            </p>
          </div>
          <div className="pokemon-img-container">
            <img src={pokemon.image}></img>
          </div>
          <div className="pokemon-types-container">
            {display_types(pokemon.types)}
          </div>
          <div className="pokemon-height-container">
            <p> Height: {Number(pokemon.height) / 10} m </p>
          </div>
          <div className="pokemon-weight-container">
            <p> Weight: {Number(pokemon.weight) / 10} kg </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className={`${pokemon.types[0].type.name}-type-darker info-card`}>
        <div className={`${pokemon.types[0].type.name}-type info-card-colour`}>
          <div className="pokemon-name-container">
            <div className="pokemon-name">
              {pokemon.name}
              <span className="pokemon-number"> (No. {pokemon.id}) </span>
            </div>
          </div>
          <div className="pokemon-img-container">
            <img src={pokemon.image}></img>
          </div>
          <div className="pokemon-types-container">
            {display_types(pokemon.types)}
          </div>
          <div className="height-weight-container">
            <div className="pokemon-height-container">
              <p> Height: {Number(pokemon.height) / 10} m </p>
            </div>
            <div className="pokemon-weight-container">
              <p> Weight: {Number(pokemon.weight) / 10} kg </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function display_types(strList: any[]) {
  if (strList.length == 2) {
    return (
      <p className="types-container">
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
        <div className={`${strList[0].type.name}-type pokemon-type`}>
          {capitalize(strList[0].type.name)}
        </div>
      </p>
    );
  } else {
    return <p className="types-container">Type: No type found</p>;
  }
}

const InfoCard = ({ pokemon }: PokemonProps) => display_pokemon({ pokemon });

export default InfoCard;
