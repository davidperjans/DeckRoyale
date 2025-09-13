package main

import (
	"log"
	"net/http"
	"os"

	"github.com/davidperjans/deckroyale/internal/ai"
	"github.com/davidperjans/deckroyale/internal/api"
	"github.com/davidperjans/deckroyale/internal/clash"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	_ = godotenv.Load()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	clashApiKey := os.Getenv("CLASH_API_KEY")
	if clashApiKey == "" {
		log.Fatalln("you need clash royale api key to start this")
	}

	geminiApiKey := os.Getenv("GEMINI_KEY")
	if geminiApiKey == "" {
		log.Fatalln("you need ai key to start this")
	}

	clashService := clash.NewClashService(clashApiKey)
	aiService, err := ai.NewAdvisor(geminiApiKey)
	if err != nil {
		log.Fatalln(err)
	}

	router := gin.Default()
	api.RegisterRoutes(router, clashService, aiService)

	log.Printf("Server running on %s", port)
	http.ListenAndServe(":"+port, router)
}
