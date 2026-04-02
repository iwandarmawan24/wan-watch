import { writable, derived } from 'svelte/store';
import { networkDevices } from '$lib/data/network.js';
import { cameras } from '$lib/data/surveillance.js';

export const networkData = writable([...networkDevices]);
export const camData = writable([...cameras]);
export const activeTab = writable('overview');
export const siteFilter = writable([]);
export const searchQuery = writable('');
export const sortColumn = writable(null);
export const sortDirection = writable('asc');
export const statusFilter = writable('all');
export const camStatusFilter = writable('all');
export const aiFilter = writable('all');
export const rtPulse = writable(false);

export const filteredNetwork = derived(
  [networkData, siteFilter, searchQuery, statusFilter, sortColumn, sortDirection],
  ([$networkData, $siteFilter, $searchQuery, $statusFilter, $sortColumn, $sortDirection]) => {
    let result = $networkData;

    if ($siteFilter.length > 0) {
      result = result.filter(d => $siteFilter.includes(d.site));
    }

    if ($statusFilter !== 'all') {
      result = result.filter(d => d.status === $statusFilter);
    }

    if ($searchQuery) {
      const q = $searchQuery.toLowerCase();
      result = result.filter(d => d.name.toLowerCase().includes(q));
    }

    if ($sortColumn) {
      result = [...result].sort((a, b) => {
        let valA = a[$sortColumn];
        let valB = b[$sortColumn];
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();
        if (valA < valB) return $sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return $sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }
);

export const filteredCams = derived(
  [camData, siteFilter, searchQuery, camStatusFilter, aiFilter],
  ([$camData, $siteFilter, $searchQuery, $camStatusFilter, $aiFilter]) => {
    let result = $camData;

    if ($siteFilter.length > 0) {
      result = result.filter(c => $siteFilter.includes(c.location));
    }

    if ($camStatusFilter !== 'all') {
      result = result.filter(c => c.status === $camStatusFilter);
    }

    if ($aiFilter !== 'all') {
      result = result.filter(c => $aiFilter === 'enabled' ? c.aiEnabled : !c.aiEnabled);
    }

    if ($searchQuery) {
      const q = $searchQuery.toLowerCase();
      result = result.filter(c => c.name.toLowerCase().includes(q));
    }

    return result;
  }
);

export function handleSort(column) {
  sortColumn.update(current => {
    if (current === column) {
      sortDirection.update(d => d === 'asc' ? 'desc' : 'asc');
    } else {
      sortDirection.set('asc');
    }
    return column;
  });
}
