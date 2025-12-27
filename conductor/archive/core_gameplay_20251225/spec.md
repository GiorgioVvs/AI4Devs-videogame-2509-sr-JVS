# Track Spec: Core Gameplay Infrastructure and Movement

## Overview
This track focuses on setting up the foundational infrastructure for Worminator and implementing the core worm movement and growth mechanics.

## Requirements
- Basic HTML5/CSS/JS project structure inside `worminator-JVS/`.
- HTML5 Canvas setup for rendering.
- Worm movement logic:
    - Moves in a grid or continuous space.
    - "Jumping/Surfacing" mechanic (visual state change and gameplay trigger).
- Growth system:
    - Worm body segments that follow the head.
    - Consuming prey increases segment count.
- Simple Prey:
    - Spawns at random locations.
    - Triggers growth when "eaten" by the worm's head.

## Technical Details
- **Rendering:** 2D Canvas API.
- **State Management:** Simple JavaScript object to hold worm positions and prey state.
- **Testing:** Jest or similar for logic, potentially a simple HTML runner for visual verification.
