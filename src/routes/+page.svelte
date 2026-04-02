<script>
  import { onDestroy } from 'svelte';
  import TopBar from '$lib/components/layout/TopBar.svelte';
  import Controls from '$lib/components/layout/Controls.svelte';
  import TableFilter from '$lib/components/layout/TableFilter.svelte';
  import SummaryGrid from '$lib/components/cards/SummaryGrid.svelte';
  import NetworkCharts from '$lib/components/charts/NetworkCharts.svelte';
  import SurveillanceCharts from '$lib/components/charts/SurveillanceCharts.svelte';
  import NetworkTable from '$lib/components/tables/NetworkTable.svelte';
  import SurveillanceTable from '$lib/components/tables/SurveillanceTable.svelte';
  import { networkData, camData, activeTab, rtPulse } from '$lib/stores/index.js';
  import { simulateNetworkJitter, simulateCameraAlerts } from '$lib/utils/helpers.js';
  import { RT_INTERVAL } from '$lib/utils/constants.js';

  const rtTimer = setInterval(() => {
    networkData.update(devices => devices.map(simulateNetworkJitter));
    camData.update(cams => cams.map(simulateCameraAlerts));

    rtPulse.set(true);
    setTimeout(() => rtPulse.set(false), 300);
  }, RT_INTERVAL);

  onDestroy(() => clearInterval(rtTimer));

  $: showNetworkCharts = $activeTab === 'overview' || $activeTab === 'network';
  $: showSurveillanceCharts = $activeTab === 'overview' || $activeTab === 'surveillance';
  $: showNetworkTable = $activeTab === 'network';
  $: showSurveillanceTable = $activeTab === 'surveillance';
</script>

<svelte:head>
  <title>WAN-WATCH | Monitoring Dashboard</title>
</svelte:head>

<div class="dashboard">
  <TopBar />
  <Controls />

  <main>
    <SummaryGrid />

    {#if showNetworkCharts}
      <section class="section">
        <h2 class="section-title">Network Monitoring</h2>
        <NetworkCharts />
        {#if showNetworkTable}
          <div class="spacer"></div>
          <TableFilter />
          <NetworkTable />
        {/if}
      </section>
    {/if}

    {#if showSurveillanceCharts}
      <section class="section">
        <h2 class="section-title">Surveillance Monitoring</h2>
        <SurveillanceCharts />
        {#if showSurveillanceTable}
          <div class="spacer"></div>
          <TableFilter />
          <SurveillanceTable />
        {/if}
      </section>
    {/if}
  </main>
</div>

<style>
  .dashboard {
    min-height: 100vh;
  }

  main {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding-bottom: 48px;
  }

  .section {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .section-title {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 600;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 2px;
    padding: 8px 24px 0;
  }

  .spacer {
    height: 4px;
  }

  @media (max-width: 480px) {
    main {
      gap: 16px;
      padding-bottom: 32px;
    }

    .section-title {
      padding: 4px 12px 0;
      font-size: 11px;
    }
  }
</style>
