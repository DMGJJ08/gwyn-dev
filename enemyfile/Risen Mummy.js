(function() {
  window.enemyRegistry = window.enemyRegistry || {};
  window.enemyRegistry["Risen Mummy"] = {
    name: "Risen Mummy",
    type: "mummy",
    stage: 3,
    hpFormula: (lvlOffset) => 250 + lvlOffset * 22,
    speed: 40,
    damageFormula: (lvlOffset) => 22 + lvlOffset,
    xpReward: 85,
    goldRewardFormula: (lvlOffset) => 48 + lvlOffset * 4,
    sizeMultiplier: 1.3,
    isBoss: false,
    description: "An ancient mummy resurrected. Very slow but possesses immense health.",
    drops: [
      { item: "Risen Mummy Bandage", chance: 0.9000 },
      { item: "Risen Mummy Dust", chance: 0.2000 },
      { item: "Risen Mummy Wrap", chance: 0.0500 },
      { item: "Risen Mummy Amulet", chance: 0.0300 },
      { item: "Risen Mummy Heart", chance: 0.0008 },
      { item: "Risen Mummy Card", chance: 0.0002 }
    ]
  };
})();

