export const SITES = ['Site 1', 'Site 2', 'Site 3', 'Site 4', 'Site 5'];

export const SITE_NAMES = ['All Sites', ...SITES];

export const COLORS = {
  cyan: '#00e5ff',
  green: '#39ff14',
  red: '#ff3d3d',
  amber: '#ffab00',
  purple: '#b388ff'
};

export const SITE_COLORS = [
  '#00e5ff',
  '#39ff14',
  '#ffab00',
  '#b388ff',
  '#ff3d3d'
];

export const RT_INTERVAL = 3000;

export const CHART_DEFAULTS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#6b7b95',
        font: { family: "'JetBrains Mono', monospace", size: 10 }
      }
    }
  },
  scales: {
    x: {
      ticks: { color: '#6b7b95', font: { family: "'JetBrains Mono', monospace", size: 10 } },
      grid: { color: 'rgba(255,255,255,0.04)' }
    },
    y: {
      ticks: { color: '#6b7b95', font: { family: "'JetBrains Mono', monospace", size: 10 } },
      grid: { color: 'rgba(255,255,255,0.04)' }
    }
  }
};

export const DOUGHNUT_DEFAULTS = {
  responsive: true,
  maintainAspectRatio: false,
  cutout: '65%',
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#6b7b95',
        font: { family: "'JetBrains Mono', monospace", size: 10 },
        padding: 12
      }
    }
  }
};
