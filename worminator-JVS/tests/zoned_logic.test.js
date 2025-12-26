import { Game, GRID_SIZE } from '../game.js';

describe('Zoned Gameplay Logic', () => {
  let game;

  beforeEach(() => {
    document.body.innerHTML = '<canvas id="gameCanvas" width="800" height="600"></canvas>';
    HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
      fillStyle: '',
      fillRect: jest.fn(),
    }));
    game = new Game('gameCanvas');
  });

  test('Prey should ONLY spawn in Surface zone', () => {
    // Run multiple spawns to verify range
    for (let i = 0; i < 50; i++) {
        game.spawnPrey();
        expect(game.prey.y).toBeGreaterThanOrEqual(game.zones.surface);
        expect(game.prey.y).toBeLessThan(game.zones.earth);
    }
  });

  test('Worm should eat prey if in Surface zone', () => {
    // Manually place prey in Surface zone
    game.prey.x = 100;
    game.prey.y = 200; // Top of Surface
    
    // Place worm head on prey
    game.worm.x = 100;
    game.worm.y = 200;
    
    // Set isJumping to true so we don't get clamped to Earth
    game.worm.isJumping = true;
    
    // Initial segments
    const initialSegments = game.worm.segments.length;
    
    game.update();
    
    expect(game.worm.segments.length).toBeGreaterThan(initialSegments);
  });

  test('Worm should NOT eat prey if head is outside Surface zone (e.g. Earth)', () => {
    // This scenario is tricky because prey spawns in Surface.
    // But IF prey somehow was in Earth (maybe bug or old state), worm shouldn't eat it?
    // OR, maybe the rule is: Worm head must be in surface zone to EAT.
    // But if prey is in surface, and worm head is in surface to collide, then it eats.
    // Is it possible to collide with prey while NOT in surface zone?
    // Only if prey is NOT in surface zone.
    // But prey is restricted to surface.
    // So this requirement "Worm only grows/eats prey when its head is in the Surface zone"
    // is effectively satisfied if prey is ONLY in surface zone.
    
    // Let's test the edge case: Worm eats prey at boundary?
    // If prey is at 200 (surface top). Worm at 200. Worm is in surface. Eats.
    // If prey is at 400 (earth top).
    // spawnPrey logic: maxGridY = (400/20) - 1 = 19. 19*20 = 380.
    // So prey never spawns at 400.
    // So prey is always strictly < 400.
    // So if worm collides with prey, worm MUST be < 400.
    
    // What if worm is jumping through surface?
    // If prey is at 300. Worm passes 300. Eats. Correct.
    
    // The spec "Prey can ONLY be consumed if the worm's head is within the Surface zone"
    // is redundant if prey is ONLY in surface zone.
    // UNLESS there is a special prey that falls? Or moves?
    // For now, static prey.
    
    // Let's force a "bugged" prey in Earth zone and ensure it is NOT eaten.
    // This enforces the rule robustly.
    game.prey.x = 400;
    game.prey.y = 500; // Deep in Earth
    
    game.worm.x = 400;
    game.worm.y = 500;
    
    const initialSegments = game.worm.segments.length; // 0
    game.update();
    
    // Should NOT eat.
    // So segments should be 0.
    expect(game.worm.segments.length).toBe(initialSegments);
  });
});
