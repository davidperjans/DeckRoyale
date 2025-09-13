package main

import (
	"log"
	"net/http"
	"os"

	"github.com/davidperjans/deckroyale/internal/ai"
	"github.com/davidperjans/deckroyale/internal/api"
	"github.com/davidperjans/deckroyale/internal/clash"
	"github.com/davidperjans/deckroyale/internal/db"
	"github.com/davidperjans/deckroyale/internal/repository"
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
	api.RegisterRoutes(router, clashService, aiService, cardRepo)

	log.Printf("Server running on %s", port)
	http.ListenAndServe(":"+port, router)
}

func getenv(key, fallback string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	return fallback
}
