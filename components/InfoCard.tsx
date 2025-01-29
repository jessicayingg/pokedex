import { PokemonInfo } from "@/types/types";
import { capitalize } from "@/config/helper_functions";

type PokemonProps = {
  pokemon: PokemonInfo;
};

function display_types(strList: any[]) {
  if (strList.length == 2) {
    return (
      capitalize(strList[0].type.name) + ", " + capitalize(strList[1].type.name)
    );
  } else {
    return strList[0].type.name;
  }
}

const InfoCard = ({ pokemon }: PokemonProps) => (
  <div className="info-card">
    <img src={pokemon.image}></img>
    <p>
      Name: {pokemon.name} <span> (No. {pokemon.id}) </span>
    </p>
    <p> Type: {display_types(pokemon.types)} </p>
    <p> Height: {Number(pokemon.height) / 10} m </p>
    <p> Weight: {Number(pokemon.weight) / 10} kg </p>
  </div>
);

export default InfoCard;
