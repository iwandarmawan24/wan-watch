import { writable, derived } from 'svelte/store';
import { networkDevices } from '$lib/data/network.js';
import { cameras } from '$lib/data/surveillance.js';

export const networkData = writable([...networkDevices]);
export const camData = writable([...cameras]);
export const activeTab = writable('overview');
export const siteFilter = writable('All Sites');
export const searchQuery = writable('');
export const sortColumn = writable(null);
export const sortDirection = writable('asc');
export const rtPulse = writable(false);

export const filteredNetwork = derived(
  [networkData, siteFilter, searchQuery, sortColumn, sortDirection],
  ([$networkData, $siteFilter, $searchQuery, $sortColumn, $sortDirection]) => {
    let result = $networkData;

    if ($siteFilter !== 'All Sites') {
      result = result.filter(d => d.site === $siteFilter);
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
  [camData, siteFilter, searchQuery],
  ([$camData, $siteFilter, $searchQuery]) => {
    let result = $camData;

    if ($siteFilter !== 'All Sites') {
      result = result.filter(c => c.location === $siteFilter);
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
