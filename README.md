# Estate operations console

A building management console: floor plans with live device status, alert
handling, and plant telemetry across a two-building estate.

**Live: https://estate-ops.netlify.app**

Built with **Angular, standalone components and signals** — no NgModules, no
`zone.js` patterns, no RxJS where a computed signal does the job.

Two fictional buildings and invented telemetry. Nothing is connected to real plant.

![Console](docs/console.png)

## Why a floor plan

The characteristic object of a building operations console is the plan, and a
list cannot replace it. "FCU 1.4 is 6.4°C above setpoint" tells an engineer
there is a problem; the plan tells them it is the north-east meeting room, next
to the one that was fine yesterday, on the same riser as the unit that failed
last month.

So rooms are drawn from each floor's own geometry and devices are plotted by
position, coloured by status. A fault is **located**, not merely listed.

## What it does

- **Estate tree** — two buildings, four floors, with live occupancy per floor
- **Plan** — rooms and device pins, status-coloured, selectable
- **Status filter** — narrow the plan and schedule to fault, warning, offline
- **Device schedule** — sortable table with deviation from setpoint, coloured by
  how far out it is rather than by an arbitrary threshold
- **Alerts** — per floor, unacknowledged first, acknowledgeable in place
- **Demand** — 24-hour estate electrical demand

## Angular specifics worth noting

- `input.required()`, `output()`, `computed()` and `signal()` throughout — no
  `@Input`/`@Output` decorators
- New control flow (`@if`, `@for`, `@empty`) rather than structural directives
- Standalone components with explicit `imports`; no `NgModule` anywhere
- No charting library. One series over 24 points is a `<polyline>`, and a chart
  library would be larger than the whole application

Production bundle is **142 kB raw, 42 kB transferred**.

## Running it

```bash
npm install
npm start
```

## Notes

Built as a portfolio demonstration by [Ashish Aggarwal](https://ashishaggarwal168.com).
