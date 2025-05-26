import type { NextApiRequest, NextApiResponse } from "next";
import { capitalize } from "@/config/helper_functions";

type PokemonData = {
  id: number;
  name: string;
};

// API handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PokemonData[] | { error: string }>
  // responsds with either list of pokemon or an error object
) {
  //const { query } = req.query; // Get query from request
  const query = req.query.query as string;

  try {
    // Fetch all pokemon from pokeapi
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
    );
    // error
    if (!response.ok) {
      throw new Error("Failed to fetch Pokémon");
    }
    // get json from fetched data
    const data = await response.json();

    const filteredResults = data.results
      // Filter by the query typed
      .filter((pokemon: { name: string }) =>
        pokemon.name.toLowerCase().startsWith(query.toLowerCase())
      )
      // Filter out the special pokemon forms (i.e pokemon with id higher than 10000)
      .filter((pokemon: { url: string }) => {
        const id = Number(pokemon.url.split("/").slice(-2, -1)[0]);
        return id < 10000;
      });

    const results = await Promise.all(
      filteredResults.map(async (pokemon: { name: string; url: string }) => {
        // pokeapi.co returns urls that lead to their other api calls for each pokemon, so I need the url
        const pokemonResponse = await fetch(pokemon.url);
        const pokemonData = await pokemonResponse.json();

        pokemonData.name = capitalize(pokemonData.name);
        return {
          id: pokemonData.id,
          name: pokemonData.name,
          types: pokemonData.types,
          height: pokemonData.height,
          weight: pokemonData.weight,
          image: pokemonData.sprites.front_default,
        };
      })
    );

    /* for just a singular pokemon (not a list)
    const result: PokemonData = {
      id: data.id,
      name: data.name,
    }; */

    // Success! Return results (list) and 200 status
    res.status(200).json(results);
  } catch (error) {
    // Error, return error object and 500 status
    res.status(500).json({ error: (error as Error).message });
  }
}
