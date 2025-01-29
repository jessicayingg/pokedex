import Layout from "../components/Layout";
import InfoCard from "../components/InfoCard";
import Searchbar from "../components/Searchbar";
import { useEffect, useState } from "react";
import { PokemonInfo } from "@/types/types";
import DropdownPokemon from "../components/DropdownPokemon";

const Index = () => {
  const [pokemonList, setPokemonList] = useState<PokemonInfo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data from the local API route
    const fetchPokemon = async () => {
      try {
        const response = await fetch("/api/pokemon");
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon");
        }

        const data: PokemonInfo[] = await response.json();
        setPokemonList(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchPokemon();
  }, []);

  return (
    <Layout>
      Welcome to Pokedex! This is your homepage. This is what i passed into
      layout props.
      <Searchbar></Searchbar>
      {pokemonList.map((cur_pokemon) => (
        <InfoCard pokemon={cur_pokemon} />
      ))}
      {pokemonList.map((cur_pokemon) => (
        <DropdownPokemon pokemon={cur_pokemon}></DropdownPokemon>
      ))}
    </Layout>
  );
};

export default Index;
