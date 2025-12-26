import { Game, GRID_SIZE } from '../game.js';
import { InputHandler } from '../InputHandler.js';

describe('Digging Mechanics', () => {
  let game;

  beforeEach(() => {
    document.body.innerHTML = '<canvas id="gameCanvas" width="800" height="600"></canvas>';
    HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
      fillStyle: '',
      fillRect: jest.fn(),
    }));
    game = new Game('gameCanvas');
  });

  test('Pressing ArrowDown should move worm deeper into earth', () => {
    // Initial pos at 400 (top of earth)
    expect(game.worm.y).toBe(400);
    
    // Simulate Down
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    window.dispatchEvent(event);
    
    // Update should move worm down
    game.update();
    expect(game.worm.y).toBeGreaterThan(400);
  });

  test('Pressing ArrowUp while deep in earth should move worm up', () => {
    // Force worm deep
    game.worm.y = 500;
    
    // Simulate Up
    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    window.dispatchEvent(event);
    
    game.update();
    expect(game.worm.y).toBeLessThan(500);
    // Should NOT be jumping yet
    expect(game.worm.isJumping).toBe(false);
  });

  test('Pressing ArrowUp at Earth surface should trigger Jump', () => {
    // Force worm at surface
    game.worm.y = 400; // Top of earth
    
    // Simulate Up
    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    window.dispatchEvent(event);
    
    expect(game.worm.isJumping).toBe(true);
  });
});
