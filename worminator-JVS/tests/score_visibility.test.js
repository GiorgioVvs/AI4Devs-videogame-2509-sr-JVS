import fs from 'fs';
import path from 'path';

describe('Score Visibility', () => {
  let styles;
  let html;

  beforeAll(() => {
    html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    styles = fs.readFileSync(path.resolve(__dirname, '../styles.css'), 'utf8');
    document.body.innerHTML = html;
  });

  test('Score display should have a positive z-index', () => {
      // Extract #score-display block
      const scoreStyleMatch = styles.match(/#score-display\s*{[^}]*}/);
      expect(scoreStyleMatch).not.toBeNull();
      const scoreStyleBlock = scoreStyleMatch[0];
      
      // Expect z-index to be defined
      expect(scoreStyleBlock).toMatch(/z-index:\s*[1-9][0-9]*/);
  });
  
  test('Score display should be after canvas in DOM structure for better default stacking', () => {
      const container = document.getElementById('game-container');
      const score = document.getElementById('score-display');
      const canvas = document.getElementById('gameCanvas');
      
      // We expect the score to be the last element to sit on top
      expect(container.lastElementChild.id).toBe('score-display');
  });
});
