# WAN-WATCH

Real-time monitoring dashboard for Surveillance (CCTV cameras) and Network (routers) operations, built with a NOC/Command Center design aesthetic.

## Features

- **Summary Cards** — 6 KPI cards: Routers Up, Cameras Active, Total Alerts, Avg Latency, Packet Loss, AI Cameras
- **5 Chart.js Charts** — Device Status (doughnut), Bandwidth/Site (bar), Latency/Site (bar), Alerts/Site (bar), Camera Status/Site (stacked bar)
- **Sortable Data Tables** — Network table with color-coded severity, Surveillance table with AI/alert badges
- **Real-time Simulation** — 3-second interval updates with visual flash animations
- **Tab Navigation** — Overview / Network / Surveillance views
- **Site Filter & Search** — Filter by site, search by device name
- **PulseDot Indicators** — Animated status dots with glow effects
- **Dark NOC Theme** — Glassmorphism top bar, neon accents, monospace data font

## Tech Stack

| Category          | Technology                          |
|-------------------|-------------------------------------|
| Framework         | SvelteKit 2 (Svelte 4)              |
| Charts            | Chart.js 4                          |
| State Management  | Svelte Stores (writable + derived)  |
| Styling           | Scoped CSS + CSS Custom Properties  |
| Build Tool        | Vite 5                              |
| Deployment        | Vercel (adapter-vercel)             |

## Directory Structure

```
wan-watch/
├── package.json
├── svelte.config.js
├── vite.config.js
├── .gitignore
├── README.md
├── src/
│   ├── app.html
│   ├── app.css                              # Global styles + CSS custom properties
│   ├── routes/
│   │   ├── +layout.svelte                   # Root layout
│   │   └── +page.svelte                     # Dashboard (composition root, real-time interval)
│   └── lib/
│       ├── data/
│       │   ├── index.js                     # Barrel export
│       │   ├── network.js                   # 30 router objects
│       │   └── surveillance.js              # 50 camera objects
│       ├── stores/
│       │   ├── index.js                     # Barrel export
│       │   └── dashboard.js                 # Writable + derived stores, handleSort()
│       ├── utils/
│       │   ├── constants.js                 # SITES, COLORS, CHART_DEFAULTS, etc.
│       │   └── helpers.js                   # computeStats, simulateNetworkJitter, etc.
│       └── components/
│           ├── common/
│           │   └── PulseDot.svelte          # Animated status dot with glow
│           ├── layout/
│           │   ├── TopBar.svelte            # Sticky header with live badge + clock
│           │   └── Controls.svelte          # Tabs, site filter, search input
│           ├── cards/
│           │   ├── SummaryCard.svelte       # KPI card with accent border + glow
│           │   └── SummaryGrid.svelte       # 6-card responsive grid
│           ├── charts/
│           │   ├── ChartCanvas.svelte       # Reusable Chart.js wrapper
│           │   ├── NetworkCharts.svelte     # 3 network charts
│           │   └── SurveillanceCharts.svelte # 2 surveillance charts
│           └── tables/
│               ├── NetworkTable.svelte      # Sortable network device table
│               └── SurveillanceTable.svelte # Camera table with AI/alert badges
```

## Architecture Decisions

### Component-Based Architecture
Each UI concern is isolated into its own Svelte component with scoped CSS. This prevents style leaks and makes each component independently testable and reusable.

### Svelte Stores for State Management
Using `writable` stores for mutable state (data, filters, sort) and `derived` stores for computed views (filtered/sorted data). This ensures reactive updates flow automatically when any dependency changes, without manual subscription management.

### Chart.js Lifecycle
`ChartCanvas.svelte` handles the full Chart.js lifecycle:
- `onMount` — creates the chart instance
- `afterUpdate` — calls `chart.update('none')` to skip animation on real-time ticks
- `onDestroy` — destroys the chart to prevent memory leaks

Data is deep-copied via `JSON.parse(JSON.stringify())` before passing to Chart.js to avoid mutation issues.

### Performance Considerations
- Derived stores prevent unnecessary recomputation of filtered data
- Chart updates use `'none'` animation mode for real-time ticks
- `onDestroy` cleanup for all intervals and chart instances
- CSS animations via GPU-accelerated properties (opacity, transform)

## Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Extending to Real API

### REST API Example
```javascript
// Replace static data import with fetch
async function loadNetworkData() {
  const res = await fetch('/api/network/devices');
  return res.json();
}

// In +page.svelte or +page.js
export async function load({ fetch }) {
  const devices = await fetch('/api/network/devices').then(r => r.json());
  const cameras = await fetch('/api/surveillance/cameras').then(r => r.json());
  return { devices, cameras };
}
```

### WebSocket Example
```javascript
// Replace setInterval simulation with WebSocket
const ws = new WebSocket('wss://api.example.com/realtime');

ws.onmessage = (event) => {
  const update = JSON.parse(event.data);
  if (update.type === 'network') {
    networkData.update(devices =>
      devices.map(d => d.id === update.id ? { ...d, ...update.data } : d)
    );
  }
};
```

## Deploying to Vercel

This project uses `@sveltejs/adapter-vercel`. Simply connect your GitHub repository to Vercel and it will auto-detect the SvelteKit framework and deploy.

```bash
# Or deploy via CLI
npx vercel
```
