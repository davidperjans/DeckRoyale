package deck

import "github.com/davidperjans/deckroyale/internal/types"

func CalculateAvgElixir(cards []types.Card) float64 {
	if len(cards) == 0 {
		return 0
	}

	sum := 0
	for _, card := range cards {
		sum += card.ElixirCost
	}
	return float64(sum) / float64(len(cards))
}
