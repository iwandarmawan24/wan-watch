# WAN-WATCH

Real-time monitoring dashboard for Surveillance (CCTV cameras) and Network (routers) operations, built with a NOC/Command Center design aesthetic.

## Features

- **Summary Cards** — 6 KPI cards: Routers Up, Cameras Active, Total Alerts, Avg Latency, Packet Loss, AI Cameras
- **11 Chart.js Charts** — Overview charts + detailed analytics per domain
- **Sortable Data Tables** — Network table with color-coded severity, Surveillance table with AI/alert badges
- **Real-time Simulation** — 3-second interval updates with visual flash animations
- **Tab Navigation** — Overview (charts only) / Network (charts + detail + table) / Surveillance (charts + detail + table)
- **Advanced Filtering** — Multi-select site filter, status filter, AI filter, and search
- **Custom Dropdown** — Themed multi-select dropdowns with checkboxes, SVG checkmarks, and glow effects
- **PulseDot Indicators** — Animated status dots with glow effects
- **Dark NOC Theme** — Glassmorphism top bar, neon accents, monospace data font
- **Fully Responsive** — Mobile-optimized layout with stacked grids and compact spacing

## Charts Breakdown

### Overview Tab (5 charts)
| Chart | Type | Description |
|-------|------|-------------|
| Device Status | Doughnut | Routers Up/Down + Cameras Active/Inactive |
| Avg Bandwidth / Site | Bar | Average bandwidth per site, color-coded |
| Latency / Site | Bar | Average latency per site, severity colored |
| Alerts by Site | Bar | Total alerts per site, severity colored |
| Camera Status / Site | Stacked Bar | Active vs Inactive cameras per site |

### Network Detail Tab (+3 charts)
| Chart | Type | Description |
|-------|------|-------------|
| Top 5 Highest Latency | Horizontal Bar | Routers with worst latency, severity colored |
| Packet Loss Distribution | Doughnut | Good (<2%) / Warning (2-4%) / Critical (>4%) |
| Router Status / Site | Stacked Bar | Up vs Down routers per site |

### Surveillance Detail Tab (+3 charts)
| Chart | Type | Description |
|-------|------|-------------|
| Alert Severity Distribution | Doughnut | Critical (>=4) / Warning (2-3) / Normal (0-1) |
| AI Coverage / Site | Stacked Bar | AI On vs AI Off cameras per site |
| Top 5 Most Alerts | Horizontal Bar | Cameras with highest alert count |

## Filtering System

| Filter | Type | Available On | Options |
|--------|------|-------------|---------|
| Site | Multi-select (checkbox) | Network, Surveillance | Site 1 – Site 5 (select multiple) |
| Status | Single select | Network | All Status / Up / Down |
| Status | Single select | Surveillance | All Status / Active / Inactive |
| AI | Single select | Surveillance | All AI / AI On / AI Off |
| Search | Text input | Network, Surveillance | Filter by device name |

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
│   ├── app.css                                  # Global styles + CSS custom properties
│   ├── routes/
│   │   ├── +layout.svelte                       # Root layout
│   │   └── +page.svelte                         # Dashboard (composition root, real-time interval)
│   └── lib/
│       ├── data/
│       │   ├── index.js                         # Barrel export
│       │   ├── network.js                       # 30 router objects
│       │   └── surveillance.js                  # 50 camera objects
│       ├── stores/
│       │   ├── index.js                         # Barrel export
│       │   └── dashboard.js                     # Writable + derived stores, handleSort()
│       ├── utils/
│       │   ├── constants.js                     # SITES, COLORS, CHART_DEFAULTS, etc.
│       │   └── helpers.js                       # computeStats, simulateNetworkJitter, etc.
│       └── components/
│           ├── common/
│           │   ├── PulseDot.svelte              # Animated status dot with glow
│           │   └── CustomSelect.svelte          # Themed dropdown (single + multi-select)
│           ├── layout/
│           │   ├── TopBar.svelte                # Sticky header with live badge + clock
│           │   ├── Controls.svelte              # Tab navigation (Overview/Network/Surveillance)
│           │   └── TableFilter.svelte           # Filter bar above tables (site, status, AI, search)
│           ├── cards/
│           │   ├── SummaryCard.svelte           # KPI card with accent border + glow
│           │   └── SummaryGrid.svelte           # 6-card responsive grid
│           ├── charts/
│           │   ├── ChartCanvas.svelte           # Reusable Chart.js wrapper
│           │   ├── NetworkCharts.svelte         # 3 overview network charts
│           │   ├── NetworkDetailCharts.svelte   # 3 detail network charts (Network tab only)
│           │   ├── SurveillanceCharts.svelte    # 2 overview surveillance charts
│           │   └── SurveillanceDetailCharts.svelte # 3 detail surveillance charts (Surveillance tab only)
│           └── tables/
│               ├── NetworkTable.svelte          # Sortable network device table
│               └── SurveillanceTable.svelte     # Camera table with AI/alert badges
```

## Architecture Decisions

### Component-Based Architecture
Each UI concern is isolated into its own Svelte component with scoped CSS. This prevents style leaks and makes each component independently testable and reusable.

### Svelte Stores for State Management
Using `writable` stores for mutable state (data, filters, sort) and `derived` stores for computed views (filtered/sorted data). This ensures reactive updates flow automatically when any dependency changes, without manual subscription management.

Key stores:
- `siteFilter` — Array of selected sites (multi-select, empty = all)
- `statusFilter` / `camStatusFilter` — Network/camera status filter
- `aiFilter` — AI enabled/disabled filter
- `filteredNetwork` / `filteredCams` — Derived stores combining all active filters

### Custom Select Component
Native `<select>` elements cannot be styled to match a dark NOC theme. `CustomSelect.svelte` provides:
- Single-select and multi-select modes via `multiple` prop
- Reactive checkbox state using `Set` for O(1) lookups
- SVG checkmarks for cross-browser rendering
- Click-outside dismissal, keyboard-friendly
- Themed with cyan glow, dark dropdown, and smooth animations

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

### Responsive Design
- 3-column chart grids → 1-column below 900px
- 2-column chart grids → 1-column below 768px
- Summary cards: 2-column grid on mobile (480px)
- Controls stack vertically on mobile (600px)
- Tables use horizontal scroll on overflow
- TopBar hides clock on mobile, reduces padding
- All component padding scales down on small screens

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
