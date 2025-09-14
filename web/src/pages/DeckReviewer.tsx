import React, { useState } from "react";
import {
  Plus,
  X,
  Sparkles,
  Search,
  Star,
  Info,
} from "lucide-react";

// Strategy descriptions
const strategyDescriptions: Record<string, string> = {
  cycle: "Fast-paced, low elixir cards for quick rotations",
  defensive: "Focus on countering and building up strong pushes",
  attacking: "Aggressive play with high-damage troops and spells",
  spamming: "Overwhelm opponents with multiple troops and constant pressure",
  control: "Strategic positioning and spell usage for board control",
  beatdown: "Build up massive pushes with high-elixir tanks",
  siege: "Use buildings and long-range troops to control the game",
  hybrid: "Adaptable strategy combining multiple playstyles",
};

const DeckReviewer: React.FC = () => {
  const [preferredCards, setPreferredCards] = useState<(any | null)[]>(
    Array(8).fill(null)
  );
  const [strategy, setStrategy] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [review, setReview] = useState<string | null>(null);

  const handleOpenModal = (slotIndex: number) => {
    setSelectedSlot(slotIndex);
    setShowModal(true);
  };

  const handleSelectCard = (card: any) => {
    if (selectedSlot !== null) {
      const updated = [...preferredCards];
      updated[selectedSlot] = card;
      setPreferredCards(updated);
    }
    setShowModal(false);
  };

  const handleRemoveCard = (slotIndex: number) => {
    const updated = [...preferredCards];
    updated[slotIndex] = null;
    setPreferredCards(updated);
  };

  const handleReviewDeck = () => {
    // placeholder – sen anrop till backend
    if (!strategy || preferredCards.every((c) => !c)) {
      setReview("Please select a strategy and fill your deck before reviewing.");
    } else {
      setReview("Deck review will appear here once backend is connected!");
    }
  };

  // mock all cards list tills backend finns
  const mockCards = [
    { id: 1, name: "Knight", elixirCost: 3, iconUrls: { medium: "https://royaleapi.github.io/cr-api-assets/cards-150/knight.png" } },
    { id: 2, name: "Archers", elixirCost: 3, iconUrls: { medium: "https://royaleapi.github.io/cr-api-assets/cards-150/archers.png" } },
    { id: 3, name: "Fireball", elixirCost: 4, iconUrls: { medium: "https://royaleapi.github.io/cr-api-assets/cards-150/fireball.png" } },
    // lägg till fler mockkort om du vill
  ];

  const filteredCards = mockCards.filter((card) =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Star className="h-10 w-10" />
            <h1 className="text-4xl font-bold">Deck Reviewer</h1>
          </div>
          <p className="text-xl text-purple-100 max-w-2xl mx-auto">
            Evaluate your deck’s strengths and weaknesses based on playstyle
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Preferred Cards */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg">
                <Plus className="text-white h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Your Deck</h2>
            </div>
            <button
              onClick={() => setPreferredCards(Array(8).fill(null))}
              className="text-red-500 hover:text-red-600 font-medium text-sm flex items-center gap-1 hover:bg-red-50 px-2 py-1 rounded-lg transition-all"
            >
              <X className="h-4 w-4" />
              Clear
            </button>
          </div>

          {/* Import field */}
          <div className="flex items-center gap-2 mb-3">
            <input
              type="text"
              placeholder="Paste deck link..."
              className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
            <button
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:from-indigo-700 hover:to-purple-700 transition-all"
            >
              Import
            </button>
          </div>
          <p className="text-xs text-gray-500 flex items-center gap-1 mb-4">
            <Info className="h-4 w-4 text-indigo-500" />
            Paste a Clash Royale deck link like: 
            <span className="italic"> https://link.clashroyale.com/en/?clashroyale://copyDeck?deck=...</span>
          </p>

          {/* Deck slots */}
          <div className="grid grid-cols-4 gap-3">
            {preferredCards.map((card, i) => (
              <div
                key={i}
                className="relative group aspect-[4/5] border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 cursor-pointer hover:border-indigo-300 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 transition-all"
                onClick={() => handleOpenModal(i)}
              >
                {card ? (
                  <>
                    <img
                      src={card.iconUrls?.medium}
                      alt={card.name}
                      className="w-12 h-12 object-contain"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveCard(i);
                      }}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <Plus className="h-6 w-6 mb-1" />
                    <span className="text-xs font-medium">Add</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Strategy Selection */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-lg">
              <Sparkles className="text-white h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Choose Strategy</h2>
          </div>
          
          <select
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all bg-gray-50"
          >
            <option value="">-- Select a strategy --</option>
            {Object.keys(strategyDescriptions).map((s) => (
              <option key={s} value={s}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </option>
            ))}
          </select>
          
          {strategy && (
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100 rounded-xl p-4 mb-4">
              <p className="text-sm text-purple-700 font-medium italic">
                {strategyDescriptions[strategy]}
              </p>
            </div>
          )}
          
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <Plus className="h-4 w-4 text-yellow-500" />
              Pro Tips
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-purple-500 font-bold">•</span>
                Balance fast cycle cards with strong win-conditions
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 font-bold">•</span>
                Always keep at least one cheap defensive card
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-500 font-bold">•</span>
                Cover common threats with spells like Fireball or Zap
              </li>
            </ul>
          </div>
        </div>

        {/* Review Output */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg">
              <Star className="text-white h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Deck Review</h2>
          </div>

          <div className="flex-1 border border-dashed border-gray-300 rounded-xl p-6 text-center text-gray-400">
            {review ? (
              <p className="text-gray-700">{review}</p>
            ) : (
              <span>No review yet</span>
            )}
          </div>

          <button
            onClick={handleReviewDeck}
            className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
          >
            <Sparkles className="h-5 w-5 mr-2 inline-block" />
            Review Deck
          </button>
        </div>
      </div>

      {/* Card Selection Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">Select a Card</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-lg transition-all"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6 border-b border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search cards..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredCards.map((card: any) => (
                  <div
                    key={card.id}
                    onClick={() => handleSelectCard(card)}
                    className="border-2 border-gray-200 rounded-xl p-3 flex flex-col items-center cursor-pointer hover:border-indigo-300 hover:bg-indigo-50 transition-all group"
                  >
                    <img
                      src={card.iconUrls?.medium}
                      alt={card.name}
                      className="w-16 h-16 mb-2 object-contain group-hover:scale-110 transition-transform"
                    />
                    <p className="text-sm font-semibold text-center text-gray-800 mb-1">
                      {card.name}
                    </p>
                    <div className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">
                      <p className="text-xs font-medium">{card.elixirCost} ⚡</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeckReviewer;
