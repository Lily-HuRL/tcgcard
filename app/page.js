"use client";
import { useState, useEffect } from 'react';
import CardGrid from './card-grid';
import FilterBar from './filter';

export default function Home() {
  const [pokemons, setPokemons] = useState([]);
  const [searchResults, setSearchResults] = useState([]); 
  const [filteredPokemons, setFilteredPokemons] = useState([]); 
  const [query, setQuery] = useState(''); 
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [loading, setLoading] = useState(true); 
  const [hasSearched, setHasSearched] = useState(false); 
 
  useEffect(() => {
    async function fetchTypes() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/type/');
        const data = await response.json();
        setTypes(data.results); 
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    }

    fetchTypes();
  }, []);

 
  useEffect(() => {
    async function fetchAllPokemons() {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000'); 
        const data = await response.json();
        const detailedPokemons = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const pokemonData = await res.json();
            return {
              name: pokemonData.name,
              id: pokemonData.id,
              image: pokemonData.sprites.front_default,
              types: pokemonData.types.map(type => type.type.name),
            };
          })
        );
        setPokemons(detailedPokemons);
        setFilteredPokemons(detailedPokemons); 
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching pokemons:', error);
      }
    }

    fetchAllPokemons();
  }, []);

  
  const handleSearch = () => {
    setHasSearched(true); 
    if (!query) {
      setSearchResults([]); 
    } else {
      const results = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results); 
    }
  };

  
  const handleTypeFilter = (type) => {
    setSelectedType(type);
    if (type) {
      const results = pokemons.filter(pokemon =>
        pokemon.types.includes(type)
      );
      setFilteredPokemons(results); 
    } else {
      setFilteredPokemons(pokemons); 
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-10 text-center">Pokémon List</h1>

     
      <div className="mb-6">
        <FilterBar 
          query={query} 
          onFilter={(e) => setQuery(e.target.value)} 
          placeholder="Search by Pokémon name" 
        />
        <button 
          onClick={handleSearch} 
          className="mt-2 p-2 bg-blue-500 active:bg-sky-700 text-white rounded-md w-full"
        >
          Search
        </button>

       
        <div className="mt-4">
          {hasSearched ? (
            searchResults.length > 0 ? (
              <CardGrid pokemons={searchResults} />
            ) : (
              <p className="text-center text-xl text-gray-500">No Pokémon found.</p>
            )
          ) : null}
        </div>
      </div>

    
      <div className="my-20">
        <label htmlFor="typeFilter" className="text-lg font-semibold">Filter by Type: </label>
        <select 
          id="typeFilter" 
          value={selectedType} 
          onChange={(e) => handleTypeFilter(e.target.value)}
          className="my-2 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Types</option>
          {types.map(type => (
            <option key={type.name} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>

        
        <div className="mt-4">
          {loading ? (
            <p className="text-center text-xl text-gray-500">Loading...</p>
          ) : filteredPokemons.length > 0 ? (
            <CardGrid pokemons={filteredPokemons} />
          ) : (
            <p className="text-center text-xl text-gray-500">No Pokémon match this type.</p>
          )}
        </div>
      </div>
    </div>
  );
}
