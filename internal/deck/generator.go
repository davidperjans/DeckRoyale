package deck

import (
	"math/rand"
	"time"

	"github.com/davidperjans/deckroyale/internal/types"
)

func init() {
	rand.Seed(time.Now().UnixNano())
}

// TODO: Add strategy logic later
func GenerateDeck(cards []types.Card) types.Deck {
	if len(cards) < 8 {
		return types.Deck{Cards: cards}
	}

	selected := randomPick(cards, 8)
	return types.Deck{Cards: selected}
}

func randomPick(cards []types.Card, n int) []types.Card {
	indexes := rand.Perm(len(cards))[:n]
	selected := make([]types.Card, n)
	for i, idx := range indexes {
		selected[i] = cards[idx]
	}
	return selected
}
