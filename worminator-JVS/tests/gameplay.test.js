import { Game, GRID_SIZE } from '../game.js';

describe('Gameplay Mechanics', () => {
  let game;

  beforeEach(() => {
    document.body.innerHTML = '<canvas id="gameCanvas" width="800" height="600"></canvas>';
    HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
      fillStyle: '',
      fillRect: jest.fn(),
    }));
    game = new Game('gameCanvas');
  });

  test('Prey should exist and have valid coordinates aligned to grid', () => {
    expect(game.prey).toBeDefined();
    expect(game.prey.x).toBeGreaterThanOrEqual(0);
    expect(game.prey.x).toBeLessThan(800);
    expect(game.prey.y).toBeGreaterThanOrEqual(0);
    expect(game.prey.y).toBeLessThan(600);
    expect(game.prey.x % GRID_SIZE).toBe(0);
    expect(game.prey.y % GRID_SIZE).toBe(0);
  });

  test('Worm should grow when eating prey', () => {
    // Ensure segments are initialized
    if (!game.worm.segments) {
        // If not implemented yet, this confirms failure or initial state
        game.worm.segments = [];
    }
    const initialLength = game.worm.segments.length;
    
    // Move worm to Surface Zone so it can eat
    game.worm.y = 300;
    game.worm.isJumping = true; // Required to stay in Surface Zone without clamping
    
    // Force prey to be directly in front of the worm
    const targetX = game.worm.x + game.worm.dx; // dx is 0 initially? 
    // dx is 0. So target is same X.
    // Let's set dx.
    game.worm.dx = GRID_SIZE;
    const targetX_moving = game.worm.x + GRID_SIZE;
    
    game.prey = {
        x: targetX_moving,
        y: game.worm.y // Same Y (dy is 0 if not updated by gravity test logic, but we forced isJumping)
        // update applies gravity if isJumping.
        // So y will change.
        // We should account for gravity or set gravity to 0 for this test.
    };
    
    // Disable gravity for this test to ensure collision
    game.gravity = 0;
    
    // Update game (move worm into prey)
    game.update();

    // Worm should have moved to the target
    // x moved by dx * airDriftFactor? 
    // Yes, isJumping is true.
    // dx was GRID_SIZE.
    // x += GRID_SIZE * 0.5 = 10.
    // GRID_SIZE is 20.
    // Collision check is < 20.
    // Distance 10 < 20.
    // Should eat.
    
    // Segments should have increased
    expect(game.worm.segments.length).toBeGreaterThan(initialLength);

    // Prey should have respawned (moved)
    expect(game.prey.x !== targetX_moving || game.prey.y !== 300).toBe(true);
  });
});
