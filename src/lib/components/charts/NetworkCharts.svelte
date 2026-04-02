<script>
  import ChartCanvas from './ChartCanvas.svelte';
  import { networkData, camData } from '$lib/stores/index.js';
  import { computeStats, computeSiteData, getSeverityColor } from '$lib/utils/helpers.js';
  import { SITES, SITE_COLORS, COLORS, CHART_DEFAULTS, DOUGHNUT_DEFAULTS } from '$lib/utils/constants.js';

  $: stats = computeStats($networkData, $camData);
  $: siteData = computeSiteData($networkData, $camData);

  $: doughnutData = {
    labels: ['Routers Up', 'Routers Down', 'Cams Active', 'Cams Inactive'],
    datasets: [{
      data: [stats.netUp, stats.netDown, stats.camActive, stats.camInactive],
      backgroundColor: [COLORS.green, COLORS.red, COLORS.cyan, '#3d4f6a'],
      borderWidth: 0
    }]
  };

  $: bwData = {
    labels: SITES,
    datasets: [{
      label: 'Avg Bandwidth (Mbps)',
      data: SITES.map(s => siteData.bwBySite[s]),
      backgroundColor: SITE_COLORS,
      borderRadius: 4,
      barPercentage: 0.6
    }]
  };

  $: latencyData = {
    labels: SITES,
    datasets: [{
      label: 'Avg Latency (ms)',
      data: SITES.map(s => siteData.latencyBySite[s]),
      backgroundColor: SITES.map(s => getSeverityColor(siteData.latencyBySite[s], 30, 60)),
      borderRadius: 4,
      barPercentage: 0.6
    }]
  };

  const barOptions = {
    ...CHART_DEFAULTS,
    plugins: {
      ...CHART_DEFAULTS.plugins,
      legend: { display: false }
    }
  };
</script>

<div class="net-charts">
  <div class="chart-card">
    <h3>Device Status</h3>
    <ChartCanvas type="doughnut" data={doughnutData} options={DOUGHNUT_DEFAULTS} height={260} />
  </div>
  <div class="chart-card">
    <h3>Avg Bandwidth / Site</h3>
    <ChartCanvas type="bar" data={bwData} options={barOptions} height={260} />
  </div>
  <div class="chart-card">
    <h3>Latency / Site</h3>
    <ChartCanvas type="bar" data={latencyData} options={barOptions} height={260} />
  </div>
</div>

<style>
  .net-charts {
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
    .net-charts {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 480px) {
    .net-charts {
      padding: 0 12px;
      gap: 12px;
    }

    .chart-card {
      padding: 14px;
    }
  }
</style>
