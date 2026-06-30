// Project GWYN - Entities and Projectiles Classes

// Global Ground Y coordinate (updated dynamically in game.js)
let groundY = 160;

// Dynamic SVG Generator for Enemy Drops (Related to drop name, no background)
window.getDropSVG = function(name) {
  let color = "#fff";
  let path = "";
  
  if (name.includes("Feather")) {
    color = "#e0f0ff";
    path = `<path d="M6,26 C6,26 12,20 18,12 C20,9 23,4 26,2 C26,2 25,6 23,10 C18,18 10,24 10,24 L10,28 L6,26 Z" fill="${color}" stroke="#000" stroke-width="1.5"/><path d="M10,24 C14,21 21,14 26,2 C21,8 14,17 10,24 Z" fill="none" stroke="#fff" stroke-width="1"/>`;
  } else if (name.includes("Egg")) {
    color = "#fff5e0";
    path = `<ellipse cx="16" cy="17" rx="9" ry="12" fill="${color}" stroke="#000" stroke-width="1.5"/><path d="M12,14 C12,14 14,10 16,10 C18,10 19,13 19,13" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>`;
  } else if (name.includes("Pork") || name.includes("Meat") || name.includes("Beef")) {
    color = "#ff6b6b";
    path = `<path d="M8,18 C6,12 12,6 18,8 C24,10 26,16 24,22 C22,28 14,26 8,18 Z" fill="${color}" stroke="#000" stroke-width="1.5"/><path d="M12,12 C14,10 18,12 18,14 C18,16 14,18 12,18 C10,18 10,14 12,12 Z" fill="#fff" opacity="0.8"/>`;
  } else if (name.includes("Hide") || name.includes("Skin") || name.includes("Fleece") || name.includes("Wool")) {
    color = "#d2b48c";
    path = `<path d="M6,10 C4,16 4,22 8,26 C12,24 14,28 18,28 C22,28 24,24 28,26 C28,20 28,14 24,10 C20,12 18,8 14,8 C10,8 8,12 6,10 Z" fill="${color}" stroke="#000" stroke-width="1.5"/>`;
  } else if (name.includes("Talon") || name.includes("Claw") || name.includes("Pincer") || name.includes("Snout") || name.includes("Tooth") || name.includes("Horn") || name.includes("Stinger") || name.includes("Fang") || name.includes("Beak")) {
    color = "#f4f0e6";
    path = `<path d="M8,10 C12,12 24,16 26,24 C20,24 14,20 8,10 Z" fill="${color}" stroke="#000" stroke-width="1.5"/>`;
  } else if (name.includes("Scale") || name.includes("Chitin") || name.includes('Carapace') || name.includes('Shell')) {
    color = "#4dabf7";
    path = `<path d="M16,6 L26,12 L26,20 C26,26 16,30 16,30 C16,30 6,26 6,20 L6,12 Z" fill="${color}" stroke="#000" stroke-width="1.5"/>`;
  } else if (name.includes("Gem") || name.includes("Pearl") || name.includes("Core")) {
    color = "#e599f7";
    path = `<path d="M16,4 L26,14 L16,28 L6,14 Z" fill="${color}" stroke="#000" stroke-width="1.5"/><path d="M16,6 L24,14 L16,24 L8,14 Z" fill="none" stroke="#fff" stroke-width="1.2"/>`;
  } else if (name.includes("Ink") || name.includes("Slime") || name.includes("Venom")) {
    color = "#51cf66";
    path = `<path d="M16,4 C16,4 26,18 24,24 C22,28 10,28 8,24 C6,18 16,4 16,4 Z" fill="${color}" stroke="#000" stroke-width="1.5"/>`;
  } else if (name.includes("Dust") || name.includes("Sand")) {
    color = "#ffd43b";
    path = `<path d="M10,8 L22,8 L18,16 L22,24 L10,24 L14,16 Z" fill="${color}" stroke="#000" stroke-width="1.5"/><circle cx="16" cy="20" r="2" fill="#fff"/>`;
  } else if (name.includes("Gold") || name.includes("Statue") || name.includes("Mask") || name.includes("Idol")) {
    color = "#fcc419";
    path = `<path d="M6,24 L26,24 L28,10 L20,16 L16,8 L12,16 L4,10 Z" fill="${color}" stroke="#000" stroke-width="1.5"/>`;
  } else if (name.includes("Jar") || name.includes("Amulet") || name.includes("Relic") || name.includes("Bell") || name.includes("Signet")) {
    color = "#ffa94d";
    path = `<path d="M10,12 C10,8 22,8 22,12 L20,24 C20,26 12,26 12,24 Z" fill="${color}" stroke="#000" stroke-width="1.5"/><rect x="12" y="10" width="8" height="3" fill="#ff922b" stroke="#000" stroke-width="1"/>`;
  } else if (name.includes("Bandage") || name.includes("Shroud") || name.includes("Wrap")) {
    color = "#e9ecef";
    path = `<path d="M6,10 L26,14 L24,22 L4,18 Z" fill="${color}" stroke="#000" stroke-width="1.5"/><line x1="10" y1="11" x2="8" y2="19" stroke="#adb5bd" stroke-width="1.5"/>`;
  } else {
    color = "#dee2e6";
    path = `<rect x="6" y="8" width="20" height="16" rx="2" fill="${color}" stroke="#000" stroke-width="1.5"/><line x1="6" y1="14" x2="26" y2="14" stroke="#000" stroke-width="1.5"/>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">${path}</svg>`;
};

window.getEnemySpriteSrc = function(className) {
  const paths = {
    "Furious Chicken": "assets/chicken_sheet.png",
    "Wild Pig": "assets/pig_sheet.png",
    "Rambunctious Sheep": "assets/sheep_sheet.png",
    "Electric Jellyfish": "assets/jellyfish_sheet-removebg-preview.png",
    "Armored Crab": "assets/crab_sheet-removebg-preview.png",
    "Bubble Seahorse": "assets/seahorse_sheet.png",
    "Hunter Shark": "assets/shark_sheet.png",
    "Poison Scorpion": "assets/scorpion_sheet-removebg-preview.png",
    "Golden Cobra": "assets/cobra_sheet.png",
    "Risen Mummy": "assets/Gemini_Generated_Image_qr2tbwqr2tbwqr2t-removebg-preview.png",
    "Desert Spider": "assets/Gemini_Generated_Image_ezxwglezxwglezxw-removebg-preview.png",
    "Sand Minion": "assets/Gemini_Generated_Image_qr2tbwqr2tbwqr2t-removebg-preview.png",
    "Giant Angry Bull": "assets/boss_bull_sheet-removebg-preview.png",
    "Deepwater Kraken": "assets/boss_kraken_sheet.png",
    "Pharaoh Mummy": "assets/Gemini_Generated_Image_c8tik3c8tik3c8ti-removebg-preview.png"
  };
  return paths[className] || "";
};

window.drawEnemyCardSprite = function(canvas, className) {
  const targetSrc = window.getEnemySpriteSrc(className);
  if (!targetSrc) return;
  
  const img = new Image();
  img.onload = () => {
    const ctx = canvas.getContext('2d');
    let sw = 256;
    let sh = 256;
    if (img.width > 0 && img.width <= 600) {
      sw = 125;
      sh = 125;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const size = Math.min(canvas.width, canvas.height) * 0.95;
    const dx = (canvas.width - size) / 2;
    const dy = (canvas.height - size) / 2;
    
    ctx.drawImage(img, 0, 0, sw, sh, dx, dy, size, size);
  };
  img.src = targetSrc;
};

// Material descriptions, cooking compatibility, and recipe combinations database
window.materialDatabase = {
  // Furious Chicken drops
  "Furious Chicken Feather": { desc: "A soft, fluffy white feather. Commonly used for arrow fletching or stuffing pillows.", tag: "Sellable" },
  "Furious Chicken Egg": { desc: "A fresh, nutrient-rich egg. Perfect for baking or breakfast dishes.", tag: "Cooking Material", recipe: "Combines with Pork and Milk for a Hearty Breakfast." },
  "Furious Chicken Beak": { desc: "A sharp, calcified chicken beak. Sellable to crafters for crafting darts.", tag: "Sellable" },
  "Furious Chicken Talon": { desc: "A small bird claw. Useful as an ornament or for low-grade alchemy.", tag: "Sellable" },
  "Furious Chicken Crest": { desc: "A bright red comb crest. Prized by fashionistas for eccentric hat plumes.", tag: "Sellable" },
  
  // Wild Pig drops
  "Wild Pig Pork": { desc: "Tender, juicy pork cutlet. Excellent for roasting or stewing.", tag: "Cooking Material", recipe: "Combines with Beef and Milk for a Savory Meat Loaf." },
  "Wild Pig Hide": { desc: "Thick, coarse pig skin. Can be tanned into durable leather.", tag: "Sellable" },
  "Wild Pig Snout": { desc: "A rubbery pig nose. Smells of dirt and roots. Sellable to bizarre collectors.", tag: "Sellable" },
  "Wild Pig Tusk": { desc: "A curved, sturdy ivory tusk. Used for handles or decorative carvings.", tag: "Sellable" },
  "Wild Pig Hoof": { desc: "A hard, dirty pig hoof. Rich in gelatin, but mostly sold as junk.", tag: "Sellable" },
  
  // Rambunctious Sheep drops
  "Rambunctious Sheep Wool": { desc: "Soft, curly white wool. Ideal for weaving cozy blankets and socks.", tag: "Sellable" },
  "Rambunctious Sheep Milk": { desc: "Rich, creamy sheep's milk. Highly nutritious and makes excellent cheese.", tag: "Cooking Material", recipe: "Combines with Egg and Beef for a Fluffy Custard Pie." },
  "Rambunctious Sheep Horn": { desc: "A spiraled, hollow horn. Can be carved into a war horn or cup.", tag: "Sellable" },
  "Rambunctious Sheep Fleece": { desc: "A thick pelt of unwashed sheep fleece. Smells strongly of lanolin.", tag: "Sellable" },
  "Rambunctious Sheep Bell": { desc: "A small brass bell. Tinks softly. Highly sought after by trinket merchants.", tag: "Sellable" },
  
  // Electric Jellyfish drops
  "Electric Jellyfish Tentacle": { desc: "A translucent tentacle that crackles with static energy. Do not touch barehanded!", tag: "Sellable" },
  "Electric Jellyfish Slime": { desc: "A glowing, viscous slime that retains electrical charge. Useful for batteries.", tag: "Sellable" },
  "Electric Jellyfish Glow-cap": { desc: "The bioluminescent top dome of a jellyfish. Emits a soft blue glow.", tag: "Sellable" },
  "Electric Jellyfish Stinger": { desc: "A tiny, venomous barb. Used by assassins or potion makers for paralysis.", tag: "Sellable" },
  "Electric Jellyfish Core": { desc: "A pulsating orb of pure electricity. Worth a fortune to wizards.", tag: "Sellable" },
  
  // Armored Crab drops
  "Armored Crab Shell": { desc: "A fragment of thick, calcified crab shell. Hard as iron.", tag: "Sellable" },
  "Armored Crab Meat": { desc: "Sweet, succulent crab leg meat. A highly prized delicacy in coastal cities.", tag: "Cooking Material", recipe: "Combines with Milk and Egg for a Royal Crab Bisque." },
  "Armored Crab Claw": { desc: "A heavy, jagged crab claw. Can be adapted into a makeshift hammer.", tag: "Sellable" },
  "Armored Crab Pincer": { desc: "A sharp pincer. Able to snap twigs easily. Sellable to weaponsmiths.", tag: "Sellable" },
  "Armored Crab Carapace": { desc: "A solid shield-like plate from a giant crab. Protects against blunt impact.", tag: "Sellable" },
  
  // Bubble Seahorse drops
  "Bubble Seahorse Fin": { desc: "A thin, iridescent fin that shimmers in the light.", tag: "Sellable" },
  "Bubble Seahorse Scale": { desc: "A small scale that magically traps bubbles. Relished by toy makers.", tag: "Sellable" },
  "Bubble Seahorse Snout": { desc: "A tubular snout that squirts pressurized water. Sellable as a novelty.", tag: "Sellable" },
  "Bubble Seahorse Coral": { desc: "A branching piece of undersea coral. Beautiful ornament for fish tanks.", tag: "Sellable" },
  "Bubble Seahorse Crown": { desc: "A crown-like bony crest. Worth a high price to undersea royalty.", tag: "Sellable" },
  
  // Hunter Shark drops
  "Hunter Shark Tooth": { desc: "A razor-sharp, triangular shark tooth. Makes a fierce necklace.", tag: "Sellable" },
  "Hunter Shark Fin": { desc: "A thick, cartilaginous shark fin. Used in gourmet seafood soups.", tag: "Cooking Material", recipe: "Combines with Crab Meat and Egg for a Premium Shark Fin Soup." },
  "Hunter Shark Skin": { desc: "Coarse shark skin, rough as sandpaper. Used for polishing wood or grip wraps.", tag: "Sellable" },
  "Hunter Shark Cartilage": { desc: "Flexible skeletal material. Used in bone-strengthening ointments.", tag: "Sellable" },
  "Hunter Shark Jaw": { desc: "A large jaw structure displaying rows of serrated teeth. A great trophy.", tag: "Sellable" },
  
  // Poison Scorpion drops
  "Poison Scorpion Chitin": { desc: "Hard, dark purple plates that deflect incoming piercing attacks.", tag: "Sellable" },
  "Poison Scorpion Venom": { desc: "A vial of concentrated scorpion venom. Highly lethal.", tag: "Sellable" },
  "Poison Scorpion Stinger": { desc: "A curved, hollow needle loaded with poison. Sellable to alchemists.", tag: "Sellable" },
  "Poison Scorpion Pincer": { desc: "A powerful crushing claw. Can easily snap bone.", tag: "Sellable" },
  "Poison Scorpion Carapace": { desc: "A full armored back shell. Highly durable and chemical resistant.", tag: "Sellable" },
  
  // Golden Cobra drops
  "Golden Cobra Scale": { desc: "A shimmering golden scale. Worth a decent sum to armor makers.", tag: "Sellable" },
  "Golden Cobra Venom": { desc: "Toxic liquid that causes intense fever. Used in counter-venom potions.", tag: "Sellable" },
  "Golden Cobra Skin": { desc: "Soft, beautiful gold-patterned snake skin. Used for high-end boots.", tag: "Sellable" },
  "Golden Cobra Fang": { desc: "A hollow, curved fang. Still drips with residual heat venom.", tag: "Sellable" },
  "Golden Cobra Hood": { desc: "A wide, flared snake hood. Displays a hypnotic eye-like pattern.", tag: "Sellable" },
  
  // Risen Mummy drops
  "Risen Mummy Bandage": { desc: "Dusty, age-old linen wrap. Smells of ancient myrrh and sand.", tag: "Sellable" },
  "Risen Mummy Dust": { desc: "Cursed gray dust. Used by dark mages to brew decay curses.", tag: "Sellable" },
  "Risen Mummy Wrap": { desc: "Heavily embalmed cloth wrap. Surprisingly strong and flame retardant.", tag: "Sellable" },
  "Risen Mummy Amulet": { desc: "A tarnished bronze amulet. Inscribed with protection spells.", tag: "Sellable" },
  "Risen Mummy Heart": { desc: "A desiccated, magic-infused heart. Beats weakly when near dark magic.", tag: "Sellable" },
  
  // Desert Spider drops
  "Desert Spider Silk": { desc: "Strong, sticky spider silk thread. Can be woven into ultra-light fabrics.", tag: "Sellable" },
  "Desert Spider Venom": { desc: "Acidic poison that melts prey from the inside. Highly volatile.", tag: "Sellable" },
  "Desert Spider Spinneret": { desc: "The silk-producing organ of the spider. Still sticky to the touch.", tag: "Sellable" },
  "Desert Spider Leg": { desc: "A hairy, jointed spider leg. Sharp enough to pierce leather.", tag: "Sellable" },
  "Desert Spider Mandible": { desc: "Chitinous pincers from the spider's mouth. Used to crunch armor.", tag: "Sellable" },
  
  // Sand Minion drops
  "Sand Minion Sand": { desc: "Glowing sand grains that never stay still. Moves like water.", tag: "Sellable" },
  "Sand Minion Shard": { desc: "A fragment of compressed sandstone infused with magic.", tag: "Sellable" },
  "Sand Minion Bandage": { desc: "Rough, coarse cloth wrap caked in sand and grit.", tag: "Sellable" },
  "Sand Minion Core": { desc: "A small swirling vortex of sand holding the minion together.", tag: "Sellable" },
  "Sand Minion Mask": { desc: "A tiny clay faceplate with hollow eyes. A common souvenir.", tag: "Sellable" },
  
  // Giant Angry Bull drops
  "Giant Angry Bull Hide": { desc: "Extra-thick bull hide. Used to make heavy boots and shields.", tag: "Sellable" },
  "Giant Angry Bull Beef": { desc: "Prime cut of marbled beef. High protein and rich flavor.", tag: "Cooking Material", recipe: "Combines with Pork and Egg for a Giant Meatball Feast." },
  "Giant Angry Bull Horn": { desc: "A massive, pointed horn. Can be polished and sold as a war trophy.", tag: "Sellable" },
  "Giant Angry Bull Hoof": { desc: "A heavy, split hoof that cracked the ground. Sellable as scrap.", tag: "Sellable" },
  "Giant Angry Bull Nose Ring": { desc: "A heavy brass ring. Symbol of the bull's containment.", tag: "Sellable" },
  
  // Deepwater Kraken drops
  "Deepwater Kraken Ink": { desc: "Pitch-black, sticky ink. Can be used for writing scrolls or blinding foes.", tag: "Sellable" },
  "Deepwater Kraken Tentacle": { desc: "A gigantic, muscular tentacle. Can feed an entire village when grilled.", tag: "Cooking Material", recipe: "Combines with Egg and Pork for a Grilled Kraken Platter." },
  "Deepwater Kraken Suction Cup": { desc: "Rubbery, circular suction cups. A chewy and exotic seafood treat.", tag: "Cooking Material", recipe: "Combines with Crab Meat and Milk for a Creamy Kraken Chowder." },
  "Deepwater Kraken Eye": { desc: "A massive, glossy eye that can see in pitch darkness.", tag: "Sellable" },
  "Deepwater Kraken Beak": { desc: "A razor-sharp beak that can crush ship hulls.", tag: "Sellable" },
  
  // Pharaoh Mummy drops
  "Pharaoh Mummy Shroud": { desc: "Gold-threaded linen cloth that wrapped the royal mummy.", tag: "Sellable" },
  "Pharaoh Mummy Relic": { desc: "An ornate scarab made of solid gold and lapis lazuli. Worth a fortune!", tag: "Sellable" },
  "Pharaoh Mummy Scarab": { desc: "A jeweled ornament depicting the sacred dung beetle.", tag: "Sellable" },
  "Pharaoh Mummy Canopic Jar": { desc: "A clay jar adorned with a jackal head. Contains ancient organs.", tag: "Sellable" },
  "Pharaoh Mummy Crook and Flail": { desc: "The twin symbols of royal authority in ancient Egypt.", tag: "Sellable" }
};

// Key out background checkerboard colors to create true transparency
function removeCheckeredBackground(image) {
  const canvas = document.createElement('canvas');
  canvas.width = image.width;
  canvas.height = image.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);
  
  const isRemoveBg = image.src && image.src.includes('removebg');
  
  try {
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;
    
    const cellW = Math.floor(canvas.width / 4);
    const cellH = Math.floor(canvas.height / 4);
    
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < canvas.width; x++) {
        const i = (y * canvas.width + x) * 4;
        const r = data[i];
        const g = data[i+1];
        const b = data[i+2];
        const a = data[i+3];
        
        if (a === 0) continue;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        const diff = max - min;
        
        // 1. Key out near-grayscale pixels (fake gray checkerboards)
        // Exclude very dark black outlines (r < 20) to keep outlines intact!
        const isGreyChecker = !isRemoveBg && (diff < 26) && (r > 20);
        
        // 2. Key out the light blue-gray JPEG compression artifacts (e.g. [194, 205, 211])
        const isBlueGrayArtifact = !isRemoveBg && (r >= 165 && r <= 235 && g >= 175 && g <= 240 && b >= 185 && b <= 245);
        
        // 3. Key out near-white pixels (light gray/white border artifacts)
        const isNearWhite = !isRemoveBg && (r >= 235 && g >= 235 && b >= 235);
        
        // 4. Key out black/dark-gray grid border lines at cell boundaries (4-pixel margin)
        const xMod = x % cellW;
        const yMod = y % cellH;
        const isGridBorder = (xMod < 4 || xMod > cellW - 4 || yMod < 4 || yMod > cellH - 4) && (r < 110 && g < 110 && b < 110) && (diff < 20);
        
        if (isGreyChecker || isBlueGrayArtifact || isNearWhite || isGridBorder) {
          data[i+3] = 0; // Transparent
        }
      }
    }
    ctx.putImageData(imgData, 0, 0);
  } catch (e) {
    console.error("Failed to key out checkered background", e);
  }
  
  return canvas;
}

// Draw an image with a custom tint overlay (chroma-keying only the drawn pixels)
function drawTintedImage(ctx, image, sx, sy, sw, sh, dx, dy, dw, dh, tintColor) {
  const offscreen = document.createElement('canvas');
  offscreen.width = dw;
  offscreen.height = dh;
  const oCtx = offscreen.getContext('2d');
  
  // Draw sprite to offscreen
  oCtx.drawImage(image, sx, sy, sw, sh, 0, 0, dw, dh);
  
  // Apply composite overlay on top of drawn pixels only
  oCtx.save();
  oCtx.fillStyle = tintColor;
  oCtx.globalCompositeOperation = 'source-atop';
  oCtx.fillRect(0, 0, dw, dh);
  oCtx.restore();
  
  // Draw offscreen back to main context
  ctx.drawImage(offscreen, dx, dy);
}

// Vector Class for Math Helper
class Vector2D {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  
  distanceTo(other) {
    return Math.sqrt((this.x - other.x) ** 2 + (this.y - other.y) ** 2);
  }
}

// Particle system for visual feedback
class Particle {
  constructor(x, y, vx, vy, color, text = null, size = 4, life = 1.0, isXp = false, isDrop = false, dropName = null) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.color = color;
    this.text = text; // For damage numbers or +1 text
    this.size = size;
    this.life = life; // Life from 1.0 down to 0
    this.maxLife = life;
    this.isXp = isXp;
    this.isDrop = isDrop;
    this.dropName = dropName;
    this.dropImg = null;
    
    if (this.isDrop && this.dropName) {
      this.dropImg = new Image();
      let svgString = "";
      if (typeof window.getDropSVG === 'function') {
        svgString = window.getDropSVG(this.dropName);
      } else {
        svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32"><circle cx="16" cy="16" r="10" fill="#fff"/></svg>`;
      }
      this.dropImg.src = "data:image/svg+xml;utf8," + encodeURIComponent(svgString);
    }
  }
  
  update(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
    this.life -= dt;
    if (this.text && !this.isDrop) {
      this.vy += 20 * dt; // Gravity effect on damage text
    }
  }
  
  draw(ctx) {
    const alpha = Math.max(0, this.life / this.maxLife);
    ctx.save();
    ctx.globalAlpha = alpha;
    
    if (this.isDrop && this.dropImg) {
      const imgSize = 24;
      // Draw centered drop image
      try {
        ctx.drawImage(this.dropImg, this.x - imgSize / 2, this.y - imgSize / 2 - 12, imgSize, imgSize);
      } catch(e) {}
      // Draw "+1" text next to or under it
      if (this.text) {
        ctx.fillStyle = '#ffffff';
        ctx.font = `bold 10px 'Outfit', sans-serif`;
        ctx.textAlign = 'center';
        ctx.shadowColor = 'black';
        ctx.shadowBlur = 4;
        ctx.fillText(this.text, this.x, this.y + imgSize / 2 + 2);
      }
    } else if (this.text) {
      ctx.fillStyle = this.color;
      ctx.font = `bold ${this.size}px 'Outfit', sans-serif`;
      ctx.textAlign = 'center';
      ctx.shadowColor = 'black';
      ctx.shadowBlur = 4;
      ctx.fillText(this.text, this.x, this.y);
    } else {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.restore();
  }
}

// Base Entity Class
class Entity {
  constructor(x, y, width, height, hp, speed, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.hp = hp;
    this.maxHp = hp;
    this.speed = speed;
    this.color = color;
    this.isDead = false;
    this.damageEffectTimer = 0;
  }
  
  takeDamage(amount) {
    if (this.isDead) return;
    this.hp = Math.max(0, this.hp - amount);
    this.damageEffectTimer = 0.15; // Red flash duration
    if (window.soundManager) window.soundManager.playHitSound();
    if (this.hp <= 0) {
      this.isDead = true;
    }
  }
  
  drawHealthBar(ctx) {
    if (this.isDead) return;
    const barWidth = this.width * 1.2;
    const barHeight = 4;
    const bx = this.x + (this.width - barWidth) / 2;
    const by = this.y - 8;
    
    // Background
    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(bx, by, barWidth, barHeight);
    
    // Fill
    const hpRatio = this.hp / this.maxHp;
    ctx.fillStyle = this.isBoss ? 'hsl(350, 90%, 55%)' : 'hsl(350, 80%, 50%)';
    ctx.fillRect(bx, by, barWidth * hpRatio, barHeight);
  }
}

// Player Class
class Player extends Entity {
  constructor(className) {
    super(50, groundY - 30, 24, 32, 100, 100, '#fff');
    this.className = className;
    this.level = 1;
    this.xp = 0;
    this.xpToNextLevel = 100;
    this.gold = 0;
    
    // Equipment Stats
    this.upgrades = {
      weapon: 1,
      armor: 1,
      ring: 1
    };
    
    this.atkTimer = 0;
    this.target = null;
    this.previousTarget = null;
    
    // Inventory initialization
    this.inventory = {
      usable: {
        hp_potion: 5,
        mp_potion: 5
      },
      weapon: {
        equipped: 1
      },
      armor: {
        equipped: 1
      },
      material: {},
      etc: {
        vip2coin: 0
      }
    };
    
    // Stats attributes
    this.baseStats = { str: 1, agi: 1, vit: 1, int: 1, dex: 1, luk: 1 };
    this.allocatedStats = { str: 0, agi: 0, vit: 0, int: 0, dex: 0, luk: 0 };
    this.jobBonuses = { str: 0, agi: 0, vit: 0, int: 0, dex: 0, luk: 0 };
    
    this.spriteSheet = new Image();
    this.processedSheet = null;
    this.sheetLoaded = false;
    this.spriteSheet.onload = () => {
      this.processedSheet = removeCheckeredBackground(this.spriteSheet);
      this.sheetLoaded = true;
      if (window.updateUI) window.updateUI();
    };
    
    this.initClassStats();
    this.hp = this.maxHp; // Start with full health
  }
  
  initClassStats() {
    this.y = groundY - 30;
    
    // Load class-specific spritesheet
    let targetSrc = `assets/${this.className.toLowerCase()}_sheet.png`;
    if (this.className === 'Warrior') {
      targetSrc = 'assets/Gemini_Generated_Image_3t4xfn3t4xfn3t4x-removebg-preview.png';
    } else if (this.className === 'Archer') {
      targetSrc = 'assets/Gemini_Generated_Image_6fnz0d6fnz0d6fnz-removebg-preview.png';
    } else if (this.className === 'Mage') {
      targetSrc = 'assets/Gemini_Generated_Image_vkuw7evkuw7evkuw-removebg-preview.png';
    }
    if (!this.spriteSheet.src.includes(targetSrc)) {
      this.sheetLoaded = false;
      this.processedSheet = null;
      this.spriteSheet.src = `${targetSrc}?v=${Date.now()}`;
    }
    
    // Assign job bonuses and archetype-tuned base stats based on class
    if (this.className === 'Warrior') {
      this.jobBonuses = { str: 4, agi: 1, vit: 3, int: 0, dex: 2, luk: 1 };
      this.baseHp = 170;
      this.baseDamage = 8; // Improved melee damage
      this.atkRange = 50;
      this.baseAtkSpeed = 1.1;
      this.speed = 140; // Swift melee tank
      this.color = 'hsl(0, 70%, 45%)';
    } else if (this.className === 'Archer') {
      this.jobBonuses = { str: 1, agi: 4, vit: 1, int: 0, dex: 3, luk: 1 };
      this.baseHp = 75; // Weakness: Lowest base HP
      this.baseDamage = 6; // Weakness: Lowest base damage (offset by rapid attack rate)
      this.atkRange = 220;
      this.baseAtkSpeed = 1.7;
      this.speed = 90; // Slower ranged sniper
      this.arrowSpeed = 520;
      this.color = 'hsl(120, 60%, 40%)';
    } else if (this.className === 'Mage') {
      this.jobBonuses = { str: 0, agi: 1, vit: 2, int: 5, dex: 2, luk: 0 };
      this.baseHp = 90; // Improved starting HP (safer than Archer)
      this.baseDamage = 16; // Balanced magic base damage
      this.atkRange = 240;
      this.baseAtkSpeed = 0.75;
      this.speed = 80; // Slow caster speed
      this.fireballSpeed = 260;
      this.color = 'hsl(210, 80%, 50%)';
    }
    
    // Sum total stats: base + allocated + job bonuses
    const str = this.baseStats.str + this.allocatedStats.str + this.jobBonuses.str;
    const agi = this.baseStats.agi + this.allocatedStats.agi + this.jobBonuses.agi;
    const vit = this.baseStats.vit + this.allocatedStats.vit + this.jobBonuses.vit;
    const int = this.baseStats.int + this.allocatedStats.int + this.jobBonuses.int;
    const dex = this.baseStats.dex + this.allocatedStats.dex + this.jobBonuses.dex;
    const luk = this.baseStats.luk + this.allocatedStats.luk + this.jobBonuses.luk;
    
    // Upgrades bonuses
    const weaponBonus = (this.upgrades.weapon - 1) * 3;
    const armorBonus = (this.upgrades.armor - 1) * 20;
    const ringBonus = (this.upgrades.ring - 1) * 0.08; // 8% speed increase per upgrade
    
    // Max HP formula: Max HP +1% per point of VIT
    this.maxHp = Math.floor((this.baseHp + armorBonus) * (1 + vit * 0.01));
    this.hp = Math.min(this.hp, this.maxHp); // Cap current hp
    
    // Max MP formula: Max MP +1.5% per point of INT
    let baseMp = 30;
    if (this.className === 'Archer') baseMp = 50;
    else if (this.className === 'Mage') baseMp = 100;
    this.maxMp = Math.floor(baseMp * (1 + int * 0.015));
    if (this.mp === undefined) this.mp = this.maxMp;
    this.mp = Math.min(this.mp, this.maxMp);
    
    // ATK / MATK calculation based on formulas
    if (this.className === 'Mage') {
      // Magic ATK formula
      const statusMATK = Math.floor(this.level / 4) + Math.floor(str / 5) + Math.floor(dex / 5) + Math.floor(luk / 3) + Math.floor(int * 1.5);
      const weaponMATK = (this.baseDamage + weaponBonus) * (1 + int * 0.015);
      this.atk = Math.floor(statusMATK + weaponMATK);
    } else if (this.className === 'Archer') {
      // Ranged Physical ATK formula
      const statusATK = Math.floor(this.level / 4) + Math.floor(str / 5) + Math.floor(dex * 0.75) + Math.floor(luk / 3);
      const weaponATK = (this.baseDamage + weaponBonus) * (1 + dex * 0.003);
      this.atk = Math.floor(statusATK + weaponATK);
    } else {
      // Melee Physical ATK (Warrior)
      const statusATK = Math.floor(this.level / 4) + str + Math.floor(dex / 5) + Math.floor(luk / 3);
      const weaponATK = (this.baseDamage + weaponBonus) * (1 + str * 0.005);
      this.atk = Math.floor(statusATK + weaponATK);
    }
    
    // Attack Speed (ASPD): AGI adds 0.8% and DEX adds 0.2%
    this.atkSpeed = this.baseAtkSpeed * (1 + ringBonus + agi * 0.008 + dex * 0.002);
  }
  
  resetHp() {
    this.hp = this.maxHp;
    this.mp = this.maxMp;
    this.isDead = false;
  }
  
  takeDamage(amount) {
    let defense = 0;
    const vit = this.baseStats.vit + this.allocatedStats.vit + this.jobBonuses.vit;
    const int = this.baseStats.int + this.allocatedStats.int + this.jobBonuses.int;
    const dex = this.baseStats.dex + this.allocatedStats.dex + this.jobBonuses.dex;
    const armorLvl = this.upgrades.armor;
    
    if (this.className === 'Warrior') {
      defense = Math.floor(vit * 0.6) + (armorLvl - 1) * 2;
    } else if (this.className === 'Archer') {
      defense = Math.floor(vit * 0.15) + (armorLvl - 1) * 0.5; // Weakness: Fragile defense, no DEX scaling
    } else if (this.className === 'Mage') {
      defense = Math.floor(int * 0.15) + Math.floor(vit * 0.2) + (armorLvl - 1) * 0.6;
    }
    
    const finalDamage = Math.max(1, Math.round(amount - defense));
    super.takeDamage(finalDamage);
  }
  
  gainXp(amount, particles) {
    if (this.isDead) return;
    this.xp += amount;
    
    // Spawn floaty XP texts
    particles.push(new Particle(this.x + this.width / 2, this.y - 15, 0, -60, 'hsl(145, 80%, 45%)', `+${amount} XP`, 13, 0.8));
    
    if (this.xp >= this.xpToNextLevel) {
      this.xp -= this.xpToNextLevel;
      this.level++;
      this.xpToNextLevel = Math.floor(100 * (1.5 ** (this.level - 1)));
      
      // Upgrade base stats
      this.initClassStats();
      this.hp = this.maxHp; // Full heal on level up
      if (window.soundManager) window.soundManager.playLevelUpSound();
      
      // Level Up flash particles
      for (let i = 0; i < 20; i++) {
        particles.push(new Particle(
          this.x + this.width / 2,
          this.y + this.height / 2,
          (Math.random() - 0.5) * 120,
          -Math.random() * 150 - 50,
          'hsl(42, 95%, 55%)',
          null,
          4,
          1.2
        ));
      }
      particles.push(new Particle(this.x + this.width / 2, this.y - 30, 0, -80, 'hsl(42, 95%, 55%)', 'LEVEL UP!', 20, 1.5));
    }
  }
  
  gainGold(amount, particles) {
    this.gold += amount;
    particles.push(new Particle(this.x + this.width / 2, this.y, (Math.random() - 0.5) * 40, -90, 'hsl(42, 95%, 55%)', `+🪙${amount}`, 13, 0.8));
  }
  
  gainMaterial(itemName, particles) {
    if (!this.inventory.material) this.inventory.material = {};
    this.inventory.material[itemName] = (this.inventory.material[itemName] || 0) + 1;
    particles.push(new Particle(this.x + this.width / 2, this.y - 10, (Math.random() - 0.5) * 40, -120, 'var(--accent-light)', '+1', 10, 1.4, false, true, itemName));
  }
  
  update(dt, enemies, projectiles, particles) {
    if (this.isDead) return;
    
    // Keep Y aligned to current ground level
    this.y = groundY - this.height;
    
    // Mana/MP slow regeneration (2.5 MP per second)
    this.mp = Math.min(this.maxMp, this.mp + 2.5 * dt);
    
    // VIP Auto-Heal Check
    if (this.inventory && this.inventory.etc && this.inventory.etc.vip2coin > 0 && window.autoHealActive) {
      // HP Auto-Heal check
      if (window.assignedHpItem && this.inventory.usable[window.assignedHpItem] > 0) {
        const hpPercent = (this.hp / this.maxHp) * 100;
        if (hpPercent <= window.hpHealThreshold) {
          this.hp = Math.min(this.maxHp, this.hp + 50);
          this.inventory.usable[window.assignedHpItem]--;
          particles.push(new Particle(this.x + this.width / 2, this.y - 15, 0, -60, 'hsl(145, 80%, 45%)', '+50 HP', 13, 0.8));
          if (window.soundManager) window.soundManager.playHitSound(); // Quick beep
          if (window.updateUI) window.updateUI();
        }
      }
      
      // MP Auto-Heal check
      if (window.assignedMpItem && this.inventory.usable[window.assignedMpItem] > 0) {
        const mpPercent = (this.mp / this.maxMp) * 100;
        if (mpPercent <= window.mpHealThreshold) {
          this.mp = Math.min(this.maxMp, this.mp + 30);
          this.inventory.usable[window.assignedMpItem]--;
          particles.push(new Particle(this.x + this.width / 2, this.y - 15, 0, -60, 'hsl(210, 80%, 50%)', '+30 MP', 13, 0.8));
          if (window.soundManager) window.soundManager.playHitSound(); // Quick beep
          if (window.updateUI) window.updateUI();
        }
      }
    }
    
    if (this.damageEffectTimer > 0) {
      this.damageEffectTimer -= dt;
    }
    
    // Attack timer cooldown
    if (this.atkTimer > 0) {
      this.atkTimer -= dt;
    }
    
    // Find closest alive enemy
    let closestEnemy = null;
    let closestDist = Infinity;
    
    for (const enemy of enemies) {
      if (enemy.isDead) continue;
      const dist = this.x - enemy.x; // Enemies spawn from right, so distance is x differences
      const absDist = Math.abs(dist);
      if (absDist < closestDist) {
        closestDist = absDist;
        closestEnemy = enemy;
      }
    }
    
    this.target = closestEnemy;
    
    // Reset player back to the left of the screen if previous target died
    if (this.previousTarget && this.previousTarget.isDead && this.target !== this.previousTarget) {
      this.x = 50;
    }
    this.previousTarget = this.target;
    
    if (this.target) {
      const distance = Math.abs(this.x + this.width - this.target.x);
      
      if (distance > this.atkRange) {
        // Move towards target
        this.x += this.speed * dt;
        // Cap position so player doesn't walk past screen bounds
        if (this.x > 820 - this.width) {
          this.x = 820 - this.width;
        }
      } else {
        // Attack when in range and cooldown is ready
        if (this.atkTimer <= 0) {
          this.fireAtk(projectiles, particles);
          this.atkTimer = 1 / this.atkSpeed;
        }
      }
    } else {
      // No target: move back to the left side
      if (this.x > 80) {
        this.x -= this.speed * dt;
      } else if (this.x < 50) {
        this.x += this.speed * dt;
      }
    }
  }
  
  fireAtk(projectiles, particles) {
    if (!this.target) return;
    
    if (this.className === 'Warrior') {
      // Melee Swing: Slash graphic + Instant Damage
      particles.push(new Particle(this.target.x + this.target.width / 2, this.target.y + this.target.height / 2, 0, -20, 'hsl(0, 0%, 96%)', '⚔️', 24, 0.25));
      this.target.takeDamage(this.atk);
      // Spawn hit particles
      for (let i = 0; i < 5; i++) {
        particles.push(new Particle(
          this.target.x + this.target.width / 2,
          this.target.y + this.target.height / 2,
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          this.color,
          null,
          3,
          0.4
        ));
      }
      // Floating damage number
      particles.push(new Particle(
        this.target.x + this.target.width / 2,
        this.target.y - 10,
        (Math.random() - 0.5) * 30,
        -70,
        '#fff',
        `-${this.atk}`,
        14,
        0.7
      ));
    } else if (this.className === 'Archer') {
      // Ranged Bow: Fire single arrow projectile
      projectiles.push(new Projectile(
        this.x + this.width,
        this.y + this.height / 2 - 2,
        this.arrowSpeed || 450, // Speed
        this.atk,
        'player',
        this.target,
        'arrow'
      ));
    } else if (this.className === 'Mage') {
      // Ranged Mage: Fire a magic fireball projectile (costs 8 MP) or magic bolt (free)
      if (this.mp >= 8) {
        this.mp -= 8;
        projectiles.push(new Projectile(
          this.x + this.width,
          this.y + this.height / 2 - 4,
          this.fireballSpeed || 280,
          this.atk,
          'player',
          this.target,
          'fireball'
        ));
      } else {
        // Weak spell projectile
        projectiles.push(new Projectile(
          this.x + this.width,
          this.y + this.height / 2 - 4,
          350,
          Math.max(1, Math.floor(this.atk * 0.4)),
          'player',
          this.target,
          'magic_bolt'
        ));
      }
    }
  }
  
  draw(ctx) {
    if (this.isDead) {
      if (this.sheetLoaded) {
        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        
        const drawSize = 64;
        const dx = -drawSize / 2;
        const dy = -drawSize / 2 - 4;
        
        const sheetW = this.spriteSheet.width || this.processedSheet.width;
        const sheetH = this.spriteSheet.height || this.processedSheet.height;
        const sw = (sheetW > 0) ? Math.floor(sheetW / 4) : 125;
        const sh = (sheetH > 0) ? Math.floor(sheetH / 4) : 125;
        
        // Defeated Frame is Row 3 Col 0
        if (this.damageEffectTimer > 0) {
          drawTintedImage(ctx, this.processedSheet, 0, sh * 3, sw, sh, dx, dy, drawSize, drawSize, 'rgba(255, 0, 0, 0.45)');
        } else {
          ctx.drawImage(this.processedSheet, 0, sh * 3, sw, sh, dx, dy, drawSize, drawSize);
        }
        ctx.restore();
      }
      return;
    }
    
    ctx.save();
    
    if (this.sheetLoaded) {
      const isMoving = this.target && Math.abs(this.x + this.width - this.target.x) > this.atkRange;
      const isAttacking = this.target && this.atkTimer > 0 && Math.abs(this.x + this.width - this.target.x) <= this.atkRange;
      
      const sheetW = this.spriteSheet.width || this.processedSheet.width;
      const sheetH = this.spriteSheet.height || this.processedSheet.height;
      const sw = (sheetW > 0) ? Math.floor(sheetW / 4) : 125;
      const sh = (sheetH > 0) ? Math.floor(sheetH / 4) : 125;
      
      let sx = 0;
      let sy = 0;
      
      if (isAttacking) {
        const totalCooldown = 1 / this.atkSpeed;
        const progress = this.atkTimer / totalCooldown;
        const swingFrame = Math.min(2, Math.floor((1.0 - progress) * 3));
        sx = swingFrame * sw;
        sy = sh * 2; // Row 2
      } else if (isMoving) {
        const walkFrame = Math.floor(Date.now() / 110) % 4;
        sx = walkFrame * sw;
        sy = sh * 1; // Row 1
      } else {
        const idleFrame = Math.floor(Date.now() / 150) % 3;
        sx = idleFrame * sw;
        sy = 0; // Row 0
      }
      
      ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
      const drawSize = 64;
      const dx = -drawSize / 2;
      const dy = -drawSize / 2 - 4;
      
      // Draw the cropped frame standing on the ground
      if (this.damageEffectTimer > 0) {
        drawTintedImage(ctx, this.processedSheet, sx, sy, sw, sh, dx, dy, drawSize, drawSize, 'rgba(255, 0, 0, 0.45)');
      } else {
        ctx.drawImage(this.processedSheet, sx, sy, sw, sh, dx, dy, drawSize, drawSize);
      }
      ctx.restore();
    } else {
      ctx.fillStyle = this.color;
      // Draw main character body (glowing rounded rect)
      ctx.beginPath();
      ctx.roundRect(this.x, this.y, this.width, this.height, 4);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Draw class decoration details
      ctx.fillStyle = '#fff';
      if (this.className === 'Warrior') {
        // Draw sword on back
        ctx.fillRect(this.x - 3, this.y + 8, 3, 14);
        ctx.fillRect(this.x - 5, this.y + 18, 7, 2);
      } else if (this.className === 'Archer') {
        // Draw quiver on back
        ctx.fillStyle = 'hsl(35, 60%, 30%)';
        ctx.fillRect(this.x - 4, this.y + 10, 4, 12);
      } else if (this.className === 'Mage') {
        // Draw wizard hat tip
        ctx.fillStyle = 'hsl(260, 50%, 35%)';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width / 2, this.y - 10);
        ctx.lineTo(this.x + this.width, this.y);
        ctx.closePath();
        ctx.fill();
      }
      
      // Draw Weapon/Staff in front
      ctx.fillStyle = 'hsl(45, 20%, 60%)';
      ctx.fillRect(this.x + this.width, this.y + this.height / 2, 4, 10);
      
      // Flash red on damage for fallback vector boxes
      if (this.damageEffectTimer > 0) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.45)';
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
      ctx.restore();
    }
    
    // Health bar above player
    this.drawHealthBar(ctx);
  }
}

class Enemy extends Entity {
  constructor(name, type, stage, level, hp, speed, damage, xpReward, goldReward, sizeMultiplier = 1) {
    const width = 32 * sizeMultiplier;
    const height = 32 * sizeMultiplier;
    super(820, groundY - height, width, height, hp, speed, '#aaa');
    
    this.name = name;
    this.type = type; // chicken, pig, jellyfish, scorpion, etc.
    this.stage = stage;
    this.level = level;
    this.atk = damage;
    this.atkRange = 15;
    this.atkSpeed = 1.0;
    this.atkTimer = 0;
    this.xpReward = xpReward;
    this.goldReward = goldReward;
    this.isWalking = false;
    
    // Spritesheet support
    this.spriteSheet = new Image();
    this.processedSheet = null;
    this.sheetLoaded = false;
    this.spriteSheet.onload = () => {
      this.processedSheet = removeCheckeredBackground(this.spriteSheet);
      this.sheetLoaded = true;
    };
    
    // Single sprite fallback loader
    this.sprite = new Image();
    this.spriteLoaded = false;
    this.sprite.onload = () => { this.spriteLoaded = true; };
    
    this.initVisuals();
  }
  
  initVisuals() {
    this.y = groundY - this.height;
    
    // Set asset sources safely without redundant reloads
    if (this.type === 'boss') {
      // Boss constructor will handle loading boss-specific assets
      this.sheetLoaded = false;
    } else {
      let targetSrc = `assets/${this.type}_sheet.png`;
      if (this.type === 'jellyfish') {
        targetSrc = 'assets/jellyfish_sheet-removebg-preview.png';
      } else if (this.type === 'crab') {
        targetSrc = 'assets/crab_sheet-removebg-preview.png';
      } else if (this.type === 'scorpion') {
        targetSrc = 'assets/scorpion_sheet-removebg-preview.png';
      } else if (this.type === 'mummy') {
        targetSrc = 'assets/Gemini_Generated_Image_qr2tbwqr2tbwqr2t-removebg-preview.png';
      } else if (this.type === 'spider') {
        targetSrc = 'assets/Gemini_Generated_Image_ezxwglezxwglezxw-removebg-preview.png';
      }
      if (!this.spriteSheet.src.includes(targetSrc)) {
        this.sheetLoaded = false;
        this.processedSheet = null;
        this.spriteSheet.src = `${targetSrc}?v=${Date.now()}`;
      }
    }
    
    if (this.type !== 'boss') {
      this.spriteLoaded = false;
      this.sprite.src = `assets/${this.type}_sprite.png?v=${Date.now()}`;
    }
    
    if (this.stage === 1) {
      // Farm colors
      if (this.type === 'chicken') this.color = 'hsl(0, 0%, 90%)';
      else if (this.type === 'pig') this.color = 'hsl(350, 100%, 82%)';
      else if (this.type === 'sheep') this.color = 'hsl(210, 10%, 88%)';
    } else if (this.stage === 2) {
      // Underwater colors
      if (this.type === 'jellyfish') this.color = 'hsl(300, 80%, 75%)';
      else if (this.type === 'crab') this.color = 'hsl(10, 85%, 55%)';
      else if (this.type === 'seahorse') this.color = 'hsl(45, 90%, 65%)';
      else if (this.type === 'shark') this.color = 'hsl(205, 50%, 45%)';
    } else if (this.stage === 3) {
      // Desert colors
      if (this.type === 'scorpion') this.color = 'hsl(28, 70%, 45%)';
      else if (this.type === 'cobra') this.color = 'hsl(125, 45%, 35%)';
      else if (this.type === 'mummy') this.color = 'hsl(45, 30%, 65%)';
      else if (this.type === 'spider') this.color = 'hsl(28, 50%, 30%)';
    }
  }
  
  takeDamage(amount) {
    let defense = Math.floor((this.stage - 1) * 2 + this.level * 0.6);
    if (this.type === 'crab') {
      defense += 4; // Armored crabs are extra matigas
    }
    if (this.type === 'boss') {
      defense += 8; // Bosses are extremely matigas
    }
    const finalDamage = Math.max(1, Math.round(amount - defense));
    super.takeDamage(finalDamage);
  }
  
  update(dt, player) {
    if (this.isDead || player.isDead) {
      this.isWalking = false;
      return;
    }
    
    this.y = groundY - this.height;
    
    if (this.damageEffectTimer > 0) {
      this.damageEffectTimer -= dt;
    }
    
    if (this.atkTimer > 0) {
      this.atkTimer -= dt;
    }
    
    // Distance to player
    const dist = Math.abs((this.x) - (player.x + player.width));
    
    if (dist > this.atkRange) {
      // Move left towards the player
      this.x -= this.speed * dt;
      this.isWalking = true;
    } else {
      this.isWalking = false;
      // Attack player
      if (this.atkTimer <= 0) {
        player.takeDamage(this.atk);
        
        // Damage floating text on player
        player.damageEffectTimer = 0.15;
        this.atkTimer = 1 / this.atkSpeed;
      }
    }
  }
  
  draw(ctx) {
    if (this.isDead) return;
    
    ctx.save();
    
    if (this.sheetLoaded) {
      let sx = 0;
      let sy = 0;
      let sw = 256;
      let sh = 256;
      
      const isMoving = this.isWalking;
      const isAttacking = this.atkTimer > 0;
      
      // Dynamically detect cell dimensions from loaded spritesheet size
      const sheetW = this.spriteSheet.width || this.processedSheet.width;
      if (sheetW > 0 && sheetW <= 600) {
        sw = 125;
        sh = 125;
      }
      
      if (isAttacking) {
        const totalCooldown = 1 / this.atkSpeed;
        const progress = this.atkTimer / totalCooldown;
        const attackFrame = Math.min(2, Math.floor((1.0 - progress) * 3));
        sx = attackFrame * sw;
        sy = sh * 2; // Row 2 (Attack - 3 frames)
      } else if (isMoving) {
        const walkFrame = Math.floor(Date.now() / 120) % 4;
        sx = walkFrame * sw;
        sy = sh * 1; // Row 1 (Walk - 4 frames)
      } else {
        const idleFrame = Math.floor(Date.now() / 150) % 3;
        sx = idleFrame * sw;
        sy = 0; // Row 0 (Stand - 3 frames)
      }
      
      // Mirror horizontally so the enemy faces the player (walks left)
      ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
      ctx.scale(-1, 1);
      
      const drawSize = this.width;
      const dx = -drawSize / 2;
      const dy = -drawSize / 2;
      
      if (this.damageEffectTimer > 0) {
        drawTintedImage(ctx, this.processedSheet, sx, sy, sw, sh, dx, dy, drawSize, drawSize, 'rgba(255, 0, 0, 0.45)');
      } else {
        ctx.drawImage(this.processedSheet, sx, sy, sw, sh, dx, dy, drawSize, drawSize);
      }
      ctx.restore();
    } else if (this.spriteLoaded) {
      ctx.save();
      const isMoving = this.isWalking;
      let bounceY = isMoving ? Math.abs(Math.sin(Date.now() / 120)) * 4 : 0;
      
      // Mirror horizontally so the enemy faces the player (walks left)
      ctx.translate(this.x + this.width / 2, this.y + this.height / 2 - bounceY);
      ctx.scale(-1, 1);
      
      // Wobble/bounce scale transformation when moving
      if (isMoving) {
        ctx.scale(1 + Math.sin(Date.now() / 60) * 0.08, 1 - Math.sin(Date.now() / 60) * 0.08);
      }
      
      const drawSize = this.width;
      const dx = -drawSize / 2;
      const dy = -drawSize / 2;
      
      if (this.damageEffectTimer > 0) {
        drawTintedImage(ctx, this.sprite, 0, 0, this.sprite.width, this.sprite.height, dx, dy, drawSize, drawSize, 'rgba(255, 0, 0, 0.45)');
      } else {
        ctx.drawImage(this.sprite, 0, 0, this.sprite.width, this.sprite.height, dx, dy, drawSize, drawSize);
      }
      ctx.restore();
    } else {
      ctx.fillStyle = this.color;
      // Draw enemy body
      ctx.beginPath();
      ctx.roundRect(this.x, this.y, this.width, this.height, 4);
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.5)';
      ctx.stroke();
      
      // Custom decoration details based on type
      ctx.fillStyle = '#000';
      if (this.stage === 1) { // Farm
        if (this.type === 'chicken') {
          // Red comb on head
          ctx.fillStyle = 'red';
          ctx.fillRect(this.x + this.width - 6, this.y - 4, 4, 4);
          // Beak
          ctx.fillStyle = 'orange';
          ctx.fillRect(this.x + this.width, this.y + 4, 3, 2);
        } else if (this.type === 'pig') {
          // Snout
          ctx.fillStyle = 'pink';
          ctx.fillRect(this.x + this.width - 4, this.y + 8, 4, 4);
        }
      } else if (this.stage === 2) { // Sea
        if (this.type === 'crab') {
          // Claws
          ctx.fillStyle = 'red';
          ctx.fillRect(this.x + this.width, this.y + 2, 4, 6);
          ctx.fillRect(this.x - 4, this.y + 2, 4, 6);
        }
      } else if (this.stage === 3) { // Desert
        if (this.type === 'mummy') {
          // Wrapping lines
          ctx.strokeStyle = '#fff';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(this.x, this.y + 6);
          ctx.lineTo(this.x + this.width, this.y + 6);
          ctx.moveTo(this.x, this.y + 14);
          ctx.lineTo(this.x + this.width, this.y + 14);
          ctx.stroke();
        }
      }
      
      // Flash red on damage for fallback vector shapes
      if (this.damageEffectTimer > 0) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.45)';
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
    }
    
    ctx.restore();
    this.drawHealthBar(ctx);
  }
}

// Boss Class (inherits from Enemy)
class Boss extends Enemy {
  constructor(name, stage, hp, speed, damage, xpReward, goldReward) {
    // Bosses are much bigger (sizeMultiplier = 2.2)
    super(name, 'boss', stage, 5, hp, speed, damage, xpReward, goldReward, 2.2);
    this.isBoss = true;
    this.chargeTimer = 0;
    this.krakenAtkTimer = 0;
    this.pharaohMinionTimer = 0;
    
    // Custom Boss Spritesheet safely loaded
    let bossName = 'bull';
    if (stage === 2) bossName = 'kraken';
    else if (stage === 3) bossName = 'pharaoh';
    
    let targetSrc = `assets/boss_${bossName}_sheet.png`;
    if (bossName === 'bull') {
      targetSrc = 'assets/boss_bull_sheet-removebg-preview.png';
    } else if (bossName === 'pharaoh') {
      targetSrc = 'assets/Gemini_Generated_Image_c8tik3c8tik3c8ti-removebg-preview.png';
    }
    
    if (!this.spriteSheet.src.includes(targetSrc)) {
      this.sheetLoaded = false;
      this.processedSheet = null;
      this.spriteSheet.src = `${targetSrc}?v=${Date.now()}`;
    }
    
    // Single sprite loader fallback
    this.spriteLoaded = false;
    this.sprite.src = `assets/boss_${bossName}_sprite.png?v=${Date.now()}`;
  }
  
  update(dt, player, projectiles, particles, spawnMinionCallback) {
    if (this.isDead || player.isDead) {
      this.isWalking = false;
      return;
    }
    
    this.y = groundY - this.height;
    
    if (this.damageEffectTimer > 0) {
      this.damageEffectTimer -= dt;
    }
    
    if (this.atkTimer > 0) {
      this.atkTimer -= dt;
    }
    
    const dist = Math.abs(this.x - (player.x + player.width));
    
    // Boss specific ability loops
    if (this.stage === 1) { // Bull Charge Attack
      this.chargeTimer += dt;
      if (this.chargeTimer >= 6.0) {
        // Trigger screen warning, charge forward rapidly!
        this.speed = 350;
        this.atk = this.maxHp * 0.25; // Massive charge damage
        particles.push(new Particle(this.x, this.y, -100, -80, 'red', 'BULL CHARGE!', 18, 1.2));
        this.chargeTimer = 0;
      }
      
      // If speed was high and has passed player, reset speed
      if (this.speed > 100 && this.x < player.x) {
        this.speed = 45;
        this.atk = 15;
      }
    } else if (this.stage === 2) { // Kraken ink spitting
      this.krakenAtkTimer += dt;
      if (this.krakenAtkTimer >= 4.0) {
        // Spit ink projectile
        projectiles.push(new Projectile(
          this.x,
          this.y + this.height / 2,
          -220, // Moves left
          this.atk * 1.5,
          'boss',
          player,
          'ink'
        ));
        particles.push(new Particle(this.x, this.y, -30, -50, 'hsl(280, 80%, 40%)', 'INK SPLAT', 14, 0.8));
        this.krakenAtkTimer = 0;
      }
    } else if (this.stage === 3) { // Pharaoh summons sandstorms or minions
      this.pharaohMinionTimer += dt;
      if (this.pharaohMinionTimer >= 5.0) {
        // Summon 2 small mummies
        spawnMinionCallback();
        particles.push(new Particle(this.x, this.y, -50, -60, 'hsl(45, 90%, 55%)', 'SUMMON MINIONS', 14, 0.8));
        this.pharaohMinionTimer = 0;
      }
    }
    
    // Normal movement / attack
    if (dist > this.atkRange) {
      this.x -= this.speed * dt;
      this.isWalking = true;
    } else {
      this.isWalking = false;
      if (this.atkTimer <= 0) {
        player.takeDamage(this.atk);
        this.atkTimer = 1.2; // Slower boss swing
      }
    }
  }
  
  draw(ctx) {
    if (this.isDead) return;
    
    ctx.save();
    
    if (this.sheetLoaded) {
      let sx = 0;
      let sy = 0;
      let sw = 256;
      let sh = 256;
      
      const isMoving = this.isWalking;
      const isAttacking = this.atkTimer > 0;
      
      // Dynamically detect cell dimensions from loaded spritesheet size
      const sheetW = this.spriteSheet.width || this.processedSheet.width;
      if (sheetW > 0 && sheetW <= 600) {
        sw = 125;
        sh = 125;
      }
      
      if (isAttacking) {
        const totalCooldown = 1.2;
        const progress = this.atkTimer / totalCooldown;
        const attackFrame = Math.min(2, Math.floor((1.0 - progress) * 3));
        sx = attackFrame * sw;
        sy = sh * 2; // Row 2 (Attack - 3 frames)
      } else if (isMoving) {
        const walkFrame = Math.floor(Date.now() / 120) % 4;
        sx = walkFrame * sw;
        sy = sh * 1; // Row 1 (Walk - 4 frames)
      } else {
        const idleFrame = Math.floor(Date.now() / 150) % 3;
        sx = idleFrame * sw;
        sy = 0; // Row 0 (Stand - 3 frames)
      }
      
      // Mirror horizontally so the boss faces the player (walks left)
      ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
      ctx.scale(-1, 1);
      
      const drawSize = this.width;
      const dx = -drawSize / 2;
      const dy = -drawSize / 2;
      
      if (this.damageEffectTimer > 0) {
        drawTintedImage(ctx, this.processedSheet, sx, sy, sw, sh, dx, dy, drawSize, drawSize, 'rgba(255, 0, 0, 0.45)');
      } else {
        ctx.drawImage(this.processedSheet, sx, sy, sw, sh, dx, dy, drawSize, drawSize);
      }
      ctx.restore();
    } else if (this.spriteLoaded) {
      ctx.save();
      const isMoving = this.isWalking;
      let bounceY = isMoving ? Math.abs(Math.sin(Date.now() / 120)) * 4 : 0;
      
      // Mirror horizontally so the boss faces the player (walks left)
      ctx.translate(this.x + this.width / 2, this.y + this.height / 2 - bounceY);
      ctx.scale(-1, 1);
      
      // Wobble/bounce scale transformation when moving
      if (isMoving) {
        ctx.scale(1 + Math.sin(Date.now() / 60) * 0.08, 1 - Math.sin(Date.now() / 60) * 0.08);
      }
      
      const drawSize = this.width;
      const dx = -drawSize / 2;
      const dy = -drawSize / 2;
      
      if (this.damageEffectTimer > 0) {
        drawTintedImage(ctx, this.sprite, 0, 0, this.sprite.width, this.sprite.height, dx, dy, drawSize, drawSize, 'rgba(255, 0, 0, 0.45)');
      } else {
        ctx.drawImage(this.sprite, 0, 0, this.sprite.width, this.sprite.height, dx, dy, drawSize, drawSize);
      }
      ctx.restore();
    } else {
      ctx.fillStyle = this.color;
      // Draw boss body
      ctx.beginPath();
      ctx.roundRect(this.x, this.y, this.width, this.height, 8);
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Custom decoration details based on stage boss
      if (this.stage === 1) { // Giant Angry Bull
        // Golden horns
        ctx.fillStyle = 'hsl(45, 95%, 55%)';
        ctx.beginPath();
        ctx.moveTo(this.x + 8, this.y);
        ctx.lineTo(this.x - 8, this.y - 12);
        ctx.lineTo(this.x + 8, this.y - 4);
        ctx.closePath();
        ctx.fill();
        
        // Nose ring
        ctx.strokeStyle = 'hsl(45, 95%, 55%)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x + this.width, this.y + this.height - 15, 6, 0, Math.PI * 2);
        ctx.stroke();
      } else if (this.stage === 2) { // The Deepwater Kraken
        // Octopus-like eyes
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(this.x + 12, this.y + 16, 5, 0, Math.PI * 2);
        ctx.fill();
        
        // Tentacles hanging from bottom
        ctx.fillStyle = 'purple';
        ctx.fillRect(this.x + 6, this.y + this.height, 6, 12);
        ctx.fillRect(this.x + 18, this.y + this.height, 6, 15);
        ctx.fillRect(this.x + 30, this.y + this.height, 6, 10);
      } else if (this.stage === 3) { // Pharaoh Mummy
        // Golden Pharaoh Headpiece
        ctx.fillStyle = 'hsl(45, 90%, 55%)';
        ctx.fillRect(this.x + 4, this.y - 8, this.width - 8, 8);
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.x + 12, this.y - 8, 4, 8);
        ctx.fillRect(this.x + 28, this.y - 8, 4, 8);
        
        // Glowing green eyes
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x + 8, this.y + 10, 4, 4);
        ctx.fillRect(this.x + 24, this.y + 10, 4, 4);
      }
      
      // Flash red on damage for fallback vector shapes
      if (this.damageEffectTimer > 0) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.45)';
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
    }
    
    ctx.restore();
    this.drawHealthBar(ctx);
  }
}

// Projectile Class
class Projectile {
  constructor(x, y, speed, damage, owner, target, type) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.damage = damage;
    this.owner = owner; // player or boss/enemy
    this.target = target;
    this.type = type; // arrow, fireball, ink, magic_bolt
    this.radius = type === 'fireball' ? 6 : (type === 'ink' ? 8 : (type === 'magic_bolt' ? 4 : 3));
    this.isDead = false;
    
    // Set colors
    if (type === 'arrow') this.color = 'hsl(35, 60%, 40%)';
    else if (type === 'fireball') this.color = 'hsl(18, 95%, 55%)';
    else if (type === 'ink') this.color = 'hsl(280, 80%, 30%)';
    else if (type === 'magic_bolt') this.color = 'hsl(200, 95%, 65%)';
  }
  
  update(dt, enemies, player, particles) {
    if (this.isDead) return;
    
    const prevX = this.x;
    this.x += this.speed * dt;
    
    if (this.owner === 'player') {
      // Check collision with closest target or any enemy
      for (const enemy of enemies) {
        if (enemy.isDead) continue;
        
        // Swept CCD check horizontally, normal box check vertically
        const minX = Math.min(prevX, this.x);
        const maxX = Math.max(prevX, this.x);
        const overlapsX = (maxX >= enemy.x && minX <= enemy.x + enemy.width);
        
        if (overlapsX && this.y >= enemy.y && this.y <= enemy.y + enemy.height) {
          this.triggerCollision(enemy, enemies, particles);
          break;
        }
      }
      
      // Offscreen check
      if (this.x > 820) {
        this.isDead = true;
      }
    } else {
      // Moves left (ink projectile from boss)
      const minX = Math.min(prevX, this.x);
      const maxX = Math.max(prevX, this.x);
      const overlapsX = (minX <= player.x + player.width && maxX >= player.x);
      
      if (overlapsX && this.y >= player.y && this.y <= player.y + player.height) {
        player.takeDamage(this.damage);
        this.isDead = true;
        // Impact splash
        for (let i = 0; i < 8; i++) {
          particles.push(new Particle(
            this.x,
            this.y,
            (Math.random() - 0.5) * 80,
            (Math.random() - 0.5) * 80,
            this.color,
            null,
            2,
            0.5
          ));
        }
      }
      
      if (this.x < 0) {
        this.isDead = true;
      }
    }
  }
  
  triggerCollision(directTarget, allEnemies, particles) {
    this.isDead = true;
    
    if (this.type === 'arrow' || this.type === 'magic_bolt') {
      // Deal direct damage
      directTarget.takeDamage(this.damage);
      // Spawn tiny spark particles
      for (let i = 0; i < 3; i++) {
        particles.push(new Particle(
          this.x,
          this.y,
          (Math.random() - 0.5) * 60,
          (Math.random() - 0.5) * 60,
          this.color,
          null,
          2,
          0.3
        ));
      }
      particles.push(new Particle(
        directTarget.x + directTarget.width / 2,
        directTarget.y - 10,
        (Math.random() - 0.5) * 30,
        -70,
        '#fff',
        `-${this.damage}`,
        14,
        0.7
      ));
    } else if (this.type === 'fireball') {
      // Splash explosion AoE
      const splashRange = 80;
      
      // Explosion particles
      for (let i = 0; i < 15; i++) {
        particles.push(new Particle(
          this.x,
          this.y,
          (Math.random() - 0.5) * 140,
          (Math.random() - 0.5) * 140,
          'hsl(18, 95%, 55%)',
          null,
          4,
          0.6
        ));
      }
      
      // Apply damage to all enemies in range
      for (const enemy of allEnemies) {
        if (enemy.isDead) continue;
        const dist = Math.abs((enemy.x + enemy.width / 2) - this.x);
        if (dist <= splashRange) {
          enemy.takeDamage(this.damage);
          particles.push(new Particle(
            enemy.x + enemy.width / 2,
            enemy.y - 10,
            (Math.random() - 0.5) * 30,
            -70,
            'hsl(18, 95%, 55%)',
            `-${this.damage}`,
            14,
            0.7
          ));
        }
      }
    }
  }
  
  draw(ctx) {
    if (this.isDead) return;
    
    ctx.save();
    ctx.fillStyle = this.color;
    
    if (this.type === 'arrow') {
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 3.5;
      ctx.shadowBlur = 5;
      ctx.shadowColor = 'gold';
      ctx.beginPath();
      ctx.moveTo(this.x - 22, this.y);
      ctx.lineTo(this.x, this.y);
      
      // Arrowhead points
      ctx.moveTo(this.x - 5, this.y - 3);
      ctx.lineTo(this.x, this.y);
      ctx.lineTo(this.x - 5, this.y + 3);
      
      ctx.stroke();
    } else if (this.type === 'fireball') {
      // Glowing fireball circle
      ctx.shadowBlur = 8;
      ctx.shadowColor = 'orange';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'ink') {
      // Splattery ink drop
      ctx.shadowBlur = 6;
      ctx.shadowColor = 'purple';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.restore();
  }
}
