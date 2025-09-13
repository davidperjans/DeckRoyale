package ai

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/davidperjans/deckroyale/internal/deck"
	"github.com/davidperjans/deckroyale/internal/types"
	genai "github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

type Service interface {
	GenerateDeck(cards []types.Card, strategy types.StrategyName, preferred []string) (types.Deck, error)
}

type Advisor struct {
	client *genai.Client
}

func NewAdvisor(apiKey string) (*Advisor, error) {
	ctx := context.Background()
	client, err := genai.NewClient(ctx, option.WithAPIKey(apiKey))
	if err != nil {
		return nil, err
	}
	return &Advisor{client: client}, nil
}

func (a *Advisor) GenerateDeck(cards []types.Card, strategy types.StrategyName, preferred []string) (types.Deck, error) {
	ctx := context.Background()
	model := a.client.GenerativeModel("gemini-1.5-flash")

	// Look up strategy description
	description, ok := types.StrategyDescriptions[strategy]
	if !ok {
		description = string(strategy)
	}

	requirement := StrategyAIRequirements[strategy]

	// Build prompt
	prompt := fmt.Sprintf(`
	       You are an expert Clash Royale deck builder.
		   Your goal is to build the strongest possible deck for this player, maximizing synergy, meta relevance, and win potential.
	       Player's available cards (with levels):
	       %v

	       Strategy: %s (%s)
	       Preferred cards: %v

		   Requirements:
		   - %s
		   - Use only the player's available cards and levels.
		   - The deck must fit the specified strategy and preferred cards if possible.
		   - Ensure a balanced deck: win condition, defense, spells, and elixir cost.
		   - Avoid weak or outdated combinations.
	       Return ONLY a valid JSON array of 8 cards, in the format:
	       [{"id":26000000,"name":"Knight","level":12,"rarity":"Common","elixirCost":3}, ...]
       `, cards, strategy, description, preferred, requirement)

	resp, err := model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		return types.Deck{}, err
	}

	if len(resp.Candidates) == 0 || len(resp.Candidates[0].Content.Parts) == 0 {
		return types.Deck{}, fmt.Errorf("no response from Gemini")
	}

	raw := string(resp.Candidates[0].Content.Parts[0].(genai.Text))

	clean := strings.TrimSpace(raw)
	clean = strings.TrimPrefix(clean, "```json")
	clean = strings.TrimPrefix(clean, "```")
	clean = strings.TrimSuffix(clean, "```")
	clean = strings.TrimSpace(clean)

	var d types.Deck
	if err := json.Unmarshal([]byte(clean), &d.Cards); err != nil {
		return types.Deck{}, fmt.Errorf("failed to parse deck JSON: %w\nResponse: %s", err, clean)
	}

	for i, card := range d.Cards {
		if correct, ok := deck.CardDataByName[card.Name]; ok {
			d.Cards[i].ElixirCost = correct.ElixirCost
		}
	}

	d.AvgElixir = deck.CalculateAvgElixir(d.Cards)

	return d, nil
}
