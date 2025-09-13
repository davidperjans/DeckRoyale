package ai

import "github.com/davidperjans/deckroyale/internal/types"

var StrategyAIRequirements = map[types.StrategyName]string{
	// Cycle
	types.Cycle: `- The average elixir cost MUST be between 2.5 and 3.3.
- Do NOT include any card that costs more than 5 elixir.
- The deck must have at least one low-cost win condition (e.g., Hog Rider, Miner, Goblin Barrel, Wall Breakers, Mortar, etc.).
- Include at least two cheap cycle cards (e.g., Skeletons, Ice Spirit, Fire Spirits, Bats).
- Include at least one direct damage spell (e.g., Fireball, Poison, Rocket, The Log, Zap).
- Ensure fast rotations and the ability to out-cycle the opponent’s counters.
- Do NOT mix in heavy, beatdown, or control archetype cards.
- All cards must be available to the player at the specified level.`,

	// Beatdown
	types.Beatdown: `- The average elixir cost should be between 3.8 and 4.8.
- Include at least one high-elixir tank win condition (e.g., Golem, Giant, Lava Hound, Electro Giant, Pekka).
- Include at least one support troop (e.g., Night Witch, Baby Dragon, Electro Dragon, Wizard).
- Include at least one cheap cycle card for defense (e.g., Skeletons, Ice Spirit, Bats).
- Include at least one spell for support (e.g., Lightning, Fireball, Zap, Arrows).
- Do NOT include more than two cards costing 6 or more elixir.
- Avoid cycle or siege cards.
- All cards must be available to the player at the specified level.`,

	// Control
	types.Control: `- The average elixir cost should be between 3.0 and 4.0.
- Include at least one control win condition (e.g., Miner, Royal Ghost, Cannon Cart, Graveyard).
- Include at least two strong defensive cards (e.g., Tornado, Valkyrie, Bowler, Ice Wizard).
- Include at least one small spell (e.g., Log, Zap, Snowball) and one medium/large spell (e.g., Poison, Fireball, Lightning).
- Ensure the deck can defend against both air and ground pushes.
- Avoid heavy tanks or cycle win conditions.
- All cards must be available to the player at the specified level.`,

	// Defensive
	types.Defensive: `- The average elixir cost should be between 3.0 and 4.2.
- Include at least two defensive buildings (e.g., Cannon, Tesla, Bomb Tower, Inferno Tower).
- Include at least two defensive troops (e.g., Archers, Ice Wizard, Valkyrie, Mega Minion).
- Include at least one spell for defense (e.g., Log, Fireball, Tornado).
- The deck should be able to counter both air and ground threats.
- Avoid heavy tanks or cycle win conditions.
- All cards must be available to the player at the specified level.`,

	// Attacking
	types.Attacking: `- The average elixir cost should be between 3.0 and 4.2.
- Include at least one aggressive win condition (e.g., Hog Rider, Ram Rider, Royal Hogs, Balloon).
- Include at least one support troop (e.g., Musketeer, Electro Spirit, Firecracker).
- Include at least one direct damage spell (e.g., Fireball, Rocket, Poison).
- Ensure the deck can apply constant offensive pressure.
- Avoid heavy tanks or pure cycle cards.
- All cards must be available to the player at the specified level.`,

	// Spamming
	types.Spamming: `- The average elixir cost should be between 2.8 and 3.8.
- Include at least two swarm or spammable cards (e.g., Goblin Gang, Skeleton Army, Bats, Royal Hogs).
- Include at least one win condition that benefits from spamming (e.g., Royal Hogs, Goblin Barrel, Wall Breakers).
- Include at least one spell for support (e.g., Log, Arrows, Fireball).
- Ensure the deck can overwhelm the opponent with multiple threats.
- Avoid heavy tanks or slow cards.
- All cards must be available to the player at the specified level.`,

	// Siege
	types.Siege: `- The average elixir cost should be between 3.0 and 4.2.
- Include at least one siege win condition (e.g., X-Bow, Mortar).
- Include at least two defensive buildings or cards (e.g., Tesla, Cannon, Archers, Ice Spirit).
- Include at least one spell for support (e.g., Log, Fireball, Rocket).
- Ensure the deck can defend and support the siege win condition.
- Avoid heavy tanks or cycle win conditions.
- All cards must be available to the player at the specified level.`,

	// Hybrid
	types.Hybrid: `- The average elixir cost should be between 3.2 and 4.2.
- Include two different win conditions from different archetypes (e.g., Hog Rider + X-Bow, Miner + Balloon).
- Ensure the deck can flexibly switch between strategies based on the matchup.
- Include at least one spell for support (e.g., Fireball, Poison, Log).
- Ensure synergy and avoid conflicting card roles.
- All cards must be available to the player at the specified level.`,
}
