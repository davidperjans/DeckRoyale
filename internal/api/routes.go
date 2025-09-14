package api

import (
	"github.com/davidperjans/deckroyale/internal/ai"
	"github.com/davidperjans/deckroyale/internal/clash"
	"github.com/davidperjans/deckroyale/internal/repository"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine, clashService clash.Service, aiService ai.Service, cardRepo repository.CardRepositoryInterface) {
	v1 := r.Group("/api/v1")
	{
		v1.GET("/player/:tag", GetPlayerHandler(clashService))

		v1.GET("/cards", GetCardsHandler(cardRepo))
		v1.POST("/cards/sync", SyncCardsHandler(clashService, cardRepo))

		v1.POST("/deck/generate", GenerateDeckHandler(clashService, aiService))
		v1.POST("/deck/review", ReviewDeckHandler(clashService, aiService))

	}
}
