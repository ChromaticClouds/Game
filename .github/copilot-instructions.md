<!--
Guidance for AI coding agents working on this repository.
Keep instructions short, concrete and specific to this codebase.
-->

# Copilot instructions — 2D-Game (ChromaticClouds/Game)

This repository is a small browser-based TypeScript game. The goal of these notes is to give an assistant just enough, actionable context to be immediately productive.

## Big picture
- Entry: `src/main.ts` — bootstraps the game and composes 4 main systems: `Player`, `FloorManager`, `ObstacleManager`, and `ScoreManager`.
- Core domains:
  - Rendering & loop: `src/main.ts`, uses `requestAnimationFrame` and draws to a single `<canvas>`.
  - Player logic: `src/classes/plyayer.ts` (note the file name spelling) and `src/data/player.ts` for tunable values + image frames.
  - Obstacles: `src/classes/obstable.ts` (name spelled `obstable`) and `src/data/obstacles.ts` (config list).
  - Floor: `src/classes/floor-maganger.ts` (file name uses "maganger") and `src/classes/floor-tile.ts`.
  - Utilities: collision and helpers in `src/utils/index.ts`.

## File layout & data flow
- Source: `src/` (rootDir in `tsconfig.json`). Compile output goes to `dist/` (outDir).
- Static assets: `assets/` (images and sounds). `docs/main.html` references the built bundle at `../dist/main.js` and static assets via `../assets/...` — serving root should be the repository `Game/` folder.
- Imports in TS source use ES module style with `.js` file extensions (e.g. `import { Player } from "./classes/plyayer.js"`). Keep this convention; TypeScript is configured to emit ES modules and preserve those paths.

## Conventions and gotchas (do not change without updating uses)
- Keep import paths with .js extension in source files (the project expects ES modules in the browser). Example: `import { Obstacle } from "./classes/obstable.js"`.
- Several filenames contain misspellings (intentional or historical):
  - `src/classes/plyayer.ts` exports `Player` (filename: plyayer).
  - `src/classes/obstable.ts` exports `Obstacle` (filename: obstable).
  - `src/classes/floor-maganger.ts` exports `FloorManager` (filename: floor-maganger).
  Don't rename files silently — update all imports if you must rename.
- Asset paths are relative and resolved at runtime from `docs/main.html`. When changing asset locations, update both `docs/main.html` and code that constructs `Image().src` (see `src/data/player.ts` and `src/data/obstacles.ts`).

## Build / run / debug (PowerShell examples)
- Quick build (requires TypeScript installed globally or will fetch with npx):
  - npx tsc -p .\tsconfig.json
  - Output: `dist/main.js` + source maps and declarations.
- Serve locally (so module imports and assets load correctly). From the repository root (`Game\`):
  - npx http-server . -p 3000
  - Open: http://localhost:3000/docs/main.html
  Alternatively use VS Code Live Server extension: open `docs/main.html` and "Open with Live Server".

## Common edit patterns & hotspots
- To change player physics/animation: edit `src/data/player.ts` (jumpPower, gravity, frameInterval, animation frames).
- To change obstacle types or spawn behavior: edit `src/data/obstacles.ts` and `src/classes/obstacle-manager.ts` (minSpawn/maxSpawn, spawn timing).
- To modify floor visuals/scale: edit `src/classes/floor-maganger.ts` (see the `size = 6` multiplier and `desiredHeight` constructor arg).

## Runtime patterns & APIs to reuse
- Collision: `src/utils/index.ts` provides `checkCollision(player, obstacle)` and `getRandomObstacleConfig(...)` — prefer using these helpers.
- Sound: HTMLAudioElement is created directly in classes (e.g. `new Audio('../assets/sound/jump.wav')`). Keep relative paths consistent with `docs/main.html` serving root.

## Safety: changes that often break runtime
- Changing import path styles (dropping the `.js` extension) will break browser module loading unless you update the build/deploy setup.
- Moving `docs/main.html` or changing how `dist` is referenced requires updating script src (`../dist/main.js`) and asset paths.

If anything above is unclear or you'd like instructions augmented (for tests, dev tooling, or adding Node-based build scripts), tell me which section to expand and I'll iterate.
