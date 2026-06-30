(function() {
  window.enemyRegistry = window.enemyRegistry || {};
  window.enemyRegistry["Giant Angry Bull"] = {
    name: "Giant Angry Bull",
    type: "boss",
    stage: 1,
    hpFormula: (lvlOffset) => 350,
    speed: 45,
    damageFormula: (lvlOffset) => 14,
    xpReward: 150,
    goldRewardFormula: (lvlOffset) => 100,
    sizeMultiplier: 2.2,
    isBoss: true,
    description: "The Stage 1 Boss. A massive angry bull that charges relentlessly.",
    drops: [
      { item: "Giant Angry Bull Hide", chance: 0.9000 },
      { item: "Giant Angry Bull Beef", chance: 0.2000 },
      { item: "Giant Angry Bull Horn", chance: 0.0500 },
      { item: "Giant Angry Bull Hoof", chance: 0.0300 },
      { item: "Giant Angry Bull Nose Ring", chance: 0.0008 },
      { item: "Giant Angry Bull Card", chance: 0.0002 }
    ]
  };
})();

