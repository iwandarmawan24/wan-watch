<script>
  import ChartCanvas from './ChartCanvas.svelte';
  import { networkData } from '$lib/stores/index.js';
  import { SITES, COLORS, CHART_DEFAULTS, DOUGHNUT_DEFAULTS } from '$lib/utils/constants.js';

  // Top 5 Highest Latency
  $: top5Latency = [...$networkData]
    .sort((a, b) => b.latency - a.latency)
    .slice(0, 5);

  $: top5LatencyData = {
    labels: top5Latency.map(d => d.name),
    datasets: [{
      label: 'Latency (ms)',
      data: top5Latency.map(d => Math.round(d.latency)),
      backgroundColor: top5Latency.map(d => {
        if (d.latency >= 60) return COLORS.red;
        if (d.latency >= 30) return COLORS.amber;
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

  // Packet Loss Distribution
  $: pktGood = $networkData.filter(d => d.packetLoss < 2).length;
  $: pktWarn = $networkData.filter(d => d.packetLoss >= 2 && d.packetLoss < 4).length;
  $: pktCrit = $networkData.filter(d => d.packetLoss >= 4).length;

  $: pktLossData = {
    labels: ['Good (<2%)', 'Warning (2-4%)', 'Critical (>4%)'],
    datasets: [{
      data: [pktGood, pktWarn, pktCrit],
      backgroundColor: [COLORS.green, COLORS.amber, COLORS.red],
      borderWidth: 0
    }]
  };

  // Status per Site (stacked)
  $: statusPerSiteData = {
    labels: SITES,
    datasets: [
      {
        label: 'Up',
        data: SITES.map(s => $networkData.filter(d => d.site === s && d.status === 'up').length),
        backgroundColor: COLORS.green,
        borderRadius: 4,
        barPercentage: 0.6
      },
      {
        label: 'Down',
        data: SITES.map(s => $networkData.filter(d => d.site === s && d.status === 'down').length),
        backgroundColor: COLORS.red,
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
</script>

<div class="detail-charts">
  <div class="chart-card">
    <h3>Top 5 Highest Latency</h3>
    <ChartCanvas type="bar" data={top5LatencyData} options={horizontalBarOptions} height={240} />
  </div>
  <div class="chart-card">
    <h3>Packet Loss Distribution</h3>
    <ChartCanvas type="doughnut" data={pktLossData} options={DOUGHNUT_DEFAULTS} height={240} />
  </div>
  <div class="chart-card">
    <h3>Router Status / Site</h3>
    <ChartCanvas type="bar" data={statusPerSiteData} options={stackedOptions} height={240} />
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
