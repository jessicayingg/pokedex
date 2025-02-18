import { useEffect, useState } from "react";
import { PokemonInfo } from "@/types/types";
import DropdownPokemon from "../components/DropdownPokemon";

type SearchbarProps = {
  onSearch: (query: string) => void;
  onDropDownSelect: (query: string) => void;
};

const Searchbar = ({ onSearch, onDropDownSelect }: SearchbarProps) => {
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [dropDownPokemonList, setDropDownPokemonList] = useState<PokemonInfo[]>(
    []
  );
  const [typingSearch, setTypingSearch] = useState<string | null>(null);

  useEffect(() => {
    if (!typingSearch) {
      setDropDownPokemonList([]);
      return; // Don't run on first render
    }

    // Fetch data from the local API route
    const fetchPokemon = async () => {
      try {
        const response = await fetch(
          `/api/pokemon_autocomplete?query=${typingSearch}`
        );
        // the ?query=lksajdflkj is so that I can pass the query to pokemon.ts
        if (!response.ok) {
          throw new Error("Failed to fetch Pokémon");
        }

        const data: PokemonInfo[] = await response.json();
        setDropDownPokemonList(data);
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchPokemon();
  }, [typingSearch]);

  const handleSearch = () => {
    if (userInput.trim()) {
      onSearch(userInput); // Pass the user input back to the parent
    }
    // Also reset the pokemon input list to empty
    setDropDownPokemonList([]);
  };

  return (
    <div className="searchbar">
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          placeholder="Find a pokemon"
          value={userInput}
          onChange={(e) => {
            setTypingSearch(e.target.value);
            setUserInput(e.target.value);
          }}
        ></input>
        <button className="search-button" onClick={handleSearch}>
          <img className="search-icon" src="images/search_button_icon.png" />
        </button>
      </div>
      <div className="dropdown-container">
        {dropDownPokemonList.map((cur_pokemon) => (
          <DropdownPokemon
            pokemon={cur_pokemon}
            onSelect={onDropDownSelect}
          ></DropdownPokemon>
        ))}
      </div>
    </div>
  );
};

export default Searchbar;
