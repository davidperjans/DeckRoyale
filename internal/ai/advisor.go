package ai

import (
	"context"
	_ "embed"
	"encoding/json"
	"fmt"
	"strings"

	"github.com/davidperjans/deckroyale/internal/deck"
	"github.com/davidperjans/deckroyale/internal/responses"
	"github.com/davidperjans/deckroyale/internal/types"
	genai "github.com/google/generative-ai-go/genai"
	"google.golang.org/api/option"
)

//go:embed prompts/deck_review_prompt.json
var deckReviewPromptJSON []byte

//go:embed prompts/deck_generate_prompt.json
var deckGeneratePromptJSON []byte

var deckReviewPrompt string
var deckGeneratePrompt string

type Service interface {
	GenerateDeck(userCards []types.Card, strategy types.StrategyName, preferredCards []string) (*responses.GenerateDeckResponse, error)
	ReviewDeck(allCards []types.Card, strategy types.StrategyName, userCards []string) (*types.Review, error)
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

func init() {
	// Only initialize if we have the embedded JSON
	if len(deckReviewPromptJSON) > 0 {
		var template types.PromptTemplate
		if err := json.Unmarshal(deckReviewPromptJSON, &template); err != nil {
			panic(fmt.Sprintf("Failed to load deck review prompt: %v", err))
		}
		deckReviewPrompt = buildPromptTemplate(template)
	}

	if len(deckGeneratePromptJSON) > 0 {
		var template types.PromptTemplate
		if err := json.Unmarshal(deckGeneratePromptJSON, &template); err != nil {
			panic(fmt.Sprintf("Failed to load deck generate prompt: %v", err))
		}
		deckGeneratePrompt = buildPromptTemplate(template)
	}
}

func buildPromptTemplate(t types.PromptTemplate) string {
	return strings.Join([]string{
		t.SystemMessage,
		t.KnowledgeBase,
		t.AnalysisRules,
		t.RatingGuidelines,
		t.OutputFormat,
		t.Instructions,
	}, "\n\n")
}

// ReviewDeck analyzes a user's deck and returns a detailed review
func (a *Advisor) ReviewDeck(allCards []types.Card, strategy types.StrategyName, userCards []string) (*types.Review, error) {
	ctx := context.Background()
	model := a.client.GenerativeModel("gemini-1.5-flash")

	// Configure model for more consistent responses
	model.SetTemperature(0.3)
	model.SetMaxOutputTokens(2000)

	// Get strategy description
	description, ok := types.StrategyDescriptions[strategy]
	if !ok {
		description = string(strategy)
	}

	// Convert user card names to actual Card objects for analysis
	userDeck := a.getUserDeckCards(allCards, userCards)
	if len(userDeck) != 8 {
		return nil, fmt.Errorf("deck must have exactly 8 cards, got %d", len(userDeck))
	}

	// Build the complete prompt
	prompt := fmt.Sprintf(`%s

## ANALYSIS INPUT:
**ALL_CARDS**: %s
**STRATEGY**: %s (%s)
**USER_DECK**: %s

Return only valid JSON matching the Review struct format.`,
		deckReviewPrompt,
		a.formatCardsForAI(allCards),
		string(strategy),
		description,
		a.formatUserDeckForAI(userDeck),
	)

	// Call Gemini
	resp, err := model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		return nil, fmt.Errorf("gemini API error: %w", err)
	}

	if len(resp.Candidates) == 0 || len(resp.Candidates[0].Content.Parts) == 0 {
		return nil, fmt.Errorf("empty response from gemini")
	}

	// Clean and parse response
	raw := string(resp.Candidates[0].Content.Parts[0].(genai.Text))
	clean := a.cleanJSONResponse(raw)

	// Parse into temporary structure since AI returns card names as strings
	var tempReview struct {
		Deck struct {
			Cards           []string           `json:"cards"` // AI returns strings
			Strategy        types.StrategyName `json:"strategy"`
			AvgElixir       float64            `json:"avgElixir"`
			StrategyMessage string             `json:"strategyMessage"`
			Strengths       []string           `json:"strengths"`
			Weaknesses      []string           `json:"weaknesses"`
			PlaystyleTips   []string           `json:"playstyle_tips"`
		} `json:"deck"`
		Rating        float64 `json:"rating"`
		ReviewMessage string  `json:"review_message"`
	}

	if err := json.Unmarshal([]byte(clean), &tempReview); err != nil {
		return nil, fmt.Errorf("failed to parse AI response: %w\nResponse: %s", err, clean)
	}

	// Convert to proper Review struct with actual Card objects
	review := types.Review{
		Deck: types.Deck{
			Cards:           userDeck, // Use the actual Card objects
			Strategy:        tempReview.Deck.Strategy,
			AvgElixir:       tempReview.Deck.AvgElixir,
			StrategyMessage: tempReview.Deck.StrategyMessage,
			Strengths:       tempReview.Deck.Strengths,
			Weaknesses:      tempReview.Deck.Weaknesses,
			PlaystyleTips:   tempReview.Deck.PlaystyleTips,
		},
		Rating:        tempReview.Rating,
		ReviewMessage: tempReview.ReviewMessage,
	}

	// Calculate average elixir if not provided by AI
	if review.Deck.AvgElixir == 0 {
		review.Deck.AvgElixir = deck.CalculateAvgElixir(userDeck)
	}

	// Validate the response
	if err := a.validateReview(&review); err != nil {
		return nil, fmt.Errorf("invalid AI response: %w", err)
	}

	return &review, nil
}

// GenerateDeck - your existing method (unchanged)
func (a *Advisor) GenerateDeck(userCards []types.Card, strategy types.StrategyName, preferredCards []string) (*responses.GenerateDeckResponse, error) {
	ctx := context.Background()
	model := a.client.GenerativeModel("gemini-1.5-flash")

	model.SetTemperature(0.4)
	model.SetMaxOutputTokens(2500)

	// Look up strategy description
	description, ok := types.StrategyDescriptions[strategy]
	if !ok {
		description = string(strategy)
	}

	prompt := fmt.Sprintf(`%s

## DECK BUILDING INPUT:
**USER_CARDS**: %s
**STRATEGY**: %s (%s)  
**PREFERRED_CARDS**: %s

Return only valid JSON matching the GenerateDeckResponse format.`,
		deckGeneratePrompt,
		a.formatUserCardsWithLevels(userCards),
		string(strategy),
		description,
		a.formatPreferredCards(preferredCards),
	)

	resp, err := model.GenerateContent(ctx, genai.Text(prompt))
	if err != nil {
		return nil, fmt.Errorf("gemini API error: %w", err)
	}

	if len(resp.Candidates) == 0 || len(resp.Candidates[0].Content.Parts) == 0 {
		return nil, fmt.Errorf("no response from Gemini")
	}

	raw := string(resp.Candidates[0].Content.Parts[0].(genai.Text))
	clean := a.cleanJSONResponse(raw)

	var response responses.GenerateDeckResponse
	if err := json.Unmarshal([]byte(clean), &response); err != nil {
		return nil, fmt.Errorf("failed to parse AI response: %w\nResponse: %s", err, clean)
	}

	if len(response.Deck.Cards) != 8 {
		return nil, fmt.Errorf("generated deck must have 8 cards, got %d", len(response.Deck.Cards))
	}

	if response.Deck.AvgElixir == 0 {
		response.Deck.AvgElixir = deck.CalculateAvgElixir(response.Deck.Cards)
	}

	return &response, nil
}

// Helper methods

func (a *Advisor) formatUserCardsWithLevels(cards []types.Card) string {
	var builder strings.Builder
	builder.WriteString("[")

	for i, card := range cards {
		if i > 0 {
			builder.WriteString(", ")
		}
		builder.WriteString(fmt.Sprintf(`{"%s": level %d, cost: %d, rarity: "%s"}`,
			card.Name, card.Level, card.ElixirCost, card.Rarity))
	}

	builder.WriteString("]")
	return builder.String()
}

func (a *Advisor) formatPreferredCards(preferred []string) string {
	if len(preferred) == 0 {
		return "None specified"
	}
	return fmt.Sprintf("[%s]", strings.Join(preferred, ", "))
}

// getUserDeckCards converts card names to Card objects
func (a *Advisor) getUserDeckCards(allCards []types.Card, userCardNames []string) []types.Card {
	cardMap := make(map[string]types.Card)
	for _, card := range allCards {
		cardMap[card.Name] = card
	}

	userDeck := make([]types.Card, 0, len(userCardNames))
	for _, name := range userCardNames {
		if card, exists := cardMap[name]; exists {
			userDeck = append(userDeck, card)
		}
	}

	return userDeck
}

// formatCardsForAI formats all available cards for AI processing
func (a *Advisor) formatCardsForAI(cards []types.Card) string {
	var builder strings.Builder
	builder.WriteString("[")

	for i, card := range cards {
		if i > 0 {
			builder.WriteString(", ")
		}
		builder.WriteString(fmt.Sprintf(`{"%s": %d elixir, rarity: "%s"}`,
			card.Name, card.ElixirCost, card.Rarity))
	}

	builder.WriteString("]")
	return builder.String()
}

// formatUserDeckForAI formats the user's specific deck
func (a *Advisor) formatUserDeckForAI(deck []types.Card) string {
	names := make([]string, len(deck))
	for i, card := range deck {
		names[i] = fmt.Sprintf("%s (%d elixir)", card.Name, card.ElixirCost)
	}
	return strings.Join(names, ", ")
}

// cleanJSONResponse removes markdown formatting from AI response
func (a *Advisor) cleanJSONResponse(raw string) string {
	clean := strings.TrimSpace(raw)
	clean = strings.TrimPrefix(clean, "```json")
	clean = strings.TrimPrefix(clean, "```")
	clean = strings.TrimSuffix(clean, "```")
	return strings.TrimSpace(clean)
}

// validateReview ensures the AI response meets quality standards
func (a *Advisor) validateReview(review *types.Review) error {
	if review.Rating < 1 || review.Rating > 10 {
		return fmt.Errorf("rating %f out of valid range (1-10)", review.Rating)
	}

	if len(review.ReviewMessage) < 50 {
		return fmt.Errorf("review message too short (minimum 50 chars)")
	}

	if len(review.Deck.Cards) != 8 {
		return fmt.Errorf("deck must have exactly 8 cards, got %d", len(review.Deck.Cards))
	}

	if len(review.Deck.Strengths) == 0 {
		return fmt.Errorf("strengths cannot be empty")
	}

	if len(review.Deck.Weaknesses) == 0 {
		return fmt.Errorf("weaknesses cannot be empty")
	}

	return nil
}
