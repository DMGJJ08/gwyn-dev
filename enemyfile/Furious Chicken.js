(function() {
  window.enemyRegistry = window.enemyRegistry || {};
  window.enemyRegistry["Furious Chicken"] = {
    name: "Furious Chicken",
    type: "chicken",
    stage: 1,
    hpFormula: (lvlOffset) => 25 + lvlOffset * 4,
    speed: 95,
    damageFormula: (lvlOffset) => 4 + lvlOffset,
    xpReward: 12,
    goldRewardFormula: (lvlOffset) => 5 + lvlOffset,
    sizeMultiplier: 1.0,
    isBoss: false,
    description: "A very angry chicken that pecks furiously. Fast but fragile.",
    drops: [
      { item: "Furious Chicken Feather", chance: 0.9000 },
      { item: "Furious Chicken Egg", chance: 0.2000 },
      { item: "Furious Chicken Beak", chance: 0.0500 },
      { item: "Furious Chicken Talon", chance: 0.0300 },
      { item: "Furious Chicken Crest", chance: 0.0008 },
      { item: "Furious Chicken Card", chance: 0.0002 }
    ]
  };
})();

