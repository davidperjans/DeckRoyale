import api from "./client";

// Hämta alla decks
export const getDecks = async () => {
  const res = await api.get("/decks");
  return res.data;
};

// Skapa nytt deck
export const createDeck = async (deck: { name: string; cards: number[] }) => {
  const res = await api.post("/decks", deck);
  return res.data;
};
