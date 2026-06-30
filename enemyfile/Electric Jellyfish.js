(function() {
  window.enemyRegistry = window.enemyRegistry || {};
  window.enemyRegistry["Electric Jellyfish"] = {
    name: "Electric Jellyfish",
    type: "jellyfish",
    stage: 2,
    hpFormula: (lvlOffset) => 65 + lvlOffset * 8,
    speed: 40,
    damageFormula: (lvlOffset) => 12 + lvlOffset,
    xpReward: 30,
    goldRewardFormula: (lvlOffset) => 14 + lvlOffset * 2,
    sizeMultiplier: 1.0,
    isBoss: false,
    description: "A floating aquatic horror that zaps its targets.",
    drops: [
      { item: "Electric Jellyfish Tentacle", chance: 0.9000 },
      { item: "Electric Jellyfish Slime", chance: 0.2000 },
      { item: "Electric Jellyfish Glow-cap", chance: 0.0500 },
      { item: "Electric Jellyfish Stinger", chance: 0.0300 },
      { item: "Electric Jellyfish Core", chance: 0.0008 },
      { item: "Electric Jellyfish Card", chance: 0.0002 }
    ]
  };
})();

