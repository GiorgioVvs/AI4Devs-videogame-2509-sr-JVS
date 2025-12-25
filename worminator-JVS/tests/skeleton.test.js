const fs = require('fs');
const path = require('path');

describe('Project Skeleton', () => {
  const baseDir = path.resolve(__dirname, '..');

  test('index.html should exist', () => {
    const filePath = path.join(baseDir, 'index.html');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  test('styles.css should exist', () => {
    const filePath = path.join(baseDir, 'styles.css');
    expect(fs.existsSync(filePath)).toBe(true);
  });

  test('game.js should exist', () => {
    const filePath = path.join(baseDir, 'game.js');
    expect(fs.existsSync(filePath)).toBe(true);
  });
});
