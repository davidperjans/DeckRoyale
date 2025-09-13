import React, { useEffect, useState } from "react";
import { getCards } from "../api/cards";
import SmallCard from "../components/SmallCard";

interface ClashCard {
  id: number;
  name: string;
  elixirCost: number;
  rarity: string;
  iconUrls: {
    medium: string;
    evolution_medium?: string;
  };
}

const Home: React.FC = () => {
  const [cards, setCards] = useState<ClashCard[]>([]);
  const [filteredCards, setFilteredCards] = useState<ClashCard[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [rarityFilter, setRarityFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const data = await getCards();
        setCards(data);
        setFilteredCards(data);
      } catch (err) {
        console.error("Kunde inte hämta cards:", err);
      }
    };

    fetchCards();
  }, []);

  // När filter ändras
  useEffect(() => {
    let result = [...cards];

    if (rarityFilter) {
      result = result.filter(
        (card) => card.rarity.toLowerCase() === rarityFilter.toLowerCase()
      );
    }

    if (sortOrder) {
      result.sort((a, b) =>
        sortOrder === "asc"
          ? a.elixirCost - b.elixirCost
          : b.elixirCost - a.elixirCost
      );
    }

    setFilteredCards(result);
  }, [cards, sortOrder, rarityFilter]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Alla kort</h1>

      {/* Filter-knappar */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setSortOrder("asc")}
          className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Elixir ↑
        </button>
        <button
          onClick={() => setSortOrder("desc")}
          className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Elixir ↓
        </button>
        <button
          onClick={() => setSortOrder(null)}
          className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Reset Sort
        </button>

        {["Common", "Rare", "Epic", "Legendary", "Champion"].map((r) => (
          <button
            key={r}
            onClick={() => setRarityFilter(r)}
            className={`px-3 py-1 rounded ${
              rarityFilter === r
                ? "bg-purple-800 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {r}
          </button>
        ))}

        <button
          onClick={() => setRarityFilter(null)}
          className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Reset Filter
        </button>
      </div>

      {/* Frame */}
      <div className="h-[440px] overflow-y-auto bg-gray-100 rounded-lg shadow-inner p-4 custom-scroll">
        <div className="grid auto-rows-max grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] gap-2">
          {filteredCards.map((card) => (
            <SmallCard
              key={card.id}
              name={card.name}
              elixirCost={card.elixirCost}
              rarity={card.rarity}
              iconUrls={card.iconUrls}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
