package api

import (
	"net/http"

	"github.com/davidperjans/deckroyale/internal/repository"
	"github.com/gin-gonic/gin"
)

func GetCardsHandler(repo repository.CardRepositoryInterface) gin.HandlerFunc {
	return func(c *gin.Context) {
		cards, err := repo.GetAllCards()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, cards)
	}
}
