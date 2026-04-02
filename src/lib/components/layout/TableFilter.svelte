<script>
  import { siteFilter, searchQuery, statusFilter, camStatusFilter, aiFilter } from '$lib/stores/index.js';
  import { SITE_NAMES } from '$lib/utils/constants.js';

  export let showStatus = false;
  export let showCamStatus = false;
  export let showAi = false;
</script>

<div class="table-filter">
  <select class="filter-select" bind:value={$siteFilter}>
    {#each SITE_NAMES as site}
      <option value={site}>{site}</option>
    {/each}
  </select>
  {#if showStatus}
    <select class="filter-select" bind:value={$statusFilter}>
      <option value="all">All Status</option>
      <option value="up">Up</option>
      <option value="down">Down</option>
    </select>
  {/if}
  {#if showCamStatus}
    <select class="filter-select" bind:value={$camStatusFilter}>
      <option value="all">All Status</option>
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
  {/if}
  {#if showAi}
    <select class="filter-select" bind:value={$aiFilter}>
      <option value="all">All AI</option>
      <option value="enabled">AI On</option>
      <option value="disabled">AI Off</option>
    </select>
  {/if}
  <input
    class="search-input"
    type="text"
    placeholder="Search devices..."
    bind:value={$searchQuery}
  />
</div>

<style>
  .table-filter {
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 0 24px;
  }

  .filter-select,
  .search-input {
    font-family: var(--font-mono);
    font-size: 12px;
    padding: 8px 14px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(15, 21, 32, 0.6);
    color: var(--text-primary);
    outline: none;
    transition: border-color 0.2s;
  }

  .filter-select:focus,
  .search-input:focus {
    border-color: rgba(0, 229, 255, 0.3);
  }

  .search-input {
    width: 180px;
  }

  .search-input::placeholder {
    color: var(--text-muted);
  }

  select option {
    background: #0f1520;
    color: var(--text-primary);
  }

  @media (max-width: 600px) {
    .table-filter {
      padding: 0 12px;
      flex-direction: column;
    }

    .filter-select,
    .search-input {
      width: 100%;
    }
  }
</style>
