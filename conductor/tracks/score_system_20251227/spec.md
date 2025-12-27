# Track Spec: Basic Score System

## Overview
Implement a simple score system that tracks the number of prey consumed by the worm. The score will be displayed in real-time via an HTML overlay on top of the game canvas.

## Functional Requirements
- **Score Tracking:**
    - The game must maintain a `score` variable initialized to 0.
    - The `score` must increment by exactly 1 every time the worm consumes a piece of prey (i.e., when the collision detection for eating prey is triggered).
- **UI Display:**
    - Create an HTML element (e.g., `<div id="score-display">`) to show the score.
    - The display should be positioned as an overlay (e.g., top-left corner) relative to the game canvas.
    - The display text should follow a simple format: `Score: [current_score]`.
- **Session Lifecycle:**
    - The score is session-based and does not persist between page reloads.

## Acceptance Criteria
- [ ] A score counter is visible on the screen when the game starts.
- [ ] The score starts at 0.
- [ ] Consuming a prey item increases the score by 1.
- [ ] The HTML display updates immediately when a prey is consumed.
- [ ] Refreshing the page resets the score to 0.

## Out of Scope
- High score persistence (localStorage).
- Sound effects or complex animations for score updates.
- Multiple scoring tiers for different prey types (all prey currently worth 1).
