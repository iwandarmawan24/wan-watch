<script>
  import SummaryCard from './SummaryCard.svelte';
  import { networkData, camData } from '$lib/stores/index.js';
  import { computeStats } from '$lib/utils/helpers.js';
  import { COLORS } from '$lib/utils/constants.js';

  $: stats = computeStats($networkData, $camData);
</script>

<div class="summary-grid">
  <SummaryCard label="Routers Up" value={stats.netUp} sub="{stats.netDown} down" accent={COLORS.green} />
  <SummaryCard label="Cameras Active" value={stats.camActive} sub="{stats.camInactive} offline" accent={COLORS.cyan} />
  <SummaryCard label="Total Alerts" value={stats.totalAlerts} sub="across all sites" accent={COLORS.red} />
  <SummaryCard label="Avg Latency" value="{stats.avgLatency} ms" sub="network-wide" accent={COLORS.amber} />
  <SummaryCard label="Packet Loss" value="{stats.avgPktLoss}%" sub="average" accent={COLORS.purple} />
  <SummaryCard label="AI Cameras" value={stats.aiCams} sub="of {$camData.length} total" accent={COLORS.cyan} />
</div>

<style>
  .summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 16px;
    padding: 0 24px;
  }

  @media (max-width: 480px) {
    .summary-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      padding: 0 12px;
    }
  }
</style>
