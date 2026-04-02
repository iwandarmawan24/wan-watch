<script>
  import { onMount, afterUpdate, onDestroy } from 'svelte';
  import { Chart, registerables } from 'chart.js';

  Chart.register(...registerables);

  export let type = 'bar';
  export let data = {};
  export let options = {};
  export let height = 260;

  let canvas;
  let chart;

  onMount(() => {
    const ctx = canvas.getContext('2d');
    chart = new Chart(ctx, {
      type,
      data: JSON.parse(JSON.stringify(data)),
      options
    });
  });

  afterUpdate(() => {
    if (chart) {
      chart.data = JSON.parse(JSON.stringify(data));
      chart.update('none');
    }
  });

  onDestroy(() => {
    if (chart) chart.destroy();
  });
</script>

<div class="chart-wrapper" style="height:{height}px">
  <canvas bind:this={canvas}></canvas>
</div>

<style>
  .chart-wrapper {
    position: relative;
    width: 100%;
  }
</style>
