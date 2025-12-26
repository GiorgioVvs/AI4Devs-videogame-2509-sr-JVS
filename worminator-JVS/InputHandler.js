import { GRID_SIZE } from './game.js';

export class InputHandler {
  constructor(game) {
    this.game = game;
    this.keys = {};

    window.addEventListener('keydown', (e) => {
      this.keys[e.key] = true;
      this.handleInput();
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.key] = false;
      this.handleInput();
    });
  }

  handleInput() {
    // Horizontal Movement
    if (this.keys['ArrowRight']) {
      this.game.worm.dx = GRID_SIZE;
    } else if (this.keys['ArrowLeft']) {
      this.game.worm.dx = -GRID_SIZE;
    } else {
      this.game.worm.dx = 0;
    }

    // Vertical Movement
    if (this.keys['ArrowDown']) {
        this.game.worm.dy = GRID_SIZE;
    } else if (this.keys['ArrowUp']) {
        // If we are deep in earth, move up. If at surface/boundary, Jump.
        if (this.game.worm.y > this.game.zones.earth) {
             this.game.worm.dy = -GRID_SIZE;
        } else {
             this.game.triggerJump();
        }
    } else if (!this.game.worm.isJumping) {
        this.game.worm.dy = 0;
    }
  }
}
