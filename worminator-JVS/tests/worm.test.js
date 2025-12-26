import { Game } from '../game.js';

describe('Worm Movement', () => {
  let game;
  const GRID_SIZE = 20;

  beforeEach(() => {
    document.body.innerHTML = '<canvas id="gameCanvas" width="800" height="600"></canvas>';
    HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
      fillStyle: '',
      fillRect: jest.fn(),
    }));
    game = new Game('gameCanvas');
  });

  test('Worm should have an initial position and direction', () => {
    expect(game.worm).toBeDefined();
    expect(game.worm.x).toBe(400);
    expect(game.worm.y).toBe(300);
    expect(game.worm.dx).toBe(GRID_SIZE);
    expect(game.worm.dy).toBe(0);
  });

  test('Worm should update position based on velocity', () => {
    game.update();
    expect(game.worm.x).toBe(400 + GRID_SIZE);
    expect(game.worm.y).toBe(300);
  });

  test('Worm should change direction correctly', () => {
    game.worm.dx = 0;
    game.worm.dy = GRID_SIZE;
    game.update();
    expect(game.worm.x).toBe(400);
    expect(game.worm.y).toBe(300 + GRID_SIZE);
  });

  test('Worm should have an isJumping property initialized to false', () => {
    expect(game.worm.isJumping).toBe(false);
  });

  test('triggerJump should set isJumping to true', () => {
    game.triggerJump();
    expect(game.worm.isJumping).toBe(true);
  });
});
