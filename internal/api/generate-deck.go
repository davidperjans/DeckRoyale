package api

import (
	"net/http"

	"github.com/davidperjans/deckroyale/internal/ai"
	"github.com/davidperjans/deckroyale/internal/clash"
	"github.com/davidperjans/deckroyale/internal/types"
	"github.com/gin-gonic/gin"
)

func GenerateDeckHandler(clashService clash.Service, aiService ai.Service) gin.HandlerFunc {
	return func(c *gin.Context) {
		var request struct {
			Tag       string             `json:"tag"`
			Strategy  types.StrategyName `json:"strategy"`
			Preferred []string           `json:"preferredCards"`
		}

		if err := c.ShouldBindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
			return
		}

		player, err := clashService.GetPlayer(request.Tag)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		deck, err := aiService.GenerateDeck(player.Cards, request.Strategy, request.Preferred)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		_, warning := ai.CheckDeckSuitability(deck, request.Strategy)
		result := ai.DeckSuitabilityResult{
			Deck:    deck,
			Warning: warning,
		}

		c.IndentedJSON(http.StatusOK, result)
	}
}
