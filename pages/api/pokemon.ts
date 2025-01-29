import type { NextApiRequest, NextApiResponse } from "next";
import { capitalize } from "@/config/helper_functions";

type PokemonData = {
  id: number;
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PokemonData[] | { error: string }>
) {
  try {
    // Hardcoded example for now
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    if (!response.ok) {
      throw new Error("Failed to fetch Pokémon");
    }

    const data = await response.json();

    const results = await Promise.all(
      data.results.map(async (pokemon: { name: string; url: string }) => {
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

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
