package api

import (
	"github.com/davidperjans/deckroyale/internal/ai"
	"github.com/davidperjans/deckroyale/internal/clash"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine, clashService clash.Service, aiService ai.Service) {
	r.GET("/player/:tag", GetPlayerHandler(clashService))
	r.POST("/deck/generate", GenerateDeckHandler(clashService, aiService))
}
