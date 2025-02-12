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

  // DPad button controls
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

  const getMiniPokemon = (num: Number) => {
    if (num == -1 && pokemonList.length > 0 && curPokemonIndex != 0) {
      return pokemonList[curPokemonIndex - 1].image;
    } else if (num == 0 && pokemonList.length > 0) {
      return pokemonList[curPokemonIndex].image;
    } else if (
      num == 1 &&
      pokemonList.length > 0 &&
      curPokemonIndex < pokemonList.length - 1
    ) {
      return pokemonList[curPokemonIndex + 1].image;
    } else {
      return undefined;
    }
  };

  return (
    <Layout>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      ></link>

      <div className="pokedex">
        <div className="pokedex-left">
          <div className="info-card-container">
            {pokemonList.length > 0 && (
              <InfoCard pokemon={pokemonList[curPokemonIndex]} />
            )}
            {pokemonList.length == 0 && <div className="info-card" />}
          </div>
          <div className="info-card-controls">
            <button>
              <span className="star-button fa fa-star checked"></span>
            </button>
            <div className="mini-display">
              <img
                className="mini-pokemon side-mini"
                src={getMiniPokemon(-1)}
              ></img>
              <img className="mini-pokemon" src={getMiniPokemon(0)}></img>
              <img
                className="mini-pokemon side-mini"
                src={getMiniPokemon(1)}
              ></img>
            </div>
            <DPad
              nextPokemon={handleNextPokemon}
              prevPokemon={handlePrevPokemon}
            ></DPad>
          </div>
        </div>
        <div className="pokedex-right">
          <Searchbar
            onSearch={(query) => setSearchQuery(query)}
            onDropDownSelect={(query) => setSearchQuery(query)}
          ></Searchbar>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
