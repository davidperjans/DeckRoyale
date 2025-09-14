package integration

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/davidperjans/deckroyale/internal/api"
	"github.com/davidperjans/deckroyale/internal/middleware"
	"github.com/davidperjans/deckroyale/internal/responses"
	"github.com/davidperjans/deckroyale/internal/types"
	"github.com/gin-gonic/gin"
)

type fakeClashService struct{}

func (f *fakeClashService) GetCards() ([]types.Card, error) {
	return []types.Card{}, nil
}

func (f *fakeClashService) GetPlayer(playerTag string) (*types.User, error) {
	user := &types.User{
		Tag:      playerTag,
		Name:     "TestUser",
		Level:    10,
		Trophies: 5000,
		Clan:     types.Clan{Tag: "#FAKE", Name: "FakeClan"},
		Cards: []types.Card{
			{ID: 26000055, Name: "Mega Knight", Level: 5, Rarity: "legendary", ElixirCost: 7},
			{ID: 26000000, Name: "Knight", Level: 10, Rarity: "common", ElixirCost: 3},
		},
	}

	user.Cards = middleware.NormalizeUsersCards(user.Cards)

	return user, nil
}

type fakeAI struct{}

func (f *fakeAI) GenerateDeck(cards []types.Card, strategy types.StrategyName, preferred []string) (*responses.GenerateDeckResponse, error) {
	return &responses.GenerateDeckResponse{}, nil
}

func (f *fakeAI) ReviewDeck([]types.Card, types.StrategyName, []string) (*types.Review, error) {
	return &types.Review{}, nil
}

type fakeCardRepository struct{}

func (f *fakeCardRepository) InsertCards(cards []types.Card) error {
	return nil
}

func (f *fakeCardRepository) GetAllCards() ([]types.Card, error) {
	return []types.Card{
		{ID: 26000000, Name: "Knight", ElixirCost: 3, Rarity: "Common"},
		{ID: 26000055, Name: "Mega Knight", ElixirCost: 7, Rarity: "Legendary"},
	}, nil
}

func TestPlayerFlow(t *testing.T) {
	gin.SetMode(gin.TestMode)

	r := gin.Default()
	clashSvc := &fakeClashService{}
	aiSvc := &fakeAI{}
	cardRepo := &fakeCardRepository{}
	api.RegisterRoutes(r, clashSvc, aiSvc, cardRepo)

	req, _ := http.NewRequest("GET", "/api/v1/player/%23TEST", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	if w.Code != http.StatusOK {
		t.Fatalf("expected 200, got %d", w.Code)
	}

	var user types.User
	if err := json.Unmarshal(w.Body.Bytes(), &user); err != nil {
		t.Fatalf("failed to unmarshal response: %v", err)
	}

	if user.Cards[0].Name == "Mega Knight" && user.Cards[0].Level <= 6 {
		t.Errorf("expected mega knight to be normalized, got level %d", user.Cards[0].Level)
	}
}
