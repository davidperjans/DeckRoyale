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

const rarityStyles: Record<string, string> = {
  common: "text-blue-600 font-bold",
  rare: "text-orange-400 font-bold",
  epic: "text-purple-600 font-bold",
  legendary:
    "bg-gradient-to-r from-yellow-400 via-purple-500 to-green-400 text-transparent bg-clip-text font-bold",
  champion: "text-yellow-300 font-bold",
};

const SmallCard: React.FC<CardProps> = ({ name, elixirCost, rarity, iconUrls }) => {
  const rarityClass = rarityStyles[rarity.toLowerCase()] || "text-gray-600";

  return (
    <div className="relative group bg-white rounded-lg shadow-md p-2 flex flex-col items-center text-center hover:shadow-lg transition-shadow w-24">
      <img
        src={iconUrls.medium}
        alt={name}
        className="w-12 h-12 object-contain mb-1"
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-90 transition-opacity rounded-lg flex flex-col justify-center items-center text-white p-2 text-center">
        <h3 className="font-semibold text-xs">{name}</h3>
        <p className="text-[10px]">Elixir: {elixirCost}</p>
        <p className={`text-[10px] mt-0.5 ${rarityClass}`}>{rarity}</p>
      </div>
    </div>
  );
};

export default SmallCard;
