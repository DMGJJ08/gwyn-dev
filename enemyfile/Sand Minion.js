(function() {
  window.enemyRegistry = window.enemyRegistry || {};
  window.enemyRegistry["Sand Minion"] = {
    name: "Sand Minion",
    type: "mummy",
    stage: 3,
    hpFormula: (lvlOffset) => 60,
    speed: 45,
    damageFormula: (lvlOffset) => 14,
    xpReward: 0,
    goldRewardFormula: (lvlOffset) => 0,
    sizeMultiplier: 1.1,
    isBoss: false,
    description: "A minion mummy summoned by the Pharaoh.",
    drops: [
      { item: "Sand Minion Sand", chance: 0.9000 },
      { item: "Sand Minion Shard", chance: 0.2000 },
      { item: "Sand Minion Bandage", chance: 0.0500 },
      { item: "Sand Minion Core", chance: 0.0300 },
      { item: "Sand Minion Mask", chance: 0.0008 },
      { item: "Sand Minion Card", chance: 0.0002 }
    ]
  };
})();

