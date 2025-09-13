package ai

import "github.com/davidperjans/deckroyale/internal/types"

var StrategyAIRequirements = map[types.StrategyName]string{
	// Cycle
	types.CycleStrategy: `- The average elixir cost MUST be between 2.5 and 3.3.
- Do NOT include any card that costs more than 5 elixir.
- The deck must have at least one low-cost win condition (e.g., Hog Rider, Miner, Goblin Barrel, Wall Breakers, Mortar, etc.).
- Include at least two cheap cycle cards (e.g., Skeletons, Ice Spirit, Fire Spirits, Bats).
- Include at least one direct damage spell (e.g., Fireball, Poison, Rocket, The Log, Zap).
- Include at least one reliable air defense card (e.g., Musketeer, Archers, Bats, Firecracker).
- Ensure fast rotations and the ability to out-cycle the opponent's counters.
- Do NOT mix in heavy, beatdown, or control archetype cards.
- All cards must be available to the player at the specified level.`,

	// Beatdown
	types.BeatdownStrategy: `- The average elixir cost should be between 3.8 and 5.0.
- Include at least one high-elixir tank win condition (e.g., Golem, Giant, Lava Hound, Electro Giant, Pekka, Mega Knight).
- Include at least one support troop (e.g., Night Witch, Baby Dragon, Electro Dragon, Wizard, Musketeer).
- Include at least one cheap cycle card for defense and elixir management (e.g., Skeletons, Ice Spirit, Bats).
- Include at least one spell for support pushes (e.g., Lightning, Fireball, Zap, Arrows, Rage).
- Do NOT include more than two cards costing 6 or more elixir.
- Avoid cycle or siege cards that conflict with the heavy push strategy.
- All cards must be available to the player at the specified level.`,

	// Control
	types.ControlStrategy: `- The average elixir cost should be between 3.2 and 4.2.
- Include at least one control win condition (e.g., Miner, Royal Ghost, Cannon Cart, Graveyard, Magic Archer).
- Include at least two strong defensive cards (e.g., Tornado, Valkyrie, Bowler, Ice Wizard, Dark Prince).
- Include at least one small spell (e.g., Log, Zap, Snowball) and one medium/large spell (e.g., Poison, Fireball, Lightning).
- Ensure the deck can defend against both air and ground pushes effectively.
- Include at least one anti-swarm card (e.g., Valkyrie, Dark Prince, Baby Dragon).
- Focus on positive elixir trades and counter-attacking rather than direct aggression.
- Avoid heavy tanks or pure cycle win conditions.
- All cards must be available to the player at the specified level.`,

	// Defensive
	types.DefensiveStrategy: `- The average elixir cost should be between 3.2 and 4.4.
- Include at least two defensive buildings (e.g., Cannon, Tesla, Bomb Tower, Inferno Tower, Mortar).
- Include at least two defensive troops with different roles (e.g., Archers, Ice Wizard, Valkyrie, Mega Minion).
- Include at least one spell for defensive support (e.g., Log, Fireball, Tornado, Arrows).
- The deck must counter both air and ground threats effectively.
- Include at least one anti-swarm defensive option.
- Include one reliable win condition for counter-attacks (e.g., Miner, Hog Rider, Balloon).
- Avoid heavy tanks or aggressive cycle cards that compromise defensive capabilities.
- All cards must be available to the player at the specified level.`,

	// Attacking
	types.AttackingStrategy: `- The average elixir cost should be between 3.0 and 4.0.
- Include at least one fast, aggressive win condition (e.g., Hog Rider, Ram Rider, Royal Hogs, Balloon, Battle Ram).
- Include at least one support troop for pushes (e.g., Musketeer, Electro Spirit, Firecracker, Valkyrie).
- Include at least one direct damage spell for finishing towers (e.g., Fireball, Rocket, Poison, Lightning).
- Include at least one small spell for clearing defensive troops (e.g., Log, Zap, Arrows).
- Ensure the deck can apply constant offensive pressure and punish opponent's investments.
- Focus on quick, repeated attacks rather than single large pushes.
- Avoid heavy tanks or purely defensive cards that slow down aggression.
- All cards must be available to the player at the specified level.`,

	// Spamming
	types.SpammingStrategy: `- The average elixir cost should be between 2.8 and 3.6.
- Include at least two swarm or spammable cards (e.g., Goblin Gang, Skeleton Army, Bats, Royal Hogs, Goblin Barrel).
- Include at least one win condition that benefits from overwhelming strategies (e.g., Royal Hogs, Goblin Barrel, Wall Breakers, Miner).
- Include at least one spell for clearing counters to swarms (e.g., Log, Arrows, Fireball, Zap).
- Include at least one card that can tank for swarm units (e.g., Knight, Valkyrie, Ice Golem).
- Ensure the deck can overwhelm the opponent with multiple simultaneous threats.
- Focus on quantity over individual card strength.
- Avoid heavy tanks or slow, expensive cards.
- All cards must be available to the player at the specified level.`,

	// Siege
	types.SiegeStrategy: `- The average elixir cost should be between 3.0 and 4.0.
- Include at least one siege win condition (e.g., X-Bow, Mortar).
- Include at least two defensive buildings or structures (e.g., Tesla, Cannon, Inferno Tower).
- Include at least two anti-air defensive cards (e.g., Archers, Musketeer, Ice Wizard).
- Include at least one spell for clearing defensive troops (e.g., Log, Fireball, Rocket, Arrows).
- Include cheap cycle cards to protect and re-deploy siege weapons (e.g., Ice Spirit, Skeletons).
- Ensure strong defensive capabilities to protect the siege weapon.
- Focus on controlling space and defending rather than direct rushing.
- Avoid heavy tanks or aggressive cycle cards that don't support siege gameplay.
- All cards must be available to the player at the specified level.`,

	// Hybrid
	types.HybridStrategy: `- The average elixir cost should be between 3.2 and 4.2.
- Include two different win conditions from different archetypes (e.g., Hog Rider + X-Bow, Miner + Balloon, Giant + Graveyard).
- Ensure both win conditions can be supported by the same deck cards when possible.
- Include at least one spell that supports both strategies (e.g., Fireball, Poison, Log).
- Include versatile defensive cards that work in multiple scenarios (e.g., Musketeer, Valkyrie, Tesla).
- Ensure the deck can flexibly switch between strategies based on matchup and game state.
- Maintain synergy between cards while avoiding conflicting roles or redundancy.
- Balance the elixir cost to support both strategies without being too heavy.
- All cards must be available to the player at the specified level.`,
}
