(function() {
  window.enemyRegistry = window.enemyRegistry || {};
  window.enemyRegistry["Poison Scorpion"] = {
    name: "Poison Scorpion",
    type: "scorpion",
    stage: 3,
    hpFormula: (lvlOffset) => 130 + lvlOffset * 16,
    speed: 70,
    damageFormula: (lvlOffset) => 24 + lvlOffset * 2,
    xpReward: 60,
    goldRewardFormula: (lvlOffset) => 32 + lvlOffset * 3,
    sizeMultiplier: 1.0,
    isBoss: false,
    description: "A venomous desert scorpion with a deadly stinger.",
    drops: [
      { item: "Poison Scorpion Chitin", chance: 0.9000 },
      { item: "Poison Scorpion Venom", chance: 0.2000 },
      { item: "Poison Scorpion Stinger", chance: 0.0500 },
      { item: "Poison Scorpion Pincer", chance: 0.0300 },
      { item: "Poison Scorpion Carapace", chance: 0.0008 },
      { item: "Poison Scorpion Card", chance: 0.0002 }
    ]
  };
})();

