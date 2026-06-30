(function() {
  window.enemyRegistry = window.enemyRegistry || {};
  window.enemyRegistry["Armored Crab"] = {
    name: "Armored Crab",
    type: "crab",
    stage: 2,
    hpFormula: (lvlOffset) => 110 + lvlOffset * 12,
    speed: 50,
    damageFormula: (lvlOffset) => 15 + lvlOffset * 2,
    xpReward: 38,
    goldRewardFormula: (lvlOffset) => 18 + lvlOffset * 3,
    sizeMultiplier: 1.0,
    isBoss: false,
    description: "A heavily armored crab with crushing claws and high durability.",
    drops: [
      { item: "Armored Crab Shell", chance: 0.9000 },
      { item: "Armored Crab Meat", chance: 0.2000 },
      { item: "Armored Crab Claw", chance: 0.0500 },
      { item: "Armored Crab Pincer", chance: 0.0300 },
      { item: "Armored Crab Carapace", chance: 0.0008 },
      { item: "Armored Crab Card", chance: 0.0002 }
    ]
  };
})();

