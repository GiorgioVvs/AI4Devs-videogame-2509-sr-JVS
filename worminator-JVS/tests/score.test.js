import { Game, GRID_SIZE } from '../game.js';

describe('Score System', () => {
  let game;

  beforeEach(() => {
    document.body.innerHTML = '<canvas id="gameCanvas" width="800" height="600"></canvas>';
    HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
      fillStyle: '',
      fillRect: jest.fn(),
    }));
    game = new Game('gameCanvas');
  });

  test('Score should be initialized to 0', () => {
    expect(game.score).toBeDefined();
    expect(game.score).toBe(0);
  });

  test('Score should increment by 1 when consuming prey', () => {
    const initialScore = game.score;
    
    // Setup for consumption (similar to gameplay.test.js)
    // Move worm to Surface Zone
    game.worm.y = 300;
    game.worm.isJumping = true; // Required to prevent digging/clamping to Earth
    game.gravity = 0; // Disable gravity to simplify movement
    
    // Set direction
    game.worm.dx = GRID_SIZE; // Move right
    
    // Position prey in path
    // In update, worm moves by (dx * airDriftFactor). GRID_SIZE=20.
    // Default airDriftFactor is likely < 1 (e.g. 0.5 -> 10px).
    // So next position is x + 10.
    // Distance check is < GRID_SIZE (20).
    // If we place prey at x + 10, distance is 0 after move.
    
    // We don't know exact airDriftFactor without reading code, 
    // but placing prey close enough should work.
    // Let's place it exactly where the worm will be.
    // Assuming standard update call:
    // x += dx * drift
    
    // Actually, I should just force the collision condition or state 
    // to ensure the test is robust, OR rely on the existing collision logic.
    // Relying on existing logic is better for integration.
    
    // Let's "mock" the movement to guarantee overlap.
    game.worm.x = 100;
    game.worm.y = 300;
    game.worm.dx = 0;
    game.worm.dy = 0;
    
    game.prey = {
        x: 100,
        y: 300
    };
    
    // We need to trigger the checkCollision/eat logic.
    // This usually happens inside game.update().
    // If game.update() moves the worm, we might move PAST the prey if we aren't careful.
    // But if dx/dy are 0, we stay put.
    // The previous test set dx.
    
    // Let's rely on game.update() logic.
    game.update();
    
    expect(game.score).toBe(initialScore + 1);
  });
});
