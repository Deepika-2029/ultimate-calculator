import { useState, useEffect } from "react";
import CONV_DATA from "../data/convData";
import { convertTemp } from "../utils/helpers";

const CATEGORIES = Object.keys(CONV_DATA);

export default function ConverterPanel() {
  const [cat, setCat]       = useState("length");
  const [fromUnit, setFrom] = useState("m");
  const [toUnit, setTo]     = useState("km");
  const [val, setVal]       = useState("1");

  const units = CONV_DATA[cat].units;

  useEffect(() => {
    setFrom(CONV_DATA[cat].units[0]);
    setTo(CONV_DATA[cat].units[1]);
  }, [cat]);

  const convert = () => {
    const v = parseFloat(val);
    if (isNaN(v)) return "—";
    const d = CONV_DATA[cat];
    if (d.special) return parseFloat(convertTemp(v, fromUnit, toUnit).toFixed(8));
    const base = v * d.toBase[fromUnit];
    return parseFloat((base / d.toBase[toUnit]).toFixed(8));
  };

  return (
    <div className="panel-card">
      <div className="conv-row">
        <span className="conv-label">Category</span>
        <select value={cat} onChange={e => setCat(e.target.value)} style={{ flex: 1 }}>
          {CATEGORIES.map(c => (
            <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
          ))}
        </select>
      </div>

      <div className="conv-row">
        <span className="conv-label">From</span>
        <input
          type="number"
          value={val}
          onChange={e => setVal(e.target.value)}
          style={{ maxWidth: "110px" }}
        />
        <select value={fromUnit} onChange={e => setFrom(e.target.value)} style={{ flex: 1 }}>
          {units.map(u => <option key={u}>{u}</option>)}
        </select>
      </div>

      <div className="conv-row">
        <span className="conv-label">To</span>
        <select value={toUnit} onChange={e => setTo(e.target.value)} style={{ flex: 1 }}>
          {units.map(u => <option key={u}>{u}</option>)}
        </select>
      </div>

      <div className="conv-result">
        {convert()} <span style={{ fontSize: "18px", opacity: .7 }}>{toUnit}</span>
      </div>
    </div>
  );
}
