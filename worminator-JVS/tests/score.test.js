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

describe('Score UI', () => {
  let game;
  let scoreElement;

  beforeEach(() => {
    // Setup DOM with score element
    document.body.innerHTML = `
      <div id="game-container" style="position: relative;">
        <canvas id="gameCanvas" width="800" height="600"></canvas>
        <div id="score-display">Score: 0</div>
      </div>
    `;
    scoreElement = document.getElementById('score-display');
    
    HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
      fillStyle: '',
      fillRect: jest.fn(),
    }));
    game = new Game('gameCanvas');
  });

  test('Score display should exist', () => {
    expect(scoreElement).not.toBeNull();
  });

  test('Score display should update when score changes', () => {
    // Manually trigger an update (simulating game loop/prey eat)
    // We need to know HOW the game updates the UI.
    // Likely in game.update() or a specific setter/method.
    // For now, let's assume game.update() handles it or triggers it.
    
    // Force score change logic
    // game.score = 5; // Removed to start from 0
    
    // We might need to call a method to sync UI, or wait for next frame/update.
    // Let's assume 'update' or 'draw' handles it. 
    // Usually UI updates might happen in 'draw' or specifically when score changes.
    // Let's call game.draw() as that's where rendering happens, 
    // BUT DOM updates are usually separate from canvas draw.
    // Let's call game.update() (where logic happens) and game.draw().
    // If the implementation puts it in a setter for score, it would happen immediately.
    // If it puts it in update/draw loop, we need to call those.
    
    // Let's call game.update();
    // But game.update() calculates score. It doesn't necessarily take "5" and put it in UI unless we force it.
    // Let's simulate eating prey which triggers the increment AND the UI update.
    
    // Move worm to prey to trigger eat
    game.worm.x = 100;
    game.worm.y = 300;
    game.worm.isJumping = true; // surface zone
    game.prey = { x: 100, y: 300 };
    
    game.update(); // Should eat and increment to 1
    
    expect(game.score).toBe(1);
    expect(scoreElement.textContent).toBe('Score: 1');
  });
});
