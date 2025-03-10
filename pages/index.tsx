import Layout from "../components/Layout";
import InfoCard from "../components/InfoCard";
import Searchbar from "../components/Searchbar";
import DPad from "../components/DPad";
import { useEffect, useState } from "react";
import { PokemonInfo } from "@/types/types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";

const Index = () => {
  const [pokemonList, setPokemonList] = useState<PokemonInfo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const [curPokemonIndex, setCurPokemonIndex] = useState(0); // Track the current index of the pokemon displayed

  const [isFavourite, setIsFavourite] = useState(false);

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

  const toggleFavourite = () => {
    setIsFavourite((prev) => !prev);
  };

  return (
    <Layout>
      <div className="pokedex">
        <div className="pokedex-left">
          <div className="circle"></div>
          <div className="info-card-container">
            {pokemonList.length > 0 && (
              <InfoCard pokemon={pokemonList[curPokemonIndex]} />
            )}
            {pokemonList.length == 0 && <div className="info-card" />}
          </div>
          <div className="info-card-controls">
            <button className="star-button" onClick={toggleFavourite}>
              {/* regularStar for regular, solidStar for solid*/}
              <FontAwesomeIcon icon={isFavourite ? solidStar : regularStar} />
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
          <div className="pokedex-right-empty"></div>
          <div className="pokedex-right-top">
            <div className="pokedex-right-rect"></div>
            <div className="pokedex-right-triangle"></div>
          </div>
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
