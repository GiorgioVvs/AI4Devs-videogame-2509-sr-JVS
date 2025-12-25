export class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      throw new Error(`Canvas with id ${canvasId} not found`);
    }
    this.context = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
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
    // Game logic placeholder
  }

  draw() {
    this.context.fillStyle = '#000';
    this.context.fillRect(0, 0, this.width, this.height);
  }
}
