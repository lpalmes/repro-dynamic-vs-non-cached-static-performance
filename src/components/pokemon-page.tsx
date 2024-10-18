import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Pokemon {
  id: number;
  name: string;
  types: { type: { name: string } }[];
  sprites: { front_default: string };
}

async function fetchPokemons(): Promise<Array<Pokemon>> {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
  const data = await response.json();
  const results = await Promise.all(
    data.results.map((pokemon: { url: string }) => {
      return fetch(pokemon.url).then((res) => res.json());
    })
  );

  return results;
}

export async function PokemonPage() {
  const pokemon = await fetchPokemons();

  const typeColors: { [key: string]: string } = {
    normal: "bg-gray-400",
    fire: "bg-red-500",
    water: "bg-blue-500",
    electric: "bg-yellow-400",
    grass: "bg-green-500",
    ice: "bg-blue-200",
    fighting: "bg-red-700",
    poison: "bg-purple-500",
    ground: "bg-yellow-600",
    flying: "bg-indigo-400",
    psychic: "bg-pink-500",
    bug: "bg-green-400",
    rock: "bg-yellow-700",
    ghost: "bg-purple-700",
    dragon: "bg-indigo-700",
    dark: "bg-gray-700",
    steel: "bg-gray-400",
    fairy: "bg-pink-300",
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Pokémon List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemon.map((poke) => (
          <Card key={poke.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <img
                src={poke.sprites.front_default}
                alt={poke.name}
                className="w-full h-48 object-contain bg-gray-100"
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg mb-2 capitalize">
                {poke.name}
              </CardTitle>
              <div className="flex flex-wrap gap-2">
                {poke.types.map((type) => (
                  <Badge
                    key={type.type.name}
                    className={`${typeColors[type.type.name]} text-white`}
                  >
                    {type.type.name}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
