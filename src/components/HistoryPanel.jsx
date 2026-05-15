export default function HistoryPanel({ history, loading, clearHistory, refreshHistory }) {
  return (
    <div className="panel-card">
      {/* Header */}
      <div className="history-header">
        <span className="history-title">
          Calculation History
          {history.length > 0 && (
            <span className="history-badge">{history.length}</span>
          )}
        </span>
        <div style={{ display: "flex", gap: "8px" }}>
          {/* Refresh */}
          <button
            className="history-clear-btn"
            onClick={refreshHistory}
            disabled={loading}
            title="Refresh from database"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {loading ? "⏳" : "↻"} Refresh
          </button>
          {/* Clear */}
          <button
            className="history-clear-btn"
            onClick={clearHistory}
            disabled={loading || history.length === 0}
          >
            🗑 Clear All
          </button>
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div style={{ fontSize: "13px", color: "var(--color-text-secondary)", padding: "1rem", textAlign: "center" }}>
          Loading from database...
        </div>
      )}

      {/* Empty state */}
      {!loading && history.length === 0 && (
        <div style={{ fontSize: "13px", color: "var(--color-text-secondary)", padding: "2rem", textAlign: "center", opacity: .6 }}>
          No calculations yet. Start calculating! 🧮
        </div>
      )}

      {/* History list */}
      {!loading && history.map((h, i) => (
        <div
          key={i}
          className="history-entry"
          title="Click to copy"
          onClick={() => navigator.clipboard?.writeText(h)}
        >
          <span style={{ opacity: .4, fontSize: "10px", marginRight: "8px" }}>#{history.length - i}</span>
          {h}
        </div>
      ))}

      {/* Footer note */}
      {!loading && history.length > 0 && (
        <div style={{ fontSize: "11px", color: "var(--color-text-secondary)", marginTop: "10px", textAlign: "center", opacity: .5 }}>
          Saved in database · Click any entry to copy
        </div>
      )}
    </div>
  );
}
