<script>
  import { onMount, onDestroy } from 'svelte';

  export let value;
  export let options = [];
  export let placeholder = 'Select...';
  export let multiple = false;

  let open = false;
  let wrapper;

  $: if (multiple && !Array.isArray(value)) {
    value = [];
  }

  // Reactive set for fast lookup that triggers on value change
  $: selectedSet = multiple ? new Set(value) : null;
  $: allSelected = multiple && selectedSet ? selectedSet.size === options.length : false;

  $: selectedLabel = multiple
    ? (value.length === 0 || value.length === options.length
      ? placeholder
      : value.length === 1
        ? options.find(o => o.value === value[0])?.label || value[0]
        : `${value.length} selected`)
    : (options.find(o => o.value === value)?.label || placeholder);

  function toggle() {
    open = !open;
  }

  function select(opt) {
    if (multiple) {
      if (selectedSet.has(opt.value)) {
        value = value.filter(v => v !== opt.value);
      } else {
        value = [...value, opt.value];
      }
    } else {
      value = opt.value;
      open = false;
    }
  }

  function selectAll() {
    if (allSelected) {
      value = [];
    } else {
      value = options.map(o => o.value);
    }
  }

  function handleClickOutside(e) {
    if (wrapper && !wrapper.contains(e.target)) {
      open = false;
    }
  }

  onMount(() => {
    document.addEventListener('click', handleClickOutside, true);
  });

  onDestroy(() => {
    document.removeEventListener('click', handleClickOutside, true);
  });
</script>

<div class="select-wrapper" bind:this={wrapper}>
  <button class="select-trigger" class:open on:click={toggle}>
    <span class="select-label">{selectedLabel}</span>
    <span class="select-arrow" class:open>&#9662;</span>
  </button>
  {#if open}
    <ul class="select-dropdown">
      {#if multiple}
        <li>
          <button
            class="select-option select-all"
            class:active={allSelected}
            on:click={selectAll}
          >
            <span class="checkbox" class:checked={allSelected}>
              {#if allSelected}<svg viewBox="0 0 12 12" class="check-icon"><path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>{/if}
            </span>
            All
          </button>
        </li>
        <li class="divider"></li>
      {/if}
      {#each options as opt (opt.value)}
        {@const checked = multiple ? selectedSet.has(opt.value) : value === opt.value}
        <li>
          <button
            class="select-option"
            class:active={checked}
            on:click={() => select(opt)}
          >
            {#if multiple}
              <span class="checkbox" class:checked>
                {#if checked}<svg viewBox="0 0 12 12" class="check-icon"><path d="M2 6l3 3 5-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>{/if}
              </span>
            {/if}
            {#if opt.dot}
              <span class="opt-dot" style="background:{opt.dot}"></span>
            {/if}
            {opt.label}
          </button>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .select-wrapper {
    position: relative;
    min-width: 140px;
  }

  .select-trigger {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    width: 100%;
    font-family: var(--font-mono);
    font-size: 12px;
    padding: 8px 14px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(15, 21, 32, 0.6);
    color: var(--text-primary);
    cursor: pointer;
    transition: all 0.2s;
    text-align: left;
  }

  .select-trigger:hover {
    border-color: rgba(255, 255, 255, 0.15);
    background: rgba(15, 21, 32, 0.8);
  }

  .select-trigger.open {
    border-color: rgba(0, 229, 255, 0.3);
    box-shadow: 0 0 8px rgba(0, 229, 255, 0.08);
  }

  .select-arrow {
    font-size: 10px;
    color: var(--text-muted);
    transition: transform 0.2s;
  }

  .select-arrow.open {
    transform: rotate(180deg);
  }

  .select-dropdown {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    z-index: 200;
    list-style: none;
    margin: 0;
    padding: 4px;
    background: #111827;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    box-shadow:
      0 8px 24px rgba(0, 0, 0, 0.5),
      0 0 12px rgba(0, 229, 255, 0.05);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    max-height: 220px;
    overflow-y: auto;
    animation: dropIn 0.15s ease-out;
  }

  @keyframes dropIn {
    from {
      opacity: 0;
      transform: translateY(-6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .select-option {
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    font-family: var(--font-mono);
    font-size: 12px;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all 0.15s;
    text-align: left;
  }

  .select-option:hover {
    background: rgba(0, 229, 255, 0.08);
    color: var(--text-primary);
  }

  .select-option.active {
    background: rgba(0, 229, 255, 0.12);
    color: var(--cyan);
  }

  .select-all {
    font-weight: 600;
  }

  .divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.06);
    margin: 4px 8px;
  }

  .checkbox {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border-radius: 3px;
    border: 1.5px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.03);
    flex-shrink: 0;
    transition: all 0.15s;
  }

  .checkbox.checked {
    background: var(--cyan);
    border-color: var(--cyan);
    color: #0a0e17;
    box-shadow: 0 0 6px rgba(0, 229, 255, 0.4);
  }

  .check-icon {
    width: 10px;
    height: 10px;
  }

  .opt-dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  @media (max-width: 600px) {
    .select-wrapper {
      min-width: unset;
      width: 100%;
    }
  }
</style>
