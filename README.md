# Carbon 2050 SG — Playable React Prototype

Desktop/projector-first playable prototype using the calibrated v5 engine.

## Run
```bash
npm install
npm run dev
```

## Production build
```bash
npm run build
npm run preview
```

## Engine tests
```bash
npm run test:engine
```

## Game flow
2026 briefing → Round 1 choose exactly 3 → 2030 reveal → Round 2 spend ≤10 TP → 2040 readiness reveal → Round 3 choose exactly 2 → 2050 result/debrief.

The game uses an educational Singapore consumption-footprint model. It is not Singapore's official territorial GHG inventory.

## Visual v2
This rebuild integrates the generated Carbon 2050 SG visual direction into the playable UI:
- Singapore visual hero and 2050 journey
- illustrated/graphic card headers for all 23 actions
- visual scene banners for each round and reveal
- stronger readiness, sector and final-result storytelling
- responsive desktop/tablet/mobile layouts

The generated visual board is included in `src/assets/carbon2050-visual-board.png`.
