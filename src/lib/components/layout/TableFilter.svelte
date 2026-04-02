<script>
  import { siteFilter, searchQuery } from '$lib/stores/index.js';
  import { SITE_NAMES } from '$lib/utils/constants.js';
</script>

<div class="table-filter">
  <select class="site-select" bind:value={$siteFilter}>
    {#each SITE_NAMES as site}
      <option value={site}>{site}</option>
    {/each}
  </select>
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

  .site-select,
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

  .site-select:focus,
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

    .site-select,
    .search-input {
      width: 100%;
    }
  }
</style>
