import Layout from "../components/Layout";
import InfoCard from "../components/InfoCard";
import Searchbar from "../components/Searchbar";
import DPad from "../components/DPad";
import { useEffect, useState } from "react";
import { PokemonInfo } from "@/types/types";

const Index = () => {
  const [pokemonList, setPokemonList] = useState<PokemonInfo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const [curPokemonIndex, setCurPokemonIndex] = useState(0); // Track the current index of the pokemon displayed

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

  const handleNextPokemon = () => {
    if (pokemonList.length > 0) {
      if (curPokemonIndex != pokemonList.length - 1) {
        setCurPokemonIndex(curPokemonIndex + 1);
      } else {
        setCurPokemonIndex(0);
      }
    }
  };

  const handlePrevPokemon = () => {
    if (pokemonList.length > 0) {
      if (curPokemonIndex != 0) {
        setCurPokemonIndex(curPokemonIndex - 1);
      } else {
        setCurPokemonIndex(pokemonList.length - 1);
      }
    }
  };

  return (
    <Layout>
      <div className="pokedex">
        <div className="pokedex-left">
          <div className="info-card-container">
            {pokemonList.length > 0 && (
              <InfoCard pokemon={pokemonList[curPokemonIndex]} />
            )}
            {pokemonList.length == 0 && <div className="info-card" />}
          </div>
          <div className="info-card-controls">
            <button></button>
            <button></button>
            <DPad
              nextPokemon={handleNextPokemon}
              prevPokemon={handlePrevPokemon}
            ></DPad>
          </div>
        </div>
        <div className="pokedex-right">
          <Searchbar onSearch={(query) => setSearchQuery(query)}></Searchbar>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
