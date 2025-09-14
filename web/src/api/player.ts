import api from "./client";

// Hämta alla decks
export const getPlayer = async (playerTag: string) => {
  const cleanTag = playerTag.replace("#", "");
  const res = await api.get(`/player/${cleanTag}`);
  return res.data;
};
