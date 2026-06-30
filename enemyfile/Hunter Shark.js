(function() {
  window.enemyRegistry = window.enemyRegistry || {};
  window.enemyRegistry["Hunter Shark"] = {
    name: "Hunter Shark",
    type: "shark",
    stage: 2,
    hpFormula: (lvlOffset) => 140 + lvlOffset * 15,
    speed: 75,
    damageFormula: (lvlOffset) => 20 + lvlOffset * 3,
    xpReward: 55,
    goldRewardFormula: (lvlOffset) => 30 + lvlOffset * 4,
    sizeMultiplier: 1.0,
    isBoss: false,
    description: "An apex aquatic predator. Extremely fast and highly lethal.",
    drops: [
      { item: "Hunter Shark Tooth", chance: 0.9000 },
      { item: "Hunter Shark Fin", chance: 0.2000 },
      { item: "Hunter Shark Skin", chance: 0.0500 },
      { item: "Hunter Shark Cartilage", chance: 0.0300 },
      { item: "Hunter Shark Jaw", chance: 0.0008 },
      { item: "Hunter Shark Card", chance: 0.0002 }
    ]
  };
})();

