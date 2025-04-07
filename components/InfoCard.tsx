import { PokemonInfo } from "@/types/types";
import { capitalize } from "@/config/helper_functions";

type PokemonProps = {
  pokemon: PokemonInfo;
};

function display_pokemon({ pokemon }: PokemonProps) {
  if (pokemon.types.length == 2 && pokemon.types[0].type.name === "normal") {
    return (
      <div
        className={`${pokemon.types[1].type.name}-type-darker info-card-colour-darker`}
      >
        <div className={`${pokemon.types[1].type.name}-type info-card-colour`}>
          <div className="pokemon-basic-info">
            <div className="pokemon-name-container">
              <div className="pokemon-name">{pokemon.name}</div>
              <div className="pokemon-number"> (No. {pokemon.id}) </div>
              {display_types(pokemon.types)}
            </div>
            <div className="pokemon-img-container">
              <img src={pokemon.image}></img>
            </div>
          </div>
          <div className="height-weight-container">
            <p className="pokemon-height-weight">
              Height: {Number(pokemon.height) / 10} m
            </p>
            <p className="pokemon-height-weight">
              Weight: {Number(pokemon.weight) / 10} kg
            </p>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className={`${pokemon.types[0].type.name}-type-darker info-card-colour-darker`}
      >
        <div className={`${pokemon.types[0].type.name}-type info-card-colour`}>
          <div className="pokemon-basic-info">
            <div className="pokemon-name-container">
              <div className="pokemon-name">{pokemon.name}</div>
              <div className="pokemon-number"> (No. {pokemon.id}) </div>
              {display_types(pokemon.types)}
            </div>
            <div className="pokemon-img-container">
              <img src={pokemon.image}></img>
            </div>
          </div>
          <div className="height-weight-container">
            <p className="pokemon-height-weight">
              Height: {Number(pokemon.height) / 10} m
            </p>
            <p className="pokemon-height-weight">
              Weight: {Number(pokemon.weight) / 10} kg
            </p>
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

const InfoCard = ({ pokemon }: PokemonProps) => (
  <div className="info-card">{display_pokemon({ pokemon })}</div>
);

export default InfoCard;
