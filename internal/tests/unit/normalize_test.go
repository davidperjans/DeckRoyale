package unit

import (
	"testing"

	"github.com/davidperjans/deckroyale/internal/middleware"
	"github.com/davidperjans/deckroyale/internal/types"
)

func TestNormalizeCards(t *testing.T) {
	tests := []struct {
		name     string
		input    types.Card
		expected int
	}{
		{"Common level 10 → 10", types.Card{Level: 10, Rarity: "common"}, 10},
		{"Rare level 10 → 12", types.Card{Level: 10, Rarity: "rare"}, 12},
		{"Epic level 5 → 10", types.Card{Level: 5, Rarity: "epic"}, 10},
		{"Legendary level 3 → 11", types.Card{Level: 3, Rarity: "legendary"}, 11},
		{"Champion level 1 → 11", types.Card{Level: 1, Rarity: "champion"}, 11},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := middleware.NormalizeCards([]types.Card{tt.input})
			if result[0].Level != tt.expected {
				t.Errorf("got %d, want %d", result[0].Level, tt.expected)
			}
		})
	}
}
