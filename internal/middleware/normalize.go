package middleware

import "github.com/davidperjans/deckroyale/internal/types"

var rarityOffsets = map[string]int{
	"common":    0,
	"rare":      2,
	"epic":      5,
	"legendary": 8,
	"champion":  10,
}

func NormalizeUsersCards(cards []types.Card) []types.Card {
	for i := range cards {
		offset, ok := rarityOffsets[cards[i].Rarity]
		if ok {
			cards[i].Level += offset
		}
	}
	return cards
}
