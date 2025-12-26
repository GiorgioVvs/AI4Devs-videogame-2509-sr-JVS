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
    
    this.worm = {
      x: 400,
      y: 500, // Start in Earth zone (bottom 1/3)
      dx: 0,
      dy: 0,
      isJumping: false,
      segments: []
    };
    
    this.inputHandler = new InputHandler(this);
    this.spawnPrey();

    this.loop = this.loop.bind(this);
  }

  start() {
    requestAnimationFrame(this.loop);
  }

  spawnPrey() {
    this.prey = {
      x: Math.floor(Math.random() * (this.width / GRID_SIZE)) * GRID_SIZE,
      y: Math.floor(Math.random() * (this.height / GRID_SIZE)) * GRID_SIZE
    };
  }

  triggerJump() {
    this.worm.isJumping = true;
    setTimeout(() => {
      this.worm.isJumping = false;
    }, 1000); // Reset after 1 second for now
  }

  loop() {
    this.update();
    this.draw();
    requestAnimationFrame(this.loop);
  }

  update() {
    const headX = this.worm.x;
    const headY = this.worm.y;

    this.worm.x += this.worm.dx;
    this.worm.y += this.worm.dy;

    // Boundary Check (Earth Zone Bottom)
    if (this.worm.y > this.height - GRID_SIZE) {
      this.worm.y = this.height - GRID_SIZE;
    }

    // Check collision with prey
    let atePrey = false;
    if (this.worm.x === this.prey.x && this.worm.y === this.prey.y) {
      atePrey = true;
      this.spawnPrey();
    }

    // Update segments
    // Add new segment at previous head position
    this.worm.segments.unshift({ x: headX, y: headY });
    
    // If we didn't eat, remove the tail to maintain length
    if (!atePrey) {
      this.worm.segments.pop();
    }
  }

  draw() {
    this.context.fillStyle = '#000';
    this.context.fillRect(0, 0, this.width, this.height);
    
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
