import { Game, GRID_SIZE } from '../game.js';

describe('Jumping Physics and Zoned Layout', () => {
  let game;

  beforeEach(() => {
    document.body.innerHTML = '<canvas id="gameCanvas" width="800" height="600"></canvas>';
    HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
      fillStyle: '',
      fillRect: jest.fn(),
    }));
    game = new Game('gameCanvas');
  });

  test('triggerJump should set an upward vertical velocity', () => {
    game.triggerJump();
    expect(game.worm.dy).toBeLessThan(0);
    expect(game.worm.isJumping).toBe(true);
  });

  test('Gravity should increase vertical velocity over time', () => {
    game.triggerJump();
    const initialDy = game.worm.dy;
    game.update();
    expect(game.worm.dy).toBeGreaterThan(initialDy);
  });

  test('Worm should eventually come back down and stop jumping', () => {
    game.triggerJump();
    // Simulate multiple updates until it hits ground
    for (let i = 0; i < 100; i++) {
        game.update();
    }
    expect(game.worm.y).toBeGreaterThanOrEqual(400); // Back in Earth zone
    expect(game.worm.isJumping).toBe(false);
    expect(game.worm.dy).toBe(0);
  });

  test('Horizontal speed should be reduced while in the air', () => {
    // Ground speed
    game.worm.dx = GRID_SIZE;
    expect(game.worm.dx).toBe(GRID_SIZE);

    game.triggerJump();
    game.update();
    
    // In air, we expect it to be reduced. 
    // Let's assume a factor of 0.5 or similar.
    // We check the logic in update that applies this drift.
    // Actually, InputHandler sets dx based on keys. 
    // If jumping, the effective dx in update should be reduced.
    
    // Let's refine: The task says "Implement Feature: Reduced horizontal speed (Air Drift) during jump"
    // So update() should probably apply a multiplier to the horizontal movement if isJumping is true.
    
    const xBefore = game.worm.x;
    game.worm.dx = GRID_SIZE;
    game.update();
    const movementInAir = game.worm.x - xBefore;
    
    expect(movementInAir).toBeLessThan(GRID_SIZE);
  });

  test('Zoned thresholds should be defined', () => {
      // Earth: bottom 1/3 (y >= 400)
      // Surface: middle 1/3 (200 <= y < 400)
      // Air: top 1/3 (y < 200)
      expect(game.zones).toBeDefined();
      expect(game.zones.earth).toBe(400);
      expect(game.zones.surface).toBe(200);
  });
});
