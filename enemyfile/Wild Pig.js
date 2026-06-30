(function() {
  window.enemyRegistry = window.enemyRegistry || {};
  window.enemyRegistry["Wild Pig"] = {
    name: "Wild Pig",
    type: "pig",
    stage: 1,
    hpFormula: (lvlOffset) => 45 + lvlOffset * 6,
    speed: 45,
    damageFormula: (lvlOffset) => 8 + lvlOffset * 2,
    xpReward: 18,
    goldRewardFormula: (lvlOffset) => 9 + lvlOffset * 2,
    sizeMultiplier: 1.0,
    isBoss: false,
    description: "A sturdy wild pig. Slow but packing a heavier punch.",
    drops: [
      { item: "Wild Pig Pork", chance: 0.9000 },
      { item: "Wild Pig Hide", chance: 0.2000 },
      { item: "Wild Pig Snout", chance: 0.0500 },
      { item: "Wild Pig Tusk", chance: 0.0300 },
      { item: "Wild Pig Hoof", chance: 0.0008 },
      { item: "Wild Pig Card", chance: 0.0002 }
    ]
  };
})();

