import React, { useState } from "react";
import { getPlayer } from "../api/player";
import { createDeck } from "../api/decks";
import {
  Trophy,
  Crown,
  Sword,
  Swords,
  Users,
  User,
  Plus,
  X,
  Search,
  Sparkles,
  Target,
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

const DeckBuilder: React.FC = () => {
  const [tag, setTag] = useState("");
  const [playerData, setPlayerData] = useState<any | null>(null);
  const [preferredCards, setPreferredCards] = useState<(any | null)[]>(
    Array(8).fill(null)
  );
  const [generatedDeck, setGeneratedDeck] = useState<any | null>(null);
  const [strategy, setStrategy] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!tag.trim()) return;
    setLoading(true);
    try {
      const data = await getPlayer(tag.replace("#", ""));
      setPlayerData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateDeck = async () => {
    if (!playerData || !strategy) return;
    
    setLoading(true);
    try {
      const body = {
        tag: playerData.tag.replace("#", ""),
        strategy,
        preferredCards: preferredCards.filter((c) => c).map((c) => c.name),
      };
      const data = await createDeck(body);
      
      // Match generated cards with player's cards to get proper icons
      const cardsWithIcons = data.deck.cards.map((generatedCard: any) => {
        // Try exact match first
        let playerCard = playerData.cards.find((pCard: any) => 
          pCard.name.toLowerCase() === generatedCard.name.toLowerCase()
        );
        
        // If no exact match, try partial matching (in case of naming differences)
        if (!playerCard) {
          playerCard = playerData.cards.find((pCard: any) => 
            pCard.name.toLowerCase().includes(generatedCard.name.toLowerCase()) ||
            generatedCard.name.toLowerCase().includes(pCard.name.toLowerCase())
          );
        }
        
        return {
          ...generatedCard,
          iconUrl: playerCard?.iconUrls?.medium || null,
          iconUrls: playerCard?.iconUrls || null,
        };
      });
      
      setGeneratedDeck({
        ...data.deck,
        cards: cardsWithIcons,
      });
    } catch (err) {
      console.error('=== DECK GENERATION ERROR ===', err);
    } finally {
      setLoading(false);
    }
  };

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

  const filteredCards =
    playerData?.cards?.filter((card: any) =>
      card.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Target className="h-10 w-10" />
              <h1 className="text-4xl font-bold">Deck Builder</h1>
            </div>
            <p className="text-xl text-purple-100 max-w-2xl mx-auto">
              Create the perfect deck tailored to your playstyle and card collection
            </p>
          </div>
          
          {/* Search Section */}
          <div className="max-w-md mx-auto mt-8">
            <div className="relative">
              <input
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                placeholder="Enter player tag (e.g., #ABC123)"
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 pl-12 text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40 transition-all"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-200 h-5 w-5" />
            </div>
            <button
              onClick={handleSearch}
              disabled={loading || !tag.trim()}
              className="w-full mt-3 bg-white text-purple-700 font-semibold py-3 px-6 rounded-xl hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-purple-700 border-t-transparent rounded-full animate-spin"></div>
                  Searching...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Search className="h-5 w-5" />
                  Find Player
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Player Info */}
        {playerData && (
          <div className="mb-8">
            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-6 border border-purple-100">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-3 rounded-xl">
                    <User className="text-white h-8 w-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{playerData.name}</h2>
                    <p className="text-purple-600 font-medium">{playerData.tag}</p>
                    <p className="text-gray-500">Level {playerData.expLevel}</p>
                  </div>
                </div>
                
                {playerData.clan && (
                  <div className="flex items-center gap-3 bg-purple-50 px-4 py-3 rounded-xl">
                    <Users className="text-purple-600 h-6 w-6" />
                    <div>
                      <p className="font-semibold text-gray-800">{playerData.clan.name}</p>
                      <p className="text-sm text-purple-600">{playerData.clan.tag}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: Trophy,
                  value: playerData.trophies,
                  label: "Trophies",
                  subtitle: `Best: ${playerData.bestTrophies}`,
                  color: "text-yellow-500",
                  bg: "bg-yellow-50",
                },
                {
                  icon: Sword,
                  value: `${playerData.wins}W / ${playerData.losses}L`,
                  label: `${((playerData.wins / Math.max(1, playerData.wins + playerData.losses)) * 100).toFixed(1)}% WR`,
                  subtitle: "Win Rate",
                  color: "text-green-500",
                  bg: "bg-green-50",
                },
                {
                  icon: Swords,
                  value: playerData.battleCount,
                  label: "Total Battles",
                  subtitle: "Experience",
                  color: "text-blue-500",
                  bg: "bg-blue-50",
                },
                {
                  icon: Crown,
                  value: playerData.threeCrownWins,
                  label: "3-Crown Wins",
                  subtitle: "Dominance",
                  color: "text-purple-500",
                  bg: "bg-purple-50",
                },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg p-4 border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <div className={`${stat.bg} p-2 rounded-lg w-fit mb-3`}>
                    <stat.icon className={`${stat.color} h-6 w-6`} />
                  </div>
                  <p className="text-lg font-bold text-gray-800">{stat.value}</p>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-xs text-gray-400">{stat.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {playerData && (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Preferred Cards */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-lg">
                    <Plus className="text-white h-5 w-5" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800">Preferred Cards</h2>
                </div>
                <button
                  onClick={() => setPreferredCards(Array(8).fill(null))}
                  className="text-red-500 hover:text-red-600 font-medium text-sm flex items-center gap-1 hover:bg-red-50 px-2 py-1 rounded-lg transition-all"
                >
                  <X className="h-4 w-4" />
                  Clear
                </button>
              </div>
              
              <div className="grid grid-cols-4 gap-3">
                {preferredCards.map((card, i) => (
                  <div
                    key={i}
                    className="relative group aspect-[4/5] border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 cursor-pointer hover:border-purple-300 hover:bg-gradient-to-br hover:from-purple-50 hover:to-indigo-50 transition-all"
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
                  <li className="flex items-start gap-2">
                    <span className="text-purple-500 font-bold">•</span>
                    Include at least one reliable anti-air option
                  </li>
                </ul>
              </div>
            </div>

            {/* Generated Deck */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-purple-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-lg">
                  <Target className="text-white h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Generated Deck</h2>
              </div>
              
              <div className="grid grid-cols-4 gap-3 mb-6">
                {generatedDeck
                  ? generatedDeck.cards.map((card: any, i: number) => (
                      <div
                        key={i}
                        className="aspect-[4/5] border-2 border-purple-200 rounded-xl flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-50"
                      >
                        {(card.iconUrl && card.iconUrl !== "") || (card.iconUrls?.medium && card.iconUrls.medium !== "") ? (
                          <img
                            src={card.iconUrl || card.iconUrls?.medium}
                            alt={card.name}
                            className="w-12 h-12 object-contain"
                          />
                        ) : (
                          <span className="text-xs text-center px-1 text-purple-700 font-medium">
                            {card.name}
                          </span>
                        )}
                      </div>
                    ))
                  : Array(8)
                      .fill(null)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="aspect-[4/5] border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center bg-gray-50 text-gray-400"
                        >
                          <span className="text-xs">Empty</span>
                        </div>
                      ))}
              </div>
              
              {generatedDeck && (
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 rounded-xl p-4 mb-4">
                  <p className="text-center text-purple-700">
                    <span className="text-sm">Average Elixir Cost</span>
                    <br />
                    <span className="text-2xl font-bold">{generatedDeck.avgElixir}</span>
                  </p>
                </div>
              )}
              
              <button
                onClick={handleGenerateDeck}
                disabled={!strategy || loading}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Generating...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Sparkles className="h-5 w-5" />
                    Generate Deck
                  </div>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Card Selection Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-2 rounded-lg">
                  <Plus className="text-white h-5 w-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-800">Select a Card</h2>
              </div>
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
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
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
                    className="border-2 border-gray-200 rounded-xl p-3 flex flex-col items-center cursor-pointer hover:border-purple-300 hover:bg-purple-50 transition-all group"
                  >
                    <img
                      src={card.iconUrls?.medium}
                      alt={card.name}
                      className="w-16 h-16 mb-2 object-contain group-hover:scale-110 transition-transform"
                    />
                    <p className="text-sm font-semibold text-center text-gray-800 mb-1">
                      {card.name}
                    </p>
                    <div className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
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

export default DeckBuilder;