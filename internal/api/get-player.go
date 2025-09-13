package api

import (
	"net/http"

	"github.com/davidperjans/deckroyale/internal/clash"
	"github.com/gin-gonic/gin"
)

func GetPlayerHandler(clashService clash.Service) gin.HandlerFunc {
	return func(c *gin.Context) {
		tag := c.Param("tag")

		player, err := clashService.GetPlayer(tag)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, player)
	}
}
