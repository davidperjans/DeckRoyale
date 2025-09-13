// DO not touch

package responses

import "github.com/davidperjans/deckroyale/internal/types"

type PlayerResponse struct {
	Tag string `json:"tag"`
}

type CardsResponse struct {
	Items []types.Card `json:"items"`
}
