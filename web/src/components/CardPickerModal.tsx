import React, { useState } from "react";
import { X, Search } from "lucide-react";

interface CardPickerModalProps {
  cards: any[];
  onClose: () => void;
  onPickCard: (card: any) => void;
}

const CardPickerModal: React.FC<CardPickerModalProps> = ({ cards, onClose, onPickCard }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [rarityFilter, setRarityFilter] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");

  const filteredCards = cards
    .filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((c) => (rarityFilter === "all" ? true : c.rarity.toLowerCase() === rarityFilter))
    .sort((a, b) => {
      return sortOrder === "asc" ? a.elixirCost - b.elixirCost : b.elixirCost - a.elixirCost;
    });

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      {/* Blur background */}
      <div className="absolute inset-0 backdrop-blur-sm backdrop-brightness-75" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-lg p-6 w-[800px] h-[550px] overflow-y-auto shadow-lg z-10">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <X size={24} />
        </button>
        <h3 className="text-lg font-semibold mb-4">Choose a Card</h3>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-4">
          {/* Search */}
          <div className="flex items-center border rounded px-2">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-2 py-1 outline-none"
            />
          </div>

          {/* Rarity filter */}
          <select
            value={rarityFilter}
            onChange={(e) => setRarityFilter(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="all">All Rarities</option>
            <option value="common">Common</option>
            <option value="rare">Rare</option>
            <option value="epic">Epic</option>
            <option value="legendary">Legendary</option>
            <option value="champion">Champion</option>
          </select>

          {/* Sort */}
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="asc">Elixir: Low → High</option>
            <option value="desc">Elixir: High → Low</option>
          </select>
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-6 gap-3">
          {filteredCards.map((card) => (
            <div
              key={card.id}
              onClick={() => onPickCard(card)}
              className="bg-gray-100 rounded-lg p-2 flex flex-col items-center cursor-pointer hover:shadow transition"
            >
              <img
                src={card.iconUrls?.medium}
                alt={card.name}
                className="w-14 h-16 object-contain"
              />
              <p className="text-xs font-semibold">{card.name}</p>
              <p className="text-[11px] text-gray-500">
                Lv {card.level || 0} – {card.elixirCost}⚡
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardPickerModal;
