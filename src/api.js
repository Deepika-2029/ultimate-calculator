// Frontend API helper — wraps all /api calls

const BASE = "/api";  // Vite proxy handles the routing to port 3001

// Fetch all history entries from DB
export async function fetchHistory() {
  const res  = await fetch(`${BASE}/history`);
  const data = await res.json();
  if (!data.ok) throw new Error(data.error);
  return data.history;   // [{ id, entry, created_at }, ...]
}

// Save one entry to DB
export async function saveHistory(entry) {
  const res  = await fetch(`${BASE}/history`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify({ entry }),
  });
  const data = await res.json();
  if (!data.ok) throw new Error(data.error);
  return data.id;
}

// Delete all entries from DB
export async function clearHistory() {
  const res  = await fetch(`${BASE}/history`, { method: "DELETE" });
  const data = await res.json();
  if (!data.ok) throw new Error(data.error);
}
