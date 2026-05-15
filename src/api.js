// Frontend Storage Helper — uses LocalStorage instead of a backend

const STORAGE_KEY = "ultimate_calc_history";

// Helper to read from LocalStorage
const readStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// Fetch all history entries
export async function fetchHistory() {
  // Simulate network delay for realistic UI feedback
  await new Promise(r => setTimeout(r, 300));
  return readStorage();
}

// Save one entry to LocalStorage
export async function saveHistory(entry) {
  const current = readStorage();
  const newEntry = {
    id: Date.now(),
    entry,
    created_at: new Date().toISOString()
  };
  
  // Keep only the latest 100 entries
  const updated = [newEntry, ...current].slice(0, 100);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newEntry.id;
}

// Delete all entries from LocalStorage
export async function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
}
