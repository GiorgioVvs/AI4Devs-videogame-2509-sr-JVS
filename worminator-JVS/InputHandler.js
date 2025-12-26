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

    // Jump
    if (this.keys['ArrowUp']) {
      this.game.triggerJump();
    }
  }
}
