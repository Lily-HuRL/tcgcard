
export default function CardGrid({ pokemons }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {pokemons.map(pokemon => (
        <div key={pokemon.id} className="border p-4 rounded-md text-center shadow-md">
          <img 
            src={pokemon.image} 
            alt={pokemon.name} 
            className="w-24 h-24 mx-auto mb-4"
          />
          <h3 className="text-xl font-semibold">{pokemon.name}</h3>
          <p className="text-sm text-gray-500">Types: {pokemon.types.join(', ')}</p>
        </div>
      ))}
    </div>
  );
}
