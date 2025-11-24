const KEY = 'tg_pro_data';

export function loadData() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw
      ? JSON.parse(raw)
      : {
          entries: [],
          settings: {
            name: 'User',
            theme: '#a855f7',
            hours: [0, 8.75, 8.75, 8.75, 8.75, 4.5, 0],
            break: { thresh: 6, min: 30 },
          },
        };
  } catch (e) {
    console.error('loadData error', e);
    return {
      entries: [],
      settings: {
        name: 'User',
        theme: '#a855f7',
        hours: [0, 8.75, 8.75, 8.75, 8.75, 4.5, 0],
        break: { thresh: 6, min: 30 },
      },
    };
  }
}

export function saveData(data) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function exportData() {
  const raw = localStorage.getItem(KEY) || JSON.stringify({ entries: [], settings: {} });
  return raw;
}

export function importData(json) {
  try {
    const obj = typeof json === 'string' ? JSON.parse(json) : json;
    if (!obj.entries) throw new Error('Invalid import format');
    saveData(obj);
    return obj;
  } catch (e) {
    throw e;
  }
}

export function addEntry(entry) {
  const data = loadData();
  data.entries = [entry, ...data.entries].sort((a, b) => new Date(b.date) - new Date(a.date));
  saveData(data);
  return data;
}

export function updateEntry(entry) {
  const data = loadData();
  const idx = data.entries.findIndex((e) => e.id === entry.id);
  if (idx === -1) throw new Error('Entry not found');
  data.entries[idx] = entry;
  saveData(data);
  return data;
}

export function deleteEntry(id) {
  const data = loadData();
  const removed = data.entries.find((e) => e.id === id);
  data.entries = data.entries.filter((e) => e.id !== id);
  saveData(data);
  return { data, removed };
}
