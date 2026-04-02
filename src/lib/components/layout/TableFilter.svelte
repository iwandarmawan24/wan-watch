<script>
  import CustomSelect from '../common/CustomSelect.svelte';
  import { siteFilter, searchQuery, statusFilter, camStatusFilter, aiFilter } from '$lib/stores/index.js';
  import { SITES } from '$lib/utils/constants.js';

  export let showStatus = false;
  export let showCamStatus = false;
  export let showAi = false;

  const siteOptions = SITES.map(s => ({ value: s, label: s }));

  const networkStatusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'up', label: 'Up', dot: '#39ff14' },
    { value: 'down', label: 'Down', dot: '#ff3d3d' }
  ];

  const camStatusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active', dot: '#00e5ff' },
    { value: 'inactive', label: 'Inactive', dot: '#3d4f6a' }
  ];

  const aiOptions = [
    { value: 'all', label: 'All AI' },
    { value: 'enabled', label: 'AI On', dot: '#b388ff' },
    { value: 'disabled', label: 'AI Off', dot: '#3d4f6a' }
  ];
</script>

<div class="table-filter">
  <CustomSelect bind:value={$siteFilter} options={siteOptions} placeholder="All Sites" multiple={true} />
  {#if showStatus}
    <CustomSelect bind:value={$statusFilter} options={networkStatusOptions} placeholder="All Status" />
  {/if}
  {#if showCamStatus}
    <CustomSelect bind:value={$camStatusFilter} options={camStatusOptions} placeholder="All Status" />
  {/if}
  {#if showAi}
    <CustomSelect bind:value={$aiFilter} options={aiOptions} placeholder="All AI" />
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
    width: 180px;
  }

  .search-input:focus {
    border-color: rgba(0, 229, 255, 0.3);
    box-shadow: 0 0 8px rgba(0, 229, 255, 0.08);
  }

  .search-input::placeholder {
    color: var(--text-muted);
  }

  @media (max-width: 600px) {
    .table-filter {
      padding: 0 12px;
      flex-direction: column;
    }

    .search-input {
      width: 100%;
    }
  }
</style>
