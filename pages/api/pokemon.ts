import type { NextApiRequest, NextApiResponse } from "next";

type PokemonData = {
  id: number;
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PokemonData | { error: string }>
) {
  try {
    // Hardcoded example for now
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
    if (!response.ok) {
      throw new Error("Failed to fetch Pokémon");
    }

    const data = await response.json();
    const result: PokemonData = {
      id: data.id,
      name: data.name,
    };

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
}
