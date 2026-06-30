(function() {
  window.enemyRegistry = window.enemyRegistry || {};
  window.enemyRegistry["Desert Spider"] = {
    name: "Desert Spider",
    type: "spider",
    stage: 3,
    hpFormula: (lvlOffset) => 110 + lvlOffset * 14,
    speed: 80,
    damageFormula: (lvlOffset) => 18 + lvlOffset * 2,
    xpReward: 50,
    goldRewardFormula: (lvlOffset) => 28 + lvlOffset * 3,
    sizeMultiplier: 1.1,
    isBoss: false,
    description: "A large spider that leaps quickly across the sands.",
    drops: [
      { item: "Desert Spider Silk", chance: 0.9000 },
      { item: "Desert Spider Venom", chance: 0.2000 },
      { item: "Desert Spider Spinneret", chance: 0.0500 },
      { item: "Desert Spider Leg", chance: 0.0300 },
      { item: "Desert Spider Mandible", chance: 0.0008 },
      { item: "Desert Spider Card", chance: 0.0002 }
    ]
  };
})();

