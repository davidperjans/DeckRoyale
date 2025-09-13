package ai

import "github.com/davidperjans/deckroyale/internal/types"

type DeckSuitabilityResult struct {
	Deck    types.Deck `json:"deck"`
	Warning string     `json:"warning,omitempty"`
}

func CheckDeckSuitability(deck types.Deck, strategy types.StrategyName) (ok bool, warning string) {
	avg := deck.AvgElixir
	switch strategy {
	case types.Cycle:
		if avg > 3.3 || avg < 2.5 {
			return false, "Your deck's average elixir is not optimal for cycle (should be 2.5-3.3). Consider leveling up more cheap cards."
		}
		for _, card := range deck.Cards {
			if card.ElixirCost > 5 {
				return false, "Your deck contains high-cost cards, which are not suitable for cycle. Consider leveling up more cheap cards."
			}
		}
	case types.Attacking:

	}
	return true, ""
}
