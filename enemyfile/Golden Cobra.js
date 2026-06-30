(function() {
  window.enemyRegistry = window.enemyRegistry || {};
  window.enemyRegistry["Golden Cobra"] = {
    name: "Golden Cobra",
    type: "cobra",
    stage: 3,
    hpFormula: (lvlOffset) => 150 + lvlOffset * 14,
    speed: 85,
    damageFormula: (lvlOffset) => 28 + lvlOffset * 2,
    xpReward: 72,
    goldRewardFormula: (lvlOffset) => 40 + lvlOffset * 4,
    sizeMultiplier: 1.0,
    isBoss: false,
    description: "A quick, striking cobra covered in golden scales.",
    drops: [
      { item: "Golden Cobra Scale", chance: 0.9000 },
      { item: "Golden Cobra Venom", chance: 0.2000 },
      { item: "Golden Cobra Skin", chance: 0.0500 },
      { item: "Golden Cobra Fang", chance: 0.0300 },
      { item: "Golden Cobra Hood", chance: 0.0008 },
      { item: "Golden Cobra Card", chance: 0.0002 }
    ]
  };
})();

