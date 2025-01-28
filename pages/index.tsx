import Layout from "../components/Layout";
import InfoCard from "../components/InfoCard";
import Searchbar from "../components/Searchbar";
import { useEffect, useState } from "react";
import { PokemonInfo } from "@/types/types";

const Index = () => {
  const [pokemon, setPokemon] = useState<PokemonInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data from the local API route
    const fetchPokemon = async () => {
      try {
        const response = await fetch("/api/pokemon");
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon");
        }

        const data: PokemonInfo = await response.json();
        setPokemon(data);
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
      {pokemon && <InfoCard pokemon={pokemon} />}
    </Layout>
  );
};

export default Index;
