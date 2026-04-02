<script>
  export let label = '';
  export let value = '';
  export let sub = '';
  export let accent = '#00e5ff';
</script>

<div class="card" style="border-top-color: {accent}">
  <div class="card-glow" style="background: radial-gradient(circle at top, {accent}10 0%, transparent 70%)"></div>
  <span class="label">{label}</span>
  <span class="value" style="color: {accent}">{value}</span>
  <span class="sub">{sub}</span>
</div>

<style>
  .card {
    position: relative;
    background: var(--bg-card);
    border: 1px solid var(--border-color);
    border-top: 3px solid;
    border-radius: var(--radius);
    padding: 20px 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    overflow: hidden;
    transition: all 0.25s;
    animation: slideUp 0.4s ease-out;
  }

  .card:hover {
    background: var(--bg-card-hover);
    border-color: var(--border-color-hover);
    transform: translateY(-2px);
  }

  .card-glow {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    pointer-events: none;
  }

  .label {
    font-family: var(--font-mono);
    font-size: 10px;
    font-weight: 500;
    color: var(--text-secondary);
    text-transform: uppercase;
    letter-spacing: 1.5px;
  }

  .value {
    font-family: var(--font-mono);
    font-size: 28px;
    font-weight: 700;
    line-height: 1.1;
  }

  .sub {
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-muted);
    margin-top: 2px;
  }

  @media (max-width: 480px) {
    .card {
      padding: 14px 12px;
    }

    .value {
      font-size: 22px;
    }
  }
</style>
