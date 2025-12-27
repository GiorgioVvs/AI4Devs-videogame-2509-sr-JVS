# Track Spec: Player Input, Zoned Movement, and Jumping

## Overview
This track implements player-controlled movement using arrow keys and a physics-based jumping mechanic. It also introduces a "Zoned" screen layout (Earth, Surface, Air) that restricts where the worm can move and where it can consume prey.

## Functional Requirements
- **Arrow Key Controls:**
    - `Left/Right`: Move the worm horizontally.
    - `Up`: Trigger a jump.
- **Three-Zone Layout:**
    - **Earth (Bottom 1/3):** The worm's base movement zone. It cannot move below the bottom boundary of the screen.
    - **Surface (Middle 1/3):** The zone where prey spawns and can be consumed.
    - **Air (Top 1/3):** The peak of the worm's jump arc.
- **Jump Physics:**
    - Implement a parabolic jump arc (upward velocity affected by gravity).
    - Horizontal movement is allowed during the jump but at a **reduced speed** compared to ground movement.
- **Consumption Constraints:**
    - Prey can ONLY be consumed if the worm's head is within the "Surface" zone.
- **Collision Boundaries:**
    - The worm is restricted from moving below the bottom of the "Earth" zone.

## Technical Details
- **Input Handling:** Add an `InputHandler` or update `Game` class to listen for `keydown`/`keyup` events.
- **Physics Engine:** Implement a simple gravity constant and vertical velocity for the worm.
- **Zone Logic:** Define Y-coordinate thresholds for Earth, Surface, and Air based on canvas height.

## Acceptance Criteria
- [ ] Pressing Left/Right moves the worm horizontally within the Earth zone.
- [ ] Pressing Up triggers a smooth jump arc.
- [ ] Horizontal speed is noticeably slower while the worm is in the air.
- [ ] The worm cannot move below the bottom edge of the screen.
- [ ] Prey spawns only in the Surface zone.
- [ ] The worm only grows/eats prey when its head is in the Surface zone.
