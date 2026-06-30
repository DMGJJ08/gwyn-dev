(function() {
  window.enemyRegistry = window.enemyRegistry || {};
  window.enemyRegistry["Pharaoh Mummy"] = {
    name: "Pharaoh Mummy",
    type: "boss",
    stage: 3,
    hpFormula: (lvlOffset) => 1800,
    speed: 25,
    damageFormula: (lvlOffset) => 42,
    xpReward: 1000,
    goldRewardFormula: (lvlOffset) => 800,
    sizeMultiplier: 2.2,
    isBoss: true,
    description: "The Stage 3 Boss. An ancient pharaoh mummy with the ability to summon minions.",
    drops: [
      { item: "Pharaoh Mummy Shroud", chance: 0.9000 },
      { item: "Pharaoh Mummy Relic", chance: 0.2000 },
      { item: "Pharaoh Mummy Scarab", chance: 0.0500 },
      { item: "Pharaoh Mummy Canopic Jar", chance: 0.0300 },
      { item: "Pharaoh Mummy Crook and Flail", chance: 0.0008 },
      { item: "Pharaoh Mummy Card", chance: 0.0002 }
    ]
  };
})();

