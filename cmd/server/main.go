package main

import (
	"log"
	"os"
	"time"

	"github.com/davidperjans/deckroyale/internal/ai"
	"github.com/davidperjans/deckroyale/internal/api"
	"github.com/davidperjans/deckroyale/internal/clash"
	"github.com/davidperjans/deckroyale/internal/db"
	"github.com/davidperjans/deckroyale/internal/repository"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	_ = godotenv.Load()

	port := getenv("PORT", "8080")

	clashApiKey := os.Getenv("CLASH_API_KEY")
	if clashApiKey == "" {
		log.Fatalln("you need clash royale api key to start this")
	}

	geminiApiKey := os.Getenv("GEMINI_KEY")
	if geminiApiKey == "" {
		log.Fatalln("you need ai key to start this")
	}

	dbURL := os.Getenv("DATABASE_URL")
	if dbURL == "" {
		log.Fatalln("you need DATABASE_URL to connect to Postgres")
	}
	database := db.Connect(dbURL)
	defer database.Close()

	clashService := clash.NewClashService(clashApiKey)
	aiService, err := ai.NewAdvisor(geminiApiKey)
	if err != nil {
		log.Fatalln(err)
	}
	cardRepo := repository.NewCardRepository(database)

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, // frontend origin
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	api.RegisterRoutes(router, clashService, aiService, cardRepo)

	log.Printf("Server running on %s", port)
	if err := router.Run(":" + port); err != nil {
		log.Fatalf("could not run server: %v", err)
	}
}

func getenv(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}
