import { COLORS, SITES } from './constants.js';

export function computeStats(networkData, camData) {
  const netUp = networkData.filter(d => d.status === 'up').length;
  const netDown = networkData.filter(d => d.status === 'down').length;
  const camActive = camData.filter(c => c.status === 'active').length;
  const camInactive = camData.filter(c => c.status === 'inactive').length;
  const totalAlerts = camData.reduce((sum, c) => sum + c.alerts, 0);
  const avgLatency = networkData.length
    ? (networkData.reduce((sum, d) => sum + d.latency, 0) / networkData.length).toFixed(1)
    : 0;
  const avgPktLoss = networkData.length
    ? (networkData.reduce((sum, d) => sum + d.packetLoss, 0) / networkData.length).toFixed(2)
    : 0;
  const aiCams = camData.filter(c => c.aiEnabled).length;

  return { netUp, netDown, camActive, camInactive, totalAlerts, avgLatency, avgPktLoss, aiCams };
}

export function computeSiteData(networkData, camData) {
  const bwBySite = {};
  const latencyBySite = {};
  const alertsBySite = {};
  const camStatusBySite = {};

  SITES.forEach(site => {
    const siteRouters = networkData.filter(d => d.site === site);
    bwBySite[site] = siteRouters.length
      ? Math.round(siteRouters.reduce((s, d) => s + d.bandwidth, 0) / siteRouters.length)
      : 0;
    latencyBySite[site] = siteRouters.length
      ? Math.round(siteRouters.reduce((s, d) => s + d.latency, 0) / siteRouters.length)
      : 0;

    const siteCams = camData.filter(c => c.location === site);
    alertsBySite[site] = siteCams.reduce((s, c) => s + c.alerts, 0);
    camStatusBySite[site] = {
      active: siteCams.filter(c => c.status === 'active').length,
      inactive: siteCams.filter(c => c.status === 'inactive').length
    };
  });

  return { bwBySite, latencyBySite, alertsBySite, camStatusBySite };
}

export function simulateNetworkJitter(device) {
  const now = new Date();
  const ts = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

  return {
    ...device,
    latency: Math.max(1, Math.min(100, device.latency + (Math.random() * 10 - 5))),
    bandwidth: Math.max(10, Math.min(1000, device.bandwidth + (Math.random() * 40 - 20))),
    packetLoss: Math.max(0, Math.min(5, +(device.packetLoss + (Math.random() * 0.4 - 0.2)).toFixed(2))),
    lastUpdate: ts
  };
}

export function simulateCameraAlerts(camera) {
  const now = new Date();
  const ts = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
  let alerts = camera.alerts;
  const rand = Math.random();
  if (rand < 0.15) alerts = Math.min(5, alerts + 1);
  else if (rand < 0.25) alerts = Math.max(0, alerts - 1);

  return { ...camera, alerts, lastUpdate: ts };
}

export function getSeverityColor(value, lowThreshold, highThreshold) {
  if (value >= highThreshold) return COLORS.red;
  if (value >= lowThreshold) return COLORS.amber;
  return COLORS.green;
}
