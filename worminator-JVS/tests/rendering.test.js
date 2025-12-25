import { Game } from '../game.js';

describe('Game Rendering', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="game-container">
        <canvas id="gameCanvas" width="800" height="600"></canvas>
      </div>
    `;
    HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
      fillStyle: '',
      fillRect: jest.fn(),
    }));
  });

  test('Game should initialize with canvas context', () => {
    const game = new Game('gameCanvas');
    expect(game.canvas).toBeTruthy();
    expect(game.context).toBeTruthy();
    expect(game.width).toBe(800);
    expect(game.height).toBe(600);
  });

  test('Game should have a start method', () => {
    const game = new Game('gameCanvas');
    expect(typeof game.start).toBe('function');
  });

  test('start should call requestAnimationFrame', () => {
    const game = new Game('gameCanvas');
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => null);
    game.start();
    expect(window.requestAnimationFrame).toHaveBeenCalled();
  });

  test('draw should fill background', () => {
    const game = new Game('gameCanvas');
    game.draw();
    expect(game.context.fillRect).toHaveBeenCalledWith(0, 0, 800, 600);
  });

  test('loop should call update, draw and requestAnimationFrame', () => {
    const game = new Game('gameCanvas');
    game.update = jest.fn();
    game.draw = jest.fn();
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => null);
    
    game.loop();
    
    expect(game.update).toHaveBeenCalled();
    expect(game.draw).toHaveBeenCalled();
    expect(window.requestAnimationFrame).toHaveBeenCalled();
  });

  test('constructor should throw error if canvas not found', () => {
    expect(() => new Game('nonExistentId')).toThrow();
  });
});
