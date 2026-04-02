<script>
  export let color = '#39ff14';
  export let size = 8;
</script>

<span
  class="pulse-dot"
  style="width:{size}px;height:{size}px;background:{color};box-shadow:0 0 {size}px {color}"
></span>

<style>
  .pulse-dot {
    display: inline-block;
    border-radius: 50%;
    animation: pulse 2s infinite ease-in-out;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }
</style>
