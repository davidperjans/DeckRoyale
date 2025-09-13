package unit

import (
	"testing"

	"github.com/davidperjans/deckroyale/internal/deck"
)

var expectedElixirCosts = map[string]int{
	"Archer Queen":     5,
	"Arrows":           3,
	"Baby Dragon":      4,
	"Bandit":           3,
	"Barbarian Barrel": 2,
	"Barbarians":       5,
	"Bats":             2,
	"Battle Healer":    4,
	"Battle Ram":       4,
	"Bomb Tower":       4,
	"Bomber":           2,
	"Bowler":           5,
	"Cannon":           3,
	"Cannon Cart":      5,
	"Clone":            3,
	"Dark Prince":      4,
	"Dart Goblin":      3,
	"Earthquake":       3,
	"Electro Dragon":   5,
	"Electro Giant":    8,
	"Electro Spirit":   1,
	"Electro Wizard":   4,
	"Elite Barbarians": 6,
	"Elixir Collector": 6,
	"Elixir Golem":     3,
	"Executioner":      5,
	"Fire Spirit":      1,
	"Fireball":         4,
	"Fisherman":        3,
	"Flying Machine":   4,
	"Freeze":           4,
	"Giant":            5,
	"Giant Skeleton":   6,
	"Giant Snowball":   2,
	"Goblin Barrel":    3,
	"Goblin Cage":      4,
	"Goblin Drill":     4,
	"Goblin Gang":      3,
	"Goblin Giant":     6,
	"Goblin Hut":       4,
	"Goblin":           2,
	"Golden Knight":    4,
	"Golem":            8,
	"Graveyard":        5,
	"Guards":           3,
	"Heal Spirit":      1,
	"Hog Rider":        4,
	"Hunter":           4,
	"Ice Golem":        2,
	"Ice Spirit":       1,
	"Ice Wizard":       3,
	"Inferno Dragon":   4,
	"Inferno Tower":    5,
	"Knight":           3,
	"Lava Hound":       7,
	"Lightning":        6,
	"Lumberjack":       4,
	"Magic Archer":     4,
	"Mega Minion":      3,
	"Mega Knight":      7,
	"Miner":            3,
	"Mini P.E.K.K.A":   4,
	"Minions":          3,
	"Minion Horde":     5,
	"Mirror":           1, // Variable, but 1 for base
	"Mortar":           4,
	"Mother Witch":     4,
	"Musketeer":        4,
	"Night Witch":      4,
	"P.E.K.K.A":        7,
	"Phoenix":          4,
	"Poison":           4,
	"Prince":           5,
	"Princess":         3,
	"Rage":             2,
	"Ram Rider":        5,
	"Rascals":          5,
	"Rocket":           6,
	"Royal Delivery":   3,
	"Royal Ghost":      3,
	"Royal Giant":      6,
	"Royal Hogs":       5,
	"Royal Recruits":   7,
	"Skeleton Army":    3,
	"Skeleton Barrel":  3,
	"Skeleton Dragons": 4,
	"Skeletons":        1,
	"Sparky":           6,
	"Spear Goblins":    2,
	"Tesla":            4,
	"The Log":          2,
	"Three Musketeers": 9,
	"Tornado":          3,
	"Valkyrie":         4,
	"Wall Breakers":    2,
	"Witch":            5,
	"Wizard":           5,
	"X-Bow":            6,
	"Zappies":          4,
	"Zap":              2,
}

func TestCardElixirCosts(t *testing.T) {
	allCards := expectedElixirCosts

	for name, expected := range allCards {
		card, ok := deck.CardDataByName[name]
		if !ok {
			t.Logf("Card %s not found in CardDataByName", name)
			continue
		}
		if card.ElixirCost != expected {
			t.Errorf("Card %s has elixir cost %d, expected %d", name, card.ElixirCost, expected)
		}
	}
}
