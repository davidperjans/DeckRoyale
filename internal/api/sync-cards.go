package api

import (
	"net/http"

	"github.com/davidperjans/deckroyale/internal/clash"
	"github.com/davidperjans/deckroyale/internal/repository"
	"github.com/gin-gonic/gin"
)

func SyncCardsHandler(clashService clash.Service, repo repository.CardRepositoryInterface) gin.HandlerFunc {
	return func(c *gin.Context) {
		cards, err := clashService.GetCards()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		if err := repo.InsertCards(cards); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "cards synced successfully", "count": len(cards)})
	}
}
