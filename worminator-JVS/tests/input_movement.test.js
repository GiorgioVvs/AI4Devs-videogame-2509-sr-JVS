import { Game, GRID_SIZE } from '../game.js';

describe('Input Handling and Horizontal Movement', () => {
  let game;

  beforeEach(() => {
    document.body.innerHTML = '<canvas id="gameCanvas" width="800" height="600"></canvas>';
    HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
      fillStyle: '',
      fillRect: jest.fn(),
    }));
    game = new Game('gameCanvas');
  });

  test('Game should have an input handler', () => {
    expect(game.inputHandler).toBeDefined();
  });

  test('Pressing ArrowRight should set positive horizontal velocity', () => {
    // Simulate keydown
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    window.dispatchEvent(event);
    
    // We expect game loop or input handler to update worm velocity
    // Depending on implementation, this might happen immediately or on update
    // Let's assume immediate update or state polling in update
    // If it's polling, we need to call update. 
    // If event driven, it should be immediate.
    // Let's check dx.
    
    // NOTE: Previous implementation had constant movement. We expect this to change to 0 initial, then value on key press.
    // So checking for > 0 is good.
    game.update(); // Just in case logic is there
    expect(game.worm.dx).toBeGreaterThan(0);
  });

  test('Pressing ArrowLeft should set negative horizontal velocity', () => {
    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    window.dispatchEvent(event);
    game.update();
    expect(game.worm.dx).toBeLessThan(0);
  });

  test('Releasing keys should stop horizontal movement', () => {
    // Press right
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    // Release right
    window.dispatchEvent(new KeyboardEvent('keyup', { key: 'ArrowRight' }));
    
    game.update();
    expect(game.worm.dx).toBe(0);
  });

  test('Worm should be initialized at the bottom (Earth Zone)', () => {
      // Earth is bottom 1/3. Canvas height 600. Earth starts at 400.
      // Worm should be in this range.
      expect(game.worm.y).toBeGreaterThanOrEqual(400);
  });

  test('Worm should not move below the screen bottom', () => {
      game.worm.y = 600 - GRID_SIZE; // At bottom edge
      game.worm.dy = 10; // Try to move down
      game.update();
      
      // Should be clamped
      expect(game.worm.y).toBeLessThanOrEqual(600 - GRID_SIZE);
  });
});
