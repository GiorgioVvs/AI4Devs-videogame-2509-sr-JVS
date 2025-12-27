# Track Plan: Fix Score Display Visibility

## Phase 1: Investigation and UI Layering Fix [checkpoint: c90d7ea]
- [x] Task: Write Tests: Verify `score-display` style and layering (check z-index or DOM order) [4140101]
- [x] Task: Implement Feature: Move `#score-display` after canvas in `index.html` and add `z-index: 10` in `styles.css` [4140101]
- [x] Task: Conductor - User Manual Verification 'UI Layering Fix' (Protocol in workflow.md) [c90d7ea]

## Phase 2: Logic Double-Check [skipped]
- [-] Task: Write Tests: Ensure `Game` instance correctly binds to the DOM element in a browser-like environment
- [-] Task: Fix: Ensure `scoreElement` is always updated even if the element is added dynamically (robustness)
- [-] Task: Conductor - User Manual Verification 'Logic Double-Check' (Protocol in workflow.md)
