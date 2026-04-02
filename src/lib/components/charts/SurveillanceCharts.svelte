<script>
  import ChartCanvas from './ChartCanvas.svelte';
  import { networkData, camData } from '$lib/stores/index.js';
  import { computeSiteData, getSeverityColor } from '$lib/utils/helpers.js';
  import { SITES, CHART_DEFAULTS, COLORS } from '$lib/utils/constants.js';

  $: siteData = computeSiteData($networkData, $camData);

  $: alertsData = {
    labels: SITES,
    datasets: [{
      label: 'Alerts',
      data: SITES.map(s => siteData.alertsBySite[s]),
      backgroundColor: SITES.map(s => getSeverityColor(siteData.alertsBySite[s], 10, 20)),
      borderRadius: 4,
      barPercentage: 0.6
    }]
  };

  $: camStatusData = {
    labels: SITES,
    datasets: [
      {
        label: 'Active',
        data: SITES.map(s => siteData.camStatusBySite[s].active),
        backgroundColor: COLORS.green,
        borderRadius: 4,
        barPercentage: 0.6
      },
      {
        label: 'Inactive',
        data: SITES.map(s => siteData.camStatusBySite[s].inactive),
        backgroundColor: COLORS.red,
        borderRadius: 4,
        barPercentage: 0.6
      }
    ]
  };

  const barOptions = {
    ...CHART_DEFAULTS,
    plugins: {
      ...CHART_DEFAULTS.plugins,
      legend: { display: false }
    }
  };

  const stackedOptions = {
    ...CHART_DEFAULTS,
    scales: {
      ...CHART_DEFAULTS.scales,
      x: { ...CHART_DEFAULTS.scales.x, stacked: true },
      y: { ...CHART_DEFAULTS.scales.y, stacked: true }
    }
  };
</script>

<div class="surv-charts">
  <div class="chart-card">
    <h3>Alerts by Site</h3>
    <ChartCanvas type="bar" data={alertsData} options={barOptions} height={260} />
  </div>
  <div class="chart-card">
    <h3>Camera Status / Site</h3>
    <ChartCanvas type="bar" data={camStatusData} options={stackedOptions} height={260} />
  </div>
</div>

<style>
  .surv-charts {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
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

  @media (max-width: 768px) {
    .surv-charts {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 480px) {
    .surv-charts {
      padding: 0 12px;
      gap: 12px;
    }

    .chart-card {
      padding: 14px;
    }
  }
</style>
