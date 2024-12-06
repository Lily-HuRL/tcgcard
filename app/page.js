"use client";
import { useState, useEffect } from "react";
import CardGrid from "./card-grid";

export default function Home() {
  const [cards, setCards] = useState([]); 
  const [searchResults, setSearchResults] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [types, setTypes] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    async function fetchCards() {
      try {
        const response = await fetch("https://api.pokemontcg.io/v2/cards", {
          headers: { "X-Api-Key": process.env.NEXT_PUBLIC_POKEMON_TCG_API_KEY },
        });
        const data = await response.json();
        setCards(data.data);
        setFilteredCards(data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    }
    fetchCards();
  }, []);

  useEffect(() => {
    async function fetchTypes() {
      try {
        const response = await fetch("https://api.pokemontcg.io/v2/types", {
          headers: { "X-Api-Key": process.env.NEXT_PUBLIC_POKEMON_TCG_API_KEY },
        });
        const data = await response.json();
        setTypes(data.data);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    }
    fetchTypes();
  }, []);

  const handleSearch = () => {
    setHasSearched(true);
    if (!query) {
      setSearchResults([]);
    } else {
      const results = cards.filter((card) =>
        card.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(results);
    }
  };

  const handleTypeFilter = (type) => {
    setSelectedType(type);
    if (type) {
      const results = cards.filter((card) => card.types?.includes(type));
      setFilteredCards(results);
    } else {
      setFilteredCards(cards);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mt-4 mb-12 text-center font-serif">Pokémon TCG Cards✨</h1>
      <div className="mb-6 font-serif">
        <input
          type="text"
          placeholder="Search by card name"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-2"
        />
        <button
          onClick={handleSearch}
          className="w-full mt-2 bg-blue-500 text-white p-2 rounded-md"
        >
          Search
        </button>
        <div className="mt-4">
          {hasSearched ? (
            searchResults.length > 0 ? (
              <CardGrid cards={searchResults} />
            ) : (
              <p className="text-center text-gray-500">No cards found.</p>
            )
          ) : null}
        </div>
      </div>
      <div>
        <label
          htmlFor="typeFilter"
          className="text-lg font-semibold mt-12 mb-2 block font-serif"
        >
          Filter by Type:
        </label>
        <select
          id="typeFilter"
          value={selectedType}
          onChange={(e) => handleTypeFilter(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-2 font-serif"
        >
          <option value="">All Types</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <div className="mt-4 font-serif">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : filteredCards.length > 0 ? (
            <CardGrid cards={filteredCards} />
          ) : (
            <p className="text-center text-gray-500">
              No cards match this type.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
