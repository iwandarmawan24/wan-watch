<script>
  import PulseDot from '../common/PulseDot.svelte';
  import { filteredCams, rtPulse } from '$lib/stores/index.js';
  import { COLORS } from '$lib/utils/constants.js';

  function alertColor(alerts) {
    if (alerts >= 4) return COLORS.red;
    if (alerts >= 2) return COLORS.amber;
    return '#3d4f6a';
  }
</script>

<div class="table-wrap">
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Location</th>
        <th>Status</th>
        <th>AI</th>
        <th>Alerts</th>
        <th>Updated</th>
      </tr>
    </thead>
    <tbody>
      {#each $filteredCams as cam (cam.id)}
        <tr class:rt-flash={$rtPulse}>
          <td class="name">{cam.name}</td>
          <td>{cam.location}</td>
          <td>
            <span class="status-badge" class:active={cam.status === 'active'} class:inactive={cam.status === 'inactive'}>
              <PulseDot color={cam.status === 'active' ? COLORS.cyan : '#3d4f6a'} size={6} />
              {cam.status.toUpperCase()}
            </span>
          </td>
          <td>
            {#if cam.aiEnabled}
              <span class="ai-badge">AI ON</span>
            {:else}
              <span class="muted">&mdash;</span>
            {/if}
          </td>
          <td>
            <span class="alert-badge" style="color:{alertColor(cam.alerts)};border-color:{alertColor(cam.alerts)}40">
              {cam.alerts}
            </span>
          </td>
          <td class="muted">{cam.lastUpdate}</td>
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
    white-space: nowrap;
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

  .status-badge.active {
    background: rgba(0, 229, 255, 0.1);
    color: var(--cyan);
  }

  .status-badge.inactive {
    background: rgba(61, 79, 106, 0.2);
    color: var(--text-muted);
  }

  .ai-badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 600;
    background: rgba(179, 136, 255, 0.12);
    color: var(--purple);
    letter-spacing: 0.5px;
  }

  .alert-badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 20px;
    font-size: 10px;
    font-weight: 700;
    border: 1px solid;
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
