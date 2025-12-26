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
    
    // Force prey to be directly in front of the worm
    const targetX = game.worm.x + game.worm.dx;
    const targetY = game.worm.y + game.worm.dy;
    
    game.prey = {
        x: targetX,
        y: targetY
    };

    // Update game (move worm into prey)
    game.update();

    // Worm should have moved to the target
    expect(game.worm.x).toBe(targetX);
    expect(game.worm.y).toBe(targetY);

    // Segments should have increased
    expect(game.worm.segments.length).toBeGreaterThan(initialLength);

    // Prey should have respawned (moved)
    // We compare current prey pos with the OLD prey pos (where the worm is now)
    expect(game.prey.x !== targetX || game.prey.y !== targetY).toBe(true);
  });
});
