(function() {
  window.enemyRegistry = window.enemyRegistry || {};
  window.enemyRegistry["Deepwater Kraken"] = {
    name: "Deepwater Kraken",
    type: "boss",
    stage: 2,
    hpFormula: (lvlOffset) => 850,
    speed: 35,
    damageFormula: (lvlOffset) => 25,
    xpReward: 400,
    goldRewardFormula: (lvlOffset) => 300,
    sizeMultiplier: 2.2,
    isBoss: true,
    description: "The Stage 2 Boss. A legendary sea monster of colossal power.",
    drops: [
      { item: "Deepwater Kraken Ink", chance: 0.9000 },
      { item: "Deepwater Kraken Tentacle", chance: 0.2000 },
      { item: "Deepwater Kraken Suction Cup", chance: 0.0500 },
      { item: "Deepwater Kraken Eye", chance: 0.0300 },
      { item: "Deepwater Kraken Beak", chance: 0.0008 },
      { item: "Deepwater Kraken Card", chance: 0.0002 }
    ]
  };
})();

