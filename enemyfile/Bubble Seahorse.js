(function() {
  window.enemyRegistry = window.enemyRegistry || {};
  window.enemyRegistry["Bubble Seahorse"] = {
    name: "Bubble Seahorse",
    type: "seahorse",
    stage: 2,
    hpFormula: (lvlOffset) => 85 + lvlOffset * 9,
    speed: 55,
    damageFormula: (lvlOffset) => 10 + lvlOffset,
    xpReward: 32,
    goldRewardFormula: (lvlOffset) => 16 + lvlOffset * 2,
    sizeMultiplier: 1.0,
    isBoss: false,
    description: "A swift seahorse that fires rapid bubbles.",
    drops: [
      { item: "Bubble Seahorse Fin", chance: 0.9000 },
      { item: "Bubble Seahorse Scale", chance: 0.2000 },
      { item: "Bubble Seahorse Snout", chance: 0.0500 },
      { item: "Bubble Seahorse Coral", chance: 0.0300 },
      { item: "Bubble Seahorse Crown", chance: 0.0008 },
      { item: "Bubble Seahorse Card", chance: 0.0002 }
    ]
  };
})();

