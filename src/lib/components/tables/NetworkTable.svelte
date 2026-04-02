<script>
  import PulseDot from '../common/PulseDot.svelte';
  import { filteredNetwork, sortColumn, sortDirection, handleSort, rtPulse } from '$lib/stores/index.js';
  import { getSeverityColor } from '$lib/utils/helpers.js';
  import { COLORS } from '$lib/utils/constants.js';

  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'site', label: 'Site' },
    { key: 'status', label: 'Status' },
    { key: 'bandwidth', label: 'Bandwidth' },
    { key: 'latency', label: 'Latency' },
    { key: 'packetLoss', label: 'Pkt Loss' },
    { key: 'lastUpdate', label: 'Updated' }
  ];

  function sortIndicator(col) {
    if ($sortColumn !== col) return '';
    return $sortDirection === 'asc' ? ' ▲' : ' ▼';
  }
</script>

<div class="table-wrap">
  <table>
    <thead>
      <tr>
        {#each columns as col}
          <th on:click={() => handleSort(col.key)}>
            {col.label}{sortIndicator(col.key)}
          </th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each $filteredNetwork as device (device.id)}
        <tr class:rt-flash={$rtPulse}>
          <td class="name">{device.name}</td>
          <td>{device.site}</td>
          <td>
            <span class="status-badge" class:up={device.status === 'up'} class:down={device.status === 'down'}>
              <PulseDot color={device.status === 'up' ? COLORS.green : COLORS.red} size={6} />
              {device.status.toUpperCase()}
            </span>
          </td>
          <td style="color:{getSeverityColor(device.bandwidth, 200, 500)}">{Math.round(device.bandwidth)} Mbps</td>
          <td style="color:{getSeverityColor(device.latency, 30, 60)}">{Math.round(device.latency)} ms</td>
          <td style="color:{getSeverityColor(device.packetLoss, 2, 4)}">{device.packetLoss.toFixed(2)}%</td>
          <td class="muted">{device.lastUpdate}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .table-wrap {
    padding: 0 24px;
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    font-family: var(--font-mono);
    font-size: 12px;
  }

  thead {
    position: sticky;
    top: 0;
  }

  th {
    text-align: left;
    padding: 12px 14px;
    color: var(--text-secondary);
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    background: var(--bg-secondary);
    border-bottom: 1px solid var(--border-color);
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    transition: color 0.2s;
  }

  th:hover {
    color: var(--cyan);
  }

  td {
    padding: 10px 14px;
    border-bottom: 1px solid var(--border-color);
    white-space: nowrap;
    color: var(--text-primary);
  }

  .name {
    font-weight: 600;
  }

  .muted {
    color: var(--text-muted);
    font-size: 11px;
  }

  tr {
    transition: background 0.2s;
  }

  tr:hover {
    background: rgba(255, 255, 255, 0.02);
  }

  .status-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  .status-badge.up {
    background: rgba(57, 255, 20, 0.1);
    color: var(--green);
  }

  .status-badge.down {
    background: rgba(255, 61, 61, 0.1);
    color: var(--red);
  }

  @media (max-width: 480px) {
    .table-wrap {
      padding: 0 12px;
    }

    table {
      font-size: 11px;
    }

    th, td {
      padding: 8px 8px;
    }
  }
</style>
