<script>
  import PulseDot from '../common/PulseDot.svelte';
  import { rtPulse } from '$lib/stores/index.js';
  import { onDestroy } from 'svelte';

  let now = new Date();
  const timer = setInterval(() => { now = new Date(); }, 1000);
  onDestroy(() => clearInterval(timer));

  $: timeStr = now.toLocaleTimeString('en-GB', { hour12: false });
  $: dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  $: liveColor = $rtPulse ? '#00e5ff' : '#39ff14';
</script>

<header class="topbar">
  <div class="brand">
    <span class="logo">&#9678;</span>
    <span class="brand-name">WAN-WATCH</span>
  </div>
  <div class="right">
    <div class="live-badge">
      <PulseDot color={liveColor} size={8} />
      <span>LIVE</span>
    </div>
    <div class="clock">
      <span class="time">{timeStr}</span>
      <span class="date">{dateStr}</span>
    </div>
  </div>
</header>

<style>
  .topbar {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    height: 56px;
    background: rgba(10, 14, 23, 0.75);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  }

  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .logo {
    font-size: 22px;
    color: var(--cyan);
    filter: drop-shadow(0 0 6px var(--cyan));
  }

  .brand-name {
    font-family: var(--font-mono);
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 3px;
    color: var(--text-primary);
  }

  .right {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .live-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: var(--font-mono);
    font-size: 11px;
    font-weight: 600;
    color: var(--green);
    letter-spacing: 2px;
    background: rgba(57, 255, 20, 0.08);
    padding: 4px 12px;
    border-radius: 20px;
    border: 1px solid rgba(57, 255, 20, 0.2);
  }

  .clock {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-family: var(--font-mono);
  }

  .time {
    font-size: 14px;
    font-weight: 600;
    color: var(--text-primary);
    letter-spacing: 1px;
  }

  .date {
    font-size: 10px;
    color: var(--text-secondary);
  }

  @media (max-width: 480px) {
    .topbar {
      padding: 0 12px;
      height: 48px;
    }

    .brand-name {
      font-size: 13px;
      letter-spacing: 2px;
    }

    .logo {
      font-size: 18px;
    }

    .right {
      gap: 10px;
    }

    .live-badge {
      font-size: 9px;
      padding: 3px 8px;
    }

    .clock {
      display: none;
    }
  }
</style>
