import api from "./client";

// Hämta alla decks
export const getDecks = async () => {
  const res = await api.get("/decks");
  return res.data;
};

// Skapa nytt deck
export const createDeck = async (deck: { tag: string; strategy: string; preferredCards: string[] }) => {
  const res = await api.post("/deck/generate", deck);
  return res.data;
};
