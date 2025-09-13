package clash

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"strings"

	"github.com/davidperjans/deckroyale/internal/middleware"
	"github.com/davidperjans/deckroyale/internal/types"
)

type Service interface {
	GetPlayer(playerTag string) (*types.User, error)
}

type ClashService struct {
	apiKey string
}

func NewClashService(apiKey string) *ClashService {
	return &ClashService{apiKey}
}

func (cs *ClashService) GetPlayer(playerTag string) (*types.User, error) {
	if !strings.HasPrefix(playerTag, "#") {
		playerTag = "#" + playerTag
	}

	encodedTag := url.PathEscape(playerTag)
	fullURL := fmt.Sprintf("https://api.clashroyale.com/v1/players/%s", encodedTag)

	request, _ := http.NewRequest("GET", fullURL, nil)
	request.Header.Add("Authorization", "Bearer "+cs.apiKey)

	response, err := http.DefaultClient.Do(request)
	if err != nil {
		return nil, err
	}

	defer response.Body.Close()

	if response.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("clash api error: %s", response.Status)
	}

	var player types.User
	if err := json.NewDecoder(response.Body).Decode(&player); err != nil {
		return nil, err
	}

	player.Cards = middleware.NormalizeCards(player.Cards)

	return &player, nil
}
