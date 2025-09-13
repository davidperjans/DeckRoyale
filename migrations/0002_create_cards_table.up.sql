DROP TABLE IF EXISTS cards;

CREATE TABLE cards (
    id INT PRIMARY KEY,
    name TEXT NOT NULL,
    elixir INT,
    rarity TEXT,
    icon_url JSONB
);