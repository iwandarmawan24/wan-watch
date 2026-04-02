<script>
  import ChartCanvas from './ChartCanvas.svelte';
  import { camData } from '$lib/stores/index.js';
  import { SITES, COLORS, CHART_DEFAULTS, DOUGHNUT_DEFAULTS } from '$lib/utils/constants.js';

  // Alert Severity Distribution
  $: alertCrit = $camData.filter(c => c.alerts >= 4).length;
  $: alertWarn = $camData.filter(c => c.alerts >= 2 && c.alerts < 4).length;
  $: alertNorm = $camData.filter(c => c.alerts < 2).length;

  $: severityData = {
    labels: ['Critical (>=4)', 'Warning (2-3)', 'Normal (0-1)'],
    datasets: [{
      data: [alertCrit, alertWarn, alertNorm],
      backgroundColor: [COLORS.red, COLORS.amber, COLORS.green],
      borderWidth: 0
    }]
  };

  // AI Coverage per Site
  $: aiCoverageData = {
    labels: SITES,
    datasets: [
      {
        label: 'AI On',
        data: SITES.map(s => $camData.filter(c => c.location === s && c.aiEnabled).length),
        backgroundColor: COLORS.purple,
        borderRadius: 4,
        barPercentage: 0.6
      },
      {
        label: 'AI Off',
        data: SITES.map(s => $camData.filter(c => c.location === s && !c.aiEnabled).length),
        backgroundColor: '#3d4f6a',
        borderRadius: 4,
        barPercentage: 0.6
      }
    ]
  };

  const stackedOptions = {
    ...CHART_DEFAULTS,
    scales: {
      ...CHART_DEFAULTS.scales,
      x: { ...CHART_DEFAULTS.scales.x, stacked: true },
      y: { ...CHART_DEFAULTS.scales.y, stacked: true }
    }
  };

  // Top 5 Most Alerts
  $: top5Alerts = [...$camData]
    .sort((a, b) => b.alerts - a.alerts)
    .slice(0, 5);

  $: top5AlertsData = {
    labels: top5Alerts.map(c => c.name),
    datasets: [{
      label: 'Alerts',
      data: top5Alerts.map(c => c.alerts),
      backgroundColor: top5Alerts.map(c => {
        if (c.alerts >= 4) return COLORS.red;
        if (c.alerts >= 2) return COLORS.amber;
        return COLORS.green;
      }),
      borderRadius: 4,
      barPercentage: 0.6
    }]
  };

  const horizontalBarOptions = {
    ...CHART_DEFAULTS,
    indexAxis: 'y',
    plugins: {
      ...CHART_DEFAULTS.plugins,
      legend: { display: false }
    },
    scales: {
      x: {
        ticks: { color: '#6b7b95', font: { family: "'JetBrains Mono', monospace", size: 10 } },
        grid: { color: 'rgba(255,255,255,0.04)' }
      },
      y: {
        ticks: { color: '#6b7b95', font: { family: "'JetBrains Mono', monospace", size: 10 } },
        grid: { display: false }
      }
    }
  };
</script>

<div class="detail-charts">
  <div class="chart-card">
    <h3>Alert Severity Distribution</h3>
    <ChartCanvas type="doughnut" data={severityData} options={DOUGHNUT_DEFAULTS} height={240} />
  </div>
  <div class="chart-card">
    <h3>AI Coverage / Site</h3>
    <ChartCanvas type="bar" data={aiCoverageData} options={stackedOptions} height={240} />
  </div>
  <div class="chart-card">
    <h3>Top 5 Most Alerts</h3>
    <ChartCanvas type="bar" data={top5AlertsData} options={horizontalBarOptions} height={240} />
  </div>
</div>

<style>
  .detail-charts {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    padding: 0 24px;
  }

  .chart-card {
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-radius: var(--radius);
    padding: 20px;
    animation: slideUp 0.4s ease-out;
  }

  h3 {
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 16px;
  }

  @media (max-width: 900px) {
    .detail-charts {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 480px) {
    .detail-charts {
      padding: 0 12px;
      gap: 12px;
    }

    .chart-card {
      padding: 14px;
    }
  }
</style>
