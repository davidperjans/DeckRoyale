import React from "react";

interface CardProps {
  name: string;
  elixirCost: number;
  rarity: string;
  iconUrls: {
    medium: string;
    evolution_medium?: string;
  };
}

// Färger per rarity
const rarityStyles: Record<string, string> = {
  common: "text-blue-600 font-bold",
  rare: "text-orange-400 font-bold",
  epic: "text-purple-600 font-bold",
  legendary:
    "bg-gradient-to-r from-yellow-400 via-purple-500 to-green-400 text-transparent bg-clip-text font-bold",
  champion: "text-yellow-300 font-bold",
};

const Card: React.FC<CardProps> = ({ name, elixirCost, rarity, iconUrls }) => {
  const rarityClass = rarityStyles[rarity.toLowerCase()] || "text-gray-600";

  return (
    <div className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
      <img
        src={iconUrls.medium}
        alt={name}
        className="w-20 h-20 object-contain mb-2"
      />
      <h3 className="font-semibold">{name}</h3>
      <p className="text-sm text-gray-600">Elixir: {elixirCost}</p>
      <p className={`text-sm mt-1 ${rarityClass}`}>{rarity}</p>
    </div>
  );
};

export default Card;
