<script>
  import { activeTab } from '$lib/stores/index.js';

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'network', label: 'Network' },
    { id: 'surveillance', label: 'Surveillance' }
  ];
</script>

<div class="controls">
  <div class="tabs">
    {#each tabs as tab}
      <button
        class="tab-btn"
        class:active={$activeTab === tab.id}
        on:click={() => activeTab.set(tab.id)}
      >
        {tab.label}
      </button>
    {/each}
  </div>
</div>

<style>
  .controls {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 24px;
  }

  .tabs {
    display: flex;
    gap: 4px;
    background: rgba(15, 21, 32, 0.6);
    padding: 4px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.06);
  }

  .tab-btn {
    font-family: var(--font-mono);
    font-size: 12px;
    font-weight: 500;
    padding: 8px 18px;
    border: none;
    border-radius: 6px;
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }

  .tab-btn:hover {
    color: var(--text-primary);
    background: rgba(255, 255, 255, 0.04);
  }

  .tab-btn.active {
    background: rgba(0, 229, 255, 0.12);
    color: var(--cyan);
    box-shadow: 0 0 12px rgba(0, 229, 255, 0.1);
  }

  @media (max-width: 600px) {
    .controls {
      padding: 12px;
    }

    .tab-btn {
      flex: 1;
      padding: 8px 8px;
      font-size: 11px;
      text-align: center;
    }
  }
</style>
