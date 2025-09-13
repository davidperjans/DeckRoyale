// Do not touch

package types

//
//
//

type User struct {
	Tag      string `json:"tag"`
	Name     string `json:"name"`
	Level    int    `json:"expLevel"`
	Trophies int    `json:"trophies"`
	Clan     Clan   `json:"clan"`
	Cards    []Card `json:"cards"`
}

//
//
//

type Clan struct {
	Tag  string `json:"tag"`
	Name string `json:"name"`
}

//
//
//

type Card struct {
	ID         int      `json:"id"`
	Name       string   `json:"name"`
	ElixirCost int      `db:"elixir" json:"elixirCost"`
	Rarity     string   `json:"rarity"`
	IconURL    IconUrls `db:"icon_url" json:"iconUrls"`

	Level int `json:"level,omitempty"`
}

//
//
//

type Deck struct {
	Cards     []Card       `json:"cards"`
	Strategy  StrategyName `json:"strategy,omitempty"`
	AvgElixir float64      `json:"avgElixir,omitempty"`
}

///
///
///

type IconUrls struct {
	Medium          string `db:"medium" json:"medium"`
	EvolutionMedium string `db:"evolution_medium" json:"evolutionMedium,omitempty"`
}

///
///
///

type StrategyName string

const (
	CycleStrategy     StrategyName = "cycle"
	DefensiveStrategy StrategyName = "defensive"
	AttackingStrategy StrategyName = "attacking"
	SpammingStrategy  StrategyName = "spamming"
	ControlStrategy   StrategyName = "control"
	BeatdownStrategy  StrategyName = "beatdown"
	SiegeStrategy     StrategyName = "siege"
	HybridStrategy    StrategyName = "hybrid"
)

var StrategyDescriptions = map[StrategyName]string{
	CycleStrategy:     "Fast-paced, low elixir cards for quick rotations",
	DefensiveStrategy: "Focus on countering and building up strong pushes",
	AttackingStrategy: "Aggressive play with high-damage troops and spells",
	SpammingStrategy:  "Overwhelm opponents with multiple troops and constant pressure",
	ControlStrategy:   "Strategic positioning and spell usage for board control",
	BeatdownStrategy:  "Build up massive pushes with high-elixir tanks",
	SiegeStrategy:     "Use buildings and long-range troops to control the game",
	HybridStrategy:    "Adaptable strategy combining multiple playstyles",
}

///
///
///

type CardRole string

const (
	WinCondition CardRole = "win_condition"
	Tank         CardRole = "tank"
	Support      CardRole = "support"
	AntiAir      CardRole = "anti_air"
	AntiGround   CardRole = "anti_ground"
	Swarm        CardRole = "swarm"
	Cycle        CardRole = "cycle"
	Building     CardRole = "building"
	SmallSpell   CardRole = "small_spell"
	MediumSpell  CardRole = "medium_spell"
	LargeSpell   CardRole = "large_spell"
	Utility      CardRole = "utility"
)

//
//
//

// type EnhancedCard struct {
// 	Card
// 	Roles     []CardRole     `json:"roles"`
// 	Synergies []string       `json:"synergies,omitempty"`
// 	Counters  []string       `json:"counters,omitempty"`
// 	Archetype []StrategyName `json:"archetype"`
// }

///
///
///

type DeckTemplate struct {
	RequiredRoles     map[CardRole]int `json:"required_roles"`
	PreferredRoles    map[CardRole]int `json:"preferred_roles"`
	ForbiddenRoles    []CardRole       `json:"forbidden_roles"`
	ElixirRange       [2]float64       `json:"elixir_range"`
	MaxHighCost       int              `json:"max_high_cost"`
	RequiredSynergies [][]string       `json:"required_synergies"`
}
