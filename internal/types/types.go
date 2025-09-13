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
	ID         int    `json:"id"`
	Name       string `json:"name"`
	Level      int    `json:"level"`
	Rarity     string `json:"rarity"`
	Type       string `json:"type"`
	ElixirCost int    `json:"elixirCost"`
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
	Medium          string `json:"medium"`
	EvolutionMedium string `json:"evolution_medium"`
}

///
///
///

type StrategyName string

const (
	Cycle     StrategyName = "cycle"
	Defensive StrategyName = "defensive"
	Attacking StrategyName = "attacking"
	Spamming  StrategyName = "spamming"
	Control   StrategyName = "control"
	Beatdown  StrategyName = "beatdown"
	Siege     StrategyName = "siege"
	Hybrid    StrategyName = "hybrid"
)

var StrategyDescriptions = map[StrategyName]string{
	Cycle:     "Fast-paced, low elixir cards for quick rotations",
	Defensive: "Focus on countering and building up strong pushes",
	Attacking: "Aggressive play with high-damage troops and spells",
	Spamming:  "Overwhelm opponents with multiple troops and constant pressure",
	Control:   "Strategic positioning and spell usage for board control",
	Beatdown:  "Build up massive pushes with high-elixir tanks",
	Siege:     "Use buildings and long-range troops to control the game",
	Hybrid:    "Adaptable strategy combining multiple playstyles",
}

//
//
//
