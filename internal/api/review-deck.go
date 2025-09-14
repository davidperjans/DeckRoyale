package api

import (
	"net/http"

	"github.com/davidperjans/deckroyale/internal/ai"
	"github.com/davidperjans/deckroyale/internal/clash"
	"github.com/davidperjans/deckroyale/internal/types"
	"github.com/gin-gonic/gin"
)

func ReviewDeckHandler(clashService clash.Service, aiService ai.Service) gin.HandlerFunc {
	return func(c *gin.Context) {
		var request struct {
			Strategy  types.StrategyName `json:"strategy"`
			UserCards []string           `json:"user_cards"`
		}

		if err := c.ShouldBindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
			return
		}

		allCards, err := clashService.GetCards()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		review, err := aiService.ReviewDeck(allCards, request.Strategy, request.UserCards)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.IndentedJSON(http.StatusOK, review)
	}
}
