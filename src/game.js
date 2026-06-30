// Sound Manager using Web Audio API for custom synthesized game audio
class SoundManager {
  constructor() {
    this.AudioCtx = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = null;
    this.masterGainNode = null;
    this.volume = parseFloat(localStorage.getItem('gwyn_volume') || '0.5');
  }

  initAudio() {
    if (this.audioCtx) return;
    try {
      this.audioCtx = new this.AudioCtx();
      this.masterGainNode = this.audioCtx.createGain();
      this.masterGainNode.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
      this.masterGainNode.connect(this.audioCtx.destination);
    } catch (e) {
      console.warn("Web Audio API is not supported in this browser:", e);
    }
  }

  setVolume(value) {
    this.initAudio();
    this.volume = value;
    if (this.masterGainNode && this.audioCtx) {
      this.masterGainNode.gain.setValueAtTime(value, this.audioCtx.currentTime);
    }
    localStorage.setItem('gwyn_volume', value);
  }

  playHitSound() {
    this.initAudio();
    if (!this.audioCtx || this.volume === 0) return;
    
    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.masterGainNode);
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, this.audioCtx.currentTime + 0.1);
      
      gain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.01, this.audioCtx.currentTime + 0.1);
      
      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.1);
    } catch(e){}
  }

  playLevelUpSound() {
    this.initAudio();
    if (!this.audioCtx || this.volume === 0) return;
    
    try {
      const now = this.audioCtx.currentTime;
      const notes = [261.63, 329.63, 392.00, 523.25]; // C4, E4, G4, C5 arpeggio
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.connect(gain);
        gain.connect(this.masterGainNode);
        
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        
        gain.gain.setValueAtTime(0, now + idx * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.08 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.15);
        
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.18);
      });
    } catch(e){}
  }

  playDefeatSound() {
    this.initAudio();
    if (!this.audioCtx || this.volume === 0) return;
    
    try {
      const now = this.audioCtx.currentTime;
      const notes = [220.00, 207.65, 196.00, 146.83]; // Descending sad sweep
      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.connect(gain);
        gain.connect(this.masterGainNode);
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + idx * 0.15);
        
        gain.gain.setValueAtTime(0.2, now + idx * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.15 + 0.3);
        
        osc.start(now + idx * 0.15);
        osc.stop(now + idx * 0.15 + 0.35);
      });
    } catch(e){}
  }
}

// Initialize global SoundManager
window.soundManager = new SoundManager();

class GameEngine {
  constructor() {
    this.canvas = document.getElementById('game-canvas');
    this.ctx = this.canvas.getContext('2d');
    
    // Size and scaling
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    
    // Game state
    this.player = null;
    this.enemies = [];
    this.projectiles = [];
    this.particles = [];
    
    this.activeStage = 1;
    this.activeLevel = 1;
    this.unlockedStage = 1;
    
    this.isPlaying = false;
    this.lastTime = 0;
    this.targetFps = 60; // Throttled FPS limit
    
    // Spawn counters
    this.spawnTimer = 0;
    this.spawnInterval = 3.5; // Seconds between spawns
    this.enemiesSpawnedInLevel = 0;
    this.enemiesKilledInLevel = 0;
    this.enemiesRequiredToClear = 6;
    this.bossSpawned = false;
    
    // Scrolling background
    this.bgOffset = 0;
    this.scrollSpeed = 15; // Pixels per second
    
    // Screen shake
    this.shakeIntensity = 0;
    this.shakeDuration = 0;
    
    // Asset loaders
    this.bgImages = {
      1: new Image(),
      2: new Image(),
      3: new Image()
    };
    
    this.bgImages[1].src = 'assets/farm_background.png';
    this.bgImages[2].src = 'assets/underwater_background.png';
    this.bgImages[3].src = 'assets/desert_background.png';
    
    this.bgLoaded = { 1: false, 2: false, 3: false };
    
    for (let key in this.bgImages) {
      this.bgImages[key].onload = () => { this.bgLoaded[key] = true; };
    }
  }
  
  setGroundY(height) {
    this.height = height;
    this.canvas.height = height;
    groundY = height - 28; // Keep ground 28px from the bottom
  }
  
  initGame(playerClass, allocatedStats = null) {
    this.player = new Player(playerClass);
    if (allocatedStats) {
      this.player.allocatedStats = allocatedStats;
      this.player.initClassStats();
    }
    this.activeStage = 1;
    this.activeLevel = 1;
    this.unlockedStage = 3;
    this.isPlaying = true;
    this.startLevel();
    
    // Reset loop
    this.lastTime = performance.now();
    requestAnimationFrame((t) => this.gameLoop(t));
  }
  
  startLevel() {
    this.enemies = [];
    // Kept projectiles and particles for seamless visual carry-over
    this.enemiesSpawnedInLevel = 0;
    this.enemiesKilledInLevel = 0;
    this.spawnTimer = 0;
    this.bossSpawned = false;
    
    // Set level rules
    if (this.activeLevel === 5) {
      this.enemiesRequiredToClear = 1; // Just the boss
    } else {
      this.enemiesRequiredToClear = 5 + this.activeLevel; // Scales: 6, 7, 8, 9
    }
    
    // Align ground level coordinates
    this.player.y = groundY - this.player.height;
    this.player.x = 50;
    this.player.target = null;
    
    // Trigger screen text
    const label = this.activeLevel === 5 ? "BOSS WAVE" : `Level ${this.activeStage}-${this.activeLevel}`;
    const color = this.activeLevel === 5 ? 'hsl(0, 95%, 55%)' : 'hsl(260, 95%, 75%)';
    this.particles.push(new Particle(this.width / 2, groundY - 60, 0, -30, color, label, 26, 2.0));
    
    if (this.activeLevel === 5) {
      this.triggerScreenShake(8, 0.8);
    }
    
    // Update stats UI
    if (window.updateUI) window.updateUI();
  }
  
  triggerScreenShake(intensity, duration) {
    this.shakeIntensity = intensity;
    this.shakeDuration = duration;
  }
  
  spawnEnemy() {
    this.enemiesSpawnedInLevel++;
    
    if (this.activeLevel === 5) {
      // Spawn Boss
      this.bossSpawned = true;
      if (this.activeStage === 1) {
        this.enemies.push(new Boss("Giant Angry Bull", 1, 350, 45, 14, 150, 100));
      } else if (this.activeStage === 2) {
        this.enemies.push(new Boss("Deepwater Kraken", 2, 850, 35, 25, 400, 300));
      } else if (this.activeStage === 3) {
        this.enemies.push(new Boss("Pharaoh Mummy", 3, 1800, 25, 42, 1000, 800));
      }
    } else {
      // Spawn Normal Enemies based on stage and level
      const lvlOffset = this.activeLevel;
      if (this.activeStage === 1) {
        const types = ['chicken', 'pig', 'sheep'];
        const rType = types[Math.floor(Math.random() * types.length)];
        if (rType === 'chicken') {
          this.enemies.push(new Enemy("Furious Chicken", "chicken", 1, this.activeLevel, 25 + lvlOffset * 4, 95, 4 + lvlOffset, 12, 5 + lvlOffset));
        } else if (rType === 'pig') {
          this.enemies.push(new Enemy("Wild Pig", "pig", 1, this.activeLevel, 45 + lvlOffset * 6, 45, 8 + lvlOffset * 2, 18, 9 + lvlOffset * 2));
        } else {
          this.enemies.push(new Enemy("Rambunctious Sheep", "sheep", 1, this.activeLevel, 70 + lvlOffset * 8, 32, 6 + lvlOffset, 25, 15 + lvlOffset * 3));
        }
      } else if (this.activeStage === 2) {
        const types = ['jellyfish', 'crab', 'seahorse', 'shark'];
        const rType = types[Math.floor(Math.random() * types.length)];
        if (rType === 'jellyfish') {
          this.enemies.push(new Enemy("Electric Jellyfish", "jellyfish", 2, this.activeLevel, 65 + lvlOffset * 8, 40, 12 + lvlOffset, 30, 14 + lvlOffset * 2));
        } else if (rType === 'crab') {
          this.enemies.push(new Enemy("Armored Crab", "crab", 2, this.activeLevel, 110 + lvlOffset * 12, 50, 15 + lvlOffset * 2, 38, 18 + lvlOffset * 3));
        } else if (rType === 'seahorse') {
          this.enemies.push(new Enemy("Bubble Seahorse", "seahorse", 2, this.activeLevel, 85 + lvlOffset * 9, 55, 10 + lvlOffset, 32, 16 + lvlOffset * 2));
        } else {
          this.enemies.push(new Enemy("Hunter Shark", "shark", 2, this.activeLevel, 140 + lvlOffset * 15, 75, 20 + lvlOffset * 3, 55, 30 + lvlOffset * 4));
        }
      } else if (this.activeStage === 3) {
        const types = ['scorpion', 'cobra', 'mummy', 'spider'];
        const rType = types[Math.floor(Math.random() * types.length)];
        if (rType === 'scorpion') {
          this.enemies.push(new Enemy("Poison Scorpion", "scorpion", 3, this.activeLevel, 130 + lvlOffset * 16, 70, 24 + lvlOffset * 2, 60, 32 + lvlOffset * 3));
        } else if (rType === 'cobra') {
          this.enemies.push(new Enemy("Golden Cobra", "cobra", 3, this.activeLevel, 150 + lvlOffset * 14, 85, 28 + lvlOffset * 2, 72, 40 + lvlOffset * 4));
        } else if (rType === 'mummy') {
          this.enemies.push(new Enemy("Risen Mummy", "mummy", 3, this.activeLevel, 250 + lvlOffset * 22, 40, 22 + lvlOffset, 85, 48 + lvlOffset * 4, 1.3));
        } else if (rType === 'spider') {
          this.enemies.push(new Enemy("Desert Spider", "spider", 3, this.activeLevel, 110 + lvlOffset * 14, 80, 18 + lvlOffset * 2, 50, 28 + lvlOffset * 3, 1.1));
        }
      }
    }
  }
  
  // Pharaoh Boss minion summoning callback
  spawnPharaohMinions() {
    // Spawn 2 sand mummies slightly in front of Pharaoh
    const pX = this.enemies[0] ? this.enemies[0].x : 700;
    this.enemies.push(new Enemy("Sand Minion", "mummy", 3, 5, 60, 45, 14, 0, 0, 1.1));
    this.enemies.push(new Enemy("Sand Minion", "mummy", 3, 5, 60, 45, 14, 0, 0, 1.1));
    
    // Offset the X coords slightly so they don't overlap perfectly
    this.enemies[this.enemies.length - 1].x = pX - 30;
    this.enemies[this.enemies.length - 2].x = pX - 60;
  }
  
  gameLoop(timestamp) {
    if (!this.isPlaying) return;
    
    // Calculate elapsed time
    const elapsed = timestamp - this.lastTime;
    const requiredInterval = 1000 / (this.targetFps || 60);
    
    if (elapsed >= requiredInterval) {
      // Adjust lastTime: we subtract the remainder to keep timing precise
      this.lastTime = timestamp - (elapsed % requiredInterval);
      
      const dt = Math.min(0.1, elapsed / 1000);
      this.update(dt);
      this.render();
    }
    
    requestAnimationFrame((t) => this.gameLoop(t));
  }
  
  update(dt) {
    // Update screen shake
    if (this.shakeDuration > 0) {
      this.shakeDuration -= dt;
      if (this.shakeDuration <= 0) {
        this.shakeIntensity = 0;
      }
    }
    
    // Update player
    if (this.player) {
      this.player.update(dt, this.enemies, this.projectiles, this.particles);
      
      // Handle player death
      if (this.player.isDead) {
        this.isPlaying = false;
        if (window.soundManager) window.soundManager.playDefeatSound();
        if (window.showGameOver) window.showGameOver();
        return;
      }
    }
    
    // Spawn manager
    if (!this.player.isDead) {
      if (this.activeLevel === 5) {
        // Boss wave: Spawn only one boss
        if (!this.bossSpawned) {
          this.spawnEnemy();
        }
      } else {
        // Normal waves: Spawn at set intervals up to required level limit
        if (this.enemiesSpawnedInLevel < this.enemiesRequiredToClear) {
          this.spawnTimer += dt;
          if (this.spawnTimer >= this.spawnInterval) {
            this.spawnEnemy();
            this.spawnTimer = 0;
          }
        }
        
        // Spawn first enemy immediately if empty
        if (this.enemies.length === 0 && this.enemiesSpawnedInLevel === 0) {
          this.spawnEnemy();
        }
      }
    }
    
    // Update active enemies
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i];
      if (enemy.isBoss) {
        // Boss custom update with minions callback
        enemy.update(dt, this.player, this.projectiles, this.particles, () => this.spawnPharaohMinions());
      } else {
        enemy.update(dt, this.player);
      }
      
      // Check enemy death
      if (enemy.isDead) {
        // Grant rewards
        this.player.gainGold(enemy.goldReward, this.particles);
        this.player.gainXp(enemy.xpReward, this.particles);
        this.triggerScreenShake(4, 0.15); // Hit screen shake
        
        this.enemiesKilledInLevel++;
        this.enemies.splice(i, 1);
        
        // Clean target references
        if (this.player.target === enemy) {
          this.player.target = null;
        }
        
        // Update stats UI
        if (window.updateUI) window.updateUI();
        
        // Check Level Clear condition
        if (this.enemiesKilledInLevel >= this.enemiesRequiredToClear) {
          this.handleLevelClear();
        }
      }
    }
    
    // Update projectiles
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const proj = this.projectiles[i];
      proj.update(dt, this.enemies, this.player, this.particles);
      if (proj.isDead) {
        this.projectiles.splice(i, 1);
      }
    }
    
    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.update(dt);
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
    
    // Scroll background if player is moving forward
    if (this.player && this.player.target) {
      const distance = Math.abs(this.player.x + this.player.width - this.player.target.x);
      if (distance > this.player.atkRange) {
        this.bgOffset = (this.bgOffset - this.scrollSpeed * dt) % (2 * this.width);
      }
    }
  }
  
  handleLevelClear() {
    // Success particle burst
    for (let i = 0; i < 40; i++) {
      this.particles.push(new Particle(
        this.width / 2,
        groundY - 60,
        (Math.random() - 0.5) * 200,
        (Math.random() - 0.5) * 150 - 50,
        'hsl(145, 80%, 45%)',
        null,
        3.5,
        1.5
      ));
    }
    
    if (this.activeLevel === 5) {
      // Boss cleared! Stage unlocked!
      if (this.activeStage === 3) {
        // Complete game win: Wrap back to Stage 1 Level 1 and keep playing continuously
        this.particles.push(new Particle(this.width / 2, groundY - 65, 0, -40, 'hsl(42, 95%, 55%)', 'CONQUERED! RESTARTING...', 28, 3.0));
        this.activeStage = 1;
        this.activeLevel = 1;
        this.startLevel();
        if (window.showVictory) window.showVictory();
      } else {
        // Unlock next stage and progress immediately
        this.unlockedStage = Math.max(this.unlockedStage, this.activeStage + 1);
        this.particles.push(new Particle(this.width / 2, groundY - 65, 0, -40, 'hsl(42, 95%, 55%)', 'STAGE CLEAR!', 24, 2.5));
        
        this.activeStage++;
        this.activeLevel = 1;
        this.startLevel();
        if (window.updateUI) window.updateUI();
      }
    } else {
      // Normal level clear: Progress to next level immediately
      this.activeLevel++;
      this.particles.push(new Particle(this.width / 2, groundY - 65, 0, -45, 'hsl(145, 80%, 45%)', 'WAVE CLEAR!', 22, 1.5));
      this.startLevel();
      if (window.updateUI) window.updateUI();
    }
  }
  
  render() {
    this.ctx.save();
    
    // Apply screen shake
    if (this.shakeIntensity > 0) {
      const dx = (Math.random() - 0.5) * this.shakeIntensity;
      const dy = (Math.random() - 0.5) * this.shakeIntensity;
      this.ctx.translate(dx, dy);
    }
    
    // Clear canvas
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // Draw background
    this.drawBackground();
    
    // Draw ground line
    this.ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(0, groundY);
    this.ctx.lineTo(this.width, groundY);
    this.ctx.stroke();
    
    // Render entities
    if (this.player) this.player.draw(this.ctx);
    
    for (const enemy of this.enemies) {
      enemy.draw(this.ctx);
    }
    
    for (const proj of this.projectiles) {
      proj.draw(this.ctx);
    }
    
    for (const p of this.particles) {
      p.draw(this.ctx);
    }
    
    this.ctx.restore();
  }
  
  drawBgTile(img, x, y, width, height, flipped) {
    if (flipped) {
      this.ctx.save();
      // Translate to the right edge of the target bounding box
      this.ctx.translate(x + width, y);
      // Scale horizontally to mirror it
      this.ctx.scale(-1, 1);
      // Draw from (0,0) with 1px extra width to prevent subpixel hairline cracks
      this.ctx.drawImage(img, 0, 0, width + 1, height);
      this.ctx.restore();
    } else {
      // Draw with 1px extra width to prevent subpixel hairline cracks
      this.ctx.drawImage(img, x, y, width + 1, height);
    }
  }

  drawBackground() {
    const isTaskbar = this.height < 150;
    
    if (this.bgLoaded[this.activeStage]) {
      // Draw scrolling generated backgrounds
      const img = this.bgImages[this.activeStage];
      const yPos = isTaskbar ? -50 : 0; // Adjust clipping for taskbar mode
      
      const scrollX = -this.bgOffset;
      const startTileIndex = Math.floor(scrollX / this.width);
      
      // Draw first tile
      const x1 = startTileIndex * this.width - scrollX;
      const isFlipped1 = (startTileIndex % 2 !== 0);
      this.drawBgTile(img, x1, yPos, this.width, this.height, isFlipped1);
      
      // Draw second tile
      const x2 = (startTileIndex + 1) * this.width - scrollX;
      const isFlipped2 = ((startTileIndex + 1) % 2 !== 0);
      this.drawBgTile(img, x2, yPos, this.width, this.height, isFlipped2);
    } else {
      // Fallback dynamic HSL gradients if background images haven't loaded yet
      const grad = this.ctx.createLinearGradient(0, 0, 0, this.height);
      
      if (this.activeStage === 1) { // Sunset Farm gradient
        grad.addColorStop(0, 'hsl(260, 40%, 15%)');
        grad.addColorStop(0.5, 'hsl(20, 50%, 20%)');
        grad.addColorStop(1, 'hsl(120, 30%, 10%)'); // Ground dark green
      } else if (this.activeStage === 2) { // Deep Sea gradient
        grad.addColorStop(0, 'hsl(205, 70%, 15%)');
        grad.addColorStop(1, 'hsl(220, 80%, 6%)');
      } else if (this.activeStage === 3) { // Desert Sunset gradient
        grad.addColorStop(0, 'hsl(340, 50%, 15%)');
        grad.addColorStop(0.5, 'hsl(28, 55%, 22%)');
        grad.addColorStop(1, 'hsl(40, 35%, 15%)');
      }
      
      this.ctx.fillStyle = grad;
      this.ctx.fillRect(0, 0, this.width, this.height);
      
      // Draw simple structural silhouettes for environment feel
      this.ctx.fillStyle = 'rgba(0,0,0,0.15)';
      
      // Map local offset to single width for fallback compatibility
      const localOffset = this.bgOffset % this.width;
      
      if (this.activeStage === 1) {
        // Draw rolling hills
        this.ctx.beginPath();
        this.ctx.arc(200 + localOffset, groundY + 40, 200, 0, Math.PI * 2);
        this.ctx.arc(600 + localOffset, groundY + 80, 300, 0, Math.PI * 2);
        this.ctx.arc(200 + localOffset + this.width, groundY + 40, 200, 0, Math.PI * 2);
        this.ctx.arc(600 + localOffset + this.width, groundY + 80, 300, 0, Math.PI * 2);
        this.ctx.fill();
      } else if (this.activeStage === 2) {
        // Coral branches
        this.ctx.fillRect(150 + localOffset, groundY - 30, 8, 30);
        this.ctx.fillRect(550 + localOffset, groundY - 50, 10, 50);
        this.ctx.fillRect(150 + localOffset + this.width, groundY - 30, 8, 30);
        this.ctx.fillRect(550 + localOffset + this.width, groundY - 50, 10, 50);
      } else if (this.activeStage === 3) {
        // Pyramids silhouttes
        this.ctx.beginPath();
        this.ctx.moveTo(100 + localOffset, groundY);
        this.ctx.lineTo(200 + localOffset, groundY - 80);
        this.ctx.lineTo(300 + localOffset, groundY);
        this.ctx.moveTo(400 + localOffset, groundY);
        this.ctx.lineTo(550 + localOffset, groundY - 110);
        this.ctx.lineTo(700 + localOffset, groundY);
        
        this.ctx.moveTo(100 + localOffset + this.width, groundY);
        this.ctx.lineTo(200 + localOffset + this.width, groundY - 80);
        this.ctx.lineTo(300 + localOffset + this.width, groundY);
        this.ctx.moveTo(400 + localOffset + this.width, groundY);
        this.ctx.lineTo(550 + localOffset + this.width, groundY - 110);
        this.ctx.lineTo(700 + localOffset + this.width, groundY);
        this.ctx.fill();
      }
    }
  }
}
