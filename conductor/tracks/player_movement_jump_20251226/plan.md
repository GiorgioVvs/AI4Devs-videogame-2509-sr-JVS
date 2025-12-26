# Track Plan: Player Input, Zoned Movement, and Jumping

## Phase 1: Input Handling and Horizontal Movement [checkpoint: db666f1]
- [x] Task: Write Tests: Input mapping and horizontal movement logic [2e86f1a]
- [x] Task: Implement Feature: `InputHandler` class for arrow key tracking [2e86f1a]
- [x] Task: Implement Feature: Ground-based horizontal movement with Earth zone boundaries [2e86f1a]
- [x] Task: Conductor - User Manual Verification 'Input Handling and Horizontal Movement' (Protocol in workflow.md) [db666f1]

## Phase 2: Jumping Physics and Zoned Layout [checkpoint: c4577df]
- [x] Task: Write Tests: Jump arc, gravity, and vertical velocity logic [10aff15]
- [x] Task: Implement Feature: Gravity and vertical movement (Jump) [10aff15]
- [x] Task: Implement Feature: Reduced horizontal speed (Air Drift) during jump [10aff15]
- [x] Task: Implement Feature: Define visual/logical thresholds for Earth, Surface, and Air zones [10aff15]
- [x] Task: Fix: Enable vertical movement (digging) within Earth zone [48b8998]
- [x] Task: Conductor - User Manual Verification 'Jumping Physics and Zoned Layout' (Protocol in workflow.md) [c4577df]

## Phase 3: Zoned Gameplay Logic
- [ ] Task: Write Tests: Zoned prey spawning and consumption logic
- [x] Task: Implement Feature: Restrict prey spawning to the Surface zone [33e13dd]
- [ ] Task: Implement Feature: Restrict prey consumption to the Surface zone
- [ ] Task: Conductor - User Manual Verification 'Zoned Gameplay Logic' (Protocol in workflow.md)
