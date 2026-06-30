(function() {
  window.enemyRegistry = window.enemyRegistry || {};
  window.enemyRegistry["Rambunctious Sheep"] = {
    name: "Rambunctious Sheep",
    type: "sheep",
    stage: 1,
    hpFormula: (lvlOffset) => 70 + lvlOffset * 8,
    speed: 32,
    damageFormula: (lvlOffset) => 6 + lvlOffset,
    xpReward: 25,
    goldRewardFormula: (lvlOffset) => 15 + lvlOffset * 3,
    sizeMultiplier: 1.0,
    isBoss: false,
    description: "A bouncy sheep that rams opponents. Sturdy and carries decent gold.",
    drops: [
      { item: "Rambunctious Sheep Wool", chance: 0.9000 },
      { item: "Rambunctious Sheep Milk", chance: 0.2000 },
      { item: "Rambunctious Sheep Horn", chance: 0.0500 },
      { item: "Rambunctious Sheep Fleece", chance: 0.0300 },
      { item: "Rambunctious Sheep Bell", chance: 0.0008 },
      { item: "Rambunctious Sheep Card", chance: 0.0002 }
    ]
  };
})();

