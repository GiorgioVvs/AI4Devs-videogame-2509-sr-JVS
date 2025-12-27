import { InputHandler } from './InputHandler.js';

export const GRID_SIZE = 20;

export class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      throw new Error(`Canvas with id ${canvasId} not found`);
    }
    this.context = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    
    this.zones = {
      air: 0,
      surface: this.height / 3,
      earth: (this.height / 3) * 2
    };

    this.worm = {
      x: 400,
      y: 400, // Top of Earth zone
      dx: 0,
      dy: 0,
      isJumping: false,
      segments: []
    };
    
    this.gravity = 0.5;
    this.jumpStrength = -18; // Increased to ensure reach into Air zone
    this.airDriftFactor = 0.5;

    this.score = 0;
    this.scoreElement = document.getElementById('score-display');

    this.inputHandler = new InputHandler(this);
    this.spawnPrey();

    this.loop = this.loop.bind(this);
  }

  start() {
    requestAnimationFrame(this.loop);
  }

  spawnPrey() {
    // Restrict to Surface Zone
    // Surface starts at this.zones.surface (200) and ends at this.zones.earth (400)
    // Random Y between 200 and 380 (assuming 20px grid)
    
    const minGridY = this.zones.surface / GRID_SIZE;
    const maxGridY = (this.zones.earth / GRID_SIZE) - 1;
    
    const randomGridY = Math.floor(Math.random() * (maxGridY - minGridY + 1)) + minGridY;

    this.prey = {
      x: Math.floor(Math.random() * (this.width / GRID_SIZE)) * GRID_SIZE,
      y: randomGridY * GRID_SIZE
    };
  }

  triggerJump() {
    if (!this.worm.isJumping) {
      this.worm.isJumping = true;
      this.worm.dy = this.jumpStrength;
    }
  }

  loop() {
    this.update();
    this.draw();
    requestAnimationFrame(this.loop);
  }

  update() {
    const headX = this.worm.x;
    const headY = this.worm.y;

    // Apply movement
    const currentDx = this.worm.isJumping ? this.worm.dx * this.airDriftFactor : this.worm.dx;
    this.worm.x += currentDx;
    this.worm.y += this.worm.dy;

    // Apply gravity
    if (this.worm.isJumping) {
      this.worm.dy += this.gravity;
      
      // Landing check: if falling and hit the Earth zone boundary
      // We only land if we were jumping/falling AND we hit the specific surface-earth boundary
      if (this.worm.dy > 0 && this.worm.y >= this.zones.earth && this.worm.y <= this.zones.earth + GRID_SIZE) { // Tolerance check
        this.worm.y = this.zones.earth;
        this.worm.dy = 0;
        this.worm.isJumping = false;
      }
    }

    // Boundary Check (Earth Zone)
    if (!this.worm.isJumping) {
      // Allow moving down (y > earth zone top)
      // Only restrict moving UP past earth zone top (unless jumping, which is handled by InputHandler/triggerJump)
      // Actually, standard movement shouldn't pass top of earth unless jumping.
      if (this.worm.y < this.zones.earth) {
        this.worm.y = this.zones.earth;
      }
      if (this.worm.y > this.height - GRID_SIZE) {
        this.worm.y = this.height - GRID_SIZE;
      }
    }

    // Horizontal boundaries
    if (this.worm.x < 0) this.worm.x = 0;
    if (this.worm.x > this.width - GRID_SIZE) this.worm.x = this.width - GRID_SIZE;

    // Check collision with prey
    let atePrey = false;
    const inSurfaceZone = this.worm.y >= this.zones.air && this.worm.y < this.zones.earth;
    
    // We only check collision if we are in the Surface Zone (or maybe logic is "can only EAT if in surface zone")
    // Spec: "Prey can ONLY be consumed if the worm's head is within the 'Surface' zone."
    // Also, prey is only spawned in Surface. But we need to enforce the consumption rule too (e.g. if prey bugged).
    
    if (inSurfaceZone && Math.abs(this.worm.x - this.prey.x) < GRID_SIZE && Math.abs(this.worm.y - this.prey.y) < GRID_SIZE) {
      atePrey = true;
      this.score++;
      if (this.scoreElement) {
        this.scoreElement.textContent = `Score: ${this.score}`;
      }
      this.spawnPrey();
    }

    // Update segments
    this.worm.segments.unshift({ x: headX, y: headY });
    if (!atePrey) {
      this.worm.segments.pop();
    }
  }

  draw() {
    this.context.fillStyle = '#000';
    this.context.fillRect(0, 0, this.width, this.height);
    
    // Draw Zones
    this.context.fillStyle = '#111'; // Air
    this.context.fillRect(0, 0, this.width, this.height / 3);
    this.context.fillStyle = '#222'; // Surface
    this.context.fillRect(0, this.height / 3, this.width, this.height / 3);
    this.context.fillStyle = '#333'; // Earth
    this.context.fillRect(0, (this.height / 3) * 2, this.width, this.height / 3);

    // Draw Prey
    this.context.fillStyle = '#f00';
    this.context.fillRect(this.prey.x, this.prey.y, GRID_SIZE, GRID_SIZE);

    // Draw worm head
    this.context.fillStyle = this.worm.isJumping ? '#0ff' : '#0f0'; // Cyan if jumping, Green otherwise
    this.context.fillRect(this.worm.x, this.worm.y, GRID_SIZE, GRID_SIZE);

    // Draw worm segments
    this.context.fillStyle = this.worm.isJumping ? '#0aa' : '#0a0'; // Darker for body
    this.worm.segments.forEach(segment => {
      this.context.fillRect(segment.x, segment.y, GRID_SIZE, GRID_SIZE);
    });
  }
}
