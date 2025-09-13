package repository

import (
	"github.com/davidperjans/deckroyale/internal/types"
	"github.com/jmoiron/sqlx"
)

type CardRepositoryInterface interface {
	InsertCards(cards []types.Card) error
	GetAllCards() ([]types.Card, error)
}

type CardRepository struct {
	db *sqlx.DB
}

func NewCardRepository(db *sqlx.DB) *CardRepository {
	return &CardRepository{db}
}

func (r *CardRepository) InsertCards(cards []types.Card) error {
	query := `
		INSERT INTO cards (id, name, elixir, rarity, icon_url)
		VALUES (:id, :name, :elixir, :rarity, :icon_url)
		ON CONFLICT (id) DO UPDATE
		SET name = EXCLUDED.name,
		    elixir = EXCLUDED.elixir,
		    rarity = EXCLUDED.rarity,
		    icon_url = EXCLUDED.icon_url;
	`
	_, err := r.db.NamedExec(query, cards)
	return err
}

func (r *CardRepository) GetAllCards() ([]types.Card, error) {
	var cards []types.Card
	query := `SELECT * FROM cards`
	err := r.db.Select(&cards, query)
	return cards, err
}
