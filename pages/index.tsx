import Layout from "../components/Layout";
import InfoCard from "../components/InfoCard";
import Searchbar from "../components/Searchbar";
import { useEffect, useState } from "react";
import { PokemonInfo } from "@/types/types";

const Index = () => {
  const [pokemonList, setPokemonList] = useState<PokemonInfo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  useEffect(() => {
    // Fetch data from the local API route
    const fetchPokemon = async () => {
      if (!searchQuery) {
        return; // Don't run on first render
      }

      try {
        const response = await fetch(
          `/api/pokemon_autocomplete?query=${searchQuery}`
        );
        // the ?query=lksajdflkj is so that I can pass the query to pokemon.ts
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
  }, [searchQuery]);

  return (
    <Layout>
      <div className="pokedex">
        <div className="pokedex-left">
          <div className="info-card-container">
            {pokemonList.map((cur_pokemon) => (
              <InfoCard pokemon={cur_pokemon} />
            ))}
          </div>
          <button>Back</button>
          <button>Next</button>
        </div>
        <div className="pokedex-right">
          <Searchbar onSearch={(query) => setSearchQuery(query)}></Searchbar>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
