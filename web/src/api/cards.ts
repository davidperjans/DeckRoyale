import api from "./client";

// Hämta alla decks
export const getCards = async () => {
  const res = await api.get("/cards");
  return res.data;
};
