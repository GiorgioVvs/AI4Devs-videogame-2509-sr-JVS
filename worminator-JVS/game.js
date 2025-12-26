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
      y: 300,
      dx: GRID_SIZE,
      dy: 0
    };

    this.loop = this.loop.bind(this);
  }

  start() {
    requestAnimationFrame(this.loop);
  }

  loop() {
    this.update();
    this.draw();
    requestAnimationFrame(this.loop);
  }

  update() {
    this.worm.x += this.worm.dx;
    this.worm.y += this.worm.dy;
  }

  draw() {
    this.context.fillStyle = '#000';
    this.context.fillRect(0, 0, this.width, this.height);
    
    // Draw worm (optional but good for visual debugging, though tests don't check it yet)
    this.context.fillStyle = '#0f0';
    this.context.fillRect(this.worm.x, this.worm.y, GRID_SIZE, GRID_SIZE);
  }
}
