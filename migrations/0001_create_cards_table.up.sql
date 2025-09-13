CREATE TABLE cards (
    id INT PRIMARY KEY,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    roles TEXT[],
    targets TEXT[],
    damage_type TEXT,
    archetype TEXT[],
    synergies INT[],
    counters INT[]
);