import { useState, useEffect, useCallback } from "react";
import BasicPanel      from "./components/BasicPanel";
import ScientificPanel from "./components/ScientificPanel";
import ConverterPanel  from "./components/ConverterPanel";
import PercentPanel    from "./components/PercentPanel";
import HistoryPanel    from "./components/HistoryPanel";
import { fetchHistory, saveHistory, clearHistory } from "./api";

const TABS = [
  { id: "basic",   label: "Basic"      },
  { id: "sci",     label: "Scientific" },
  { id: "conv",    label: "Units"      },
  { id: "pct",     label: "%"          },
  { id: "history", label: "History"    },
];

export default function App() {
  const [activeTab,    setActiveTab]    = useState("basic");
  const [history,      setHistory]      = useState([]);
  const [histLoading,  setHistLoading]  = useState(false);
  const [serverOnline, setServerOnline] = useState(true);

  // Load history from DB on mount
  const loadHistory = useCallback(async () => {
    setHistLoading(true);
    try {
      const rows = await fetchHistory();
      setHistory(rows.map(r => r.entry));
      setServerOnline(true);
    } catch {
      setServerOnline(false);
    } finally {
      setHistLoading(false);
    }
  }, []);

  useEffect(() => { loadHistory(); }, [loadHistory]);

  // Save one entry to DB + refresh local state
  const addHistory = useCallback(async (entry) => {
    // Optimistic update
    setHistory(h => [entry, ...h].slice(0, 100));
    try {
      await saveHistory(entry);
    } catch {
      // If backend is down, still keep in local state
    }
  }, []);

  // Clear all entries from DB + local state
  const handleClear = useCallback(async () => {
    setHistory([]);
    try {
      await clearHistory();
    } catch {
      // Silent fail
    }
  }, []);

  return (
    <div>
      {/* App Header */}
      <div className="app-header">
        <div className="app-logo">
          <div className="app-logo-icon">🧮</div>
          <span>Ultimate Calc</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* Server status indicator */}
          <span title={serverOnline ? "Backend connected" : "Backend offline — history won't persist"}
            style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: serverOnline ? "#34d399" : "#f87171",
              boxShadow:  serverOnline ? "0 0 6px #34d399" : "none",
              display: "inline-block",
            }}
          />
          <span style={{ fontSize: "12px", color: "var(--color-text-secondary)", background: "var(--color-bg-secondary)", padding: "4px 10px", borderRadius: "99px", border: "1px solid var(--color-border)" }}>
            v2.0
          </span>
        </div>
      </div>

      {/* Tab Bar */}
      <div className="tab-bar">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`tab-btn${activeTab === t.id ? " active" : ""}`}
            onClick={() => {
              setActiveTab(t.id);
              if (t.id === "history") loadHistory();
            }}
          >
            {t.id === "history" && history.length > 0
              ? `History (${history.length})`
              : t.label}
          </button>
        ))}
      </div>

      {/* Active Panel */}
      {activeTab === "basic"   && <BasicPanel      addHistory={addHistory} />}
      {activeTab === "sci"     && <ScientificPanel addHistory={addHistory} />}
      {activeTab === "conv"    && <ConverterPanel />}
      {activeTab === "pct"     && <PercentPanel />}
      {activeTab === "history" && (
        <HistoryPanel
          history={history}
          loading={histLoading}
          clearHistory={handleClear}
          refreshHistory={loadHistory}
        />
      )}
    </div>
  );
}
