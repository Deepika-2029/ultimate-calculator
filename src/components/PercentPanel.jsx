import { useState } from "react";

const PctCard = ({ title, children, result }) => (
  <div className="pct-card">
    <div className="pct-card-title">{title}</div>
    {children}
    <div className="pct-result">{result}</div>
  </div>
);

const Row = ({ children }) => (
  <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "8px" }}>{children}</div>
);

const Lbl = ({ children }) => (
  <span style={{ fontSize: "13px", color: "var(--color-text-secondary)", minWidth: "50px" }}>{children}</span>
);

const Inp = ({ value, onChange }) => (
  <input type="number" value={value} onChange={e => onChange(+e.target.value)} style={{ flex: 1, maxWidth: "120px" }} />
);

export default function PercentPanel() {
  // Card 1: X% of Y
  const [p1x, setP1x] = useState(20);
  const [p1y, setP1y] = useState(500);

  // Card 2: What % is X of Y
  const [p2x, setP2x] = useState(75);
  const [p2y, setP2y] = useState(200);

  // Card 3: % change from A to B
  const [p3a, setP3a] = useState(80);
  const [p3b, setP3b] = useState(100);

  // Card 4: Tip calculator
  const [bill,   setBill]   = useState(1000);
  const [tipPct, setTipPct] = useState(10);
  const [ppl,    setPpl]    = useState(2);

  const pct1 = parseFloat((p1x / 100 * p1y).toFixed(6));
  const pct2 = parseFloat((p2x / p2y * 100).toFixed(4));
  const pct3 = parseFloat(((p3b - p3a) / Math.abs(p3a) * 100).toFixed(2));
  const tip   = bill * tipPct / 100;
  const total = bill + tip;

  return (
    <div>
      <PctCard title="Percentage of: X% of Y" result={isNaN(pct1) ? "—" : pct1}>
        <Row>
          <Lbl>X =</Lbl><Inp value={p1x} onChange={setP1x} />
          <Lbl>% of</Lbl><Inp value={p1y} onChange={setP1y} />
        </Row>
      </PctCard>

      <PctCard title="What % is X of Y?" result={isNaN(pct2) ? "—" : pct2 + "%"}>
        <Row>
          <Lbl>X =</Lbl><Inp value={p2x} onChange={setP2x} />
          <Lbl>of</Lbl><Inp value={p2y} onChange={setP2y} />
        </Row>
      </PctCard>

      <PctCard title="% change from A to B" result={isNaN(pct3) ? "—" : (pct3 >= 0 ? "+" : "") + pct3 + "%"}>
        <Row><Lbl>From</Lbl><Inp value={p3a} onChange={setP3a} /></Row>
        <Row><Lbl>To</Lbl><Inp value={p3b} onChange={setP3b} /></Row>
      </PctCard>

      <PctCard
        title="Tip Calculator"
        result={`Tip: ${tip.toFixed(2)} | Total: ${total.toFixed(2)} | Per person: ${(total / Math.max(1, ppl)).toFixed(2)}`}
      >
        <Row>
          <Lbl>Bill</Lbl><Inp value={bill} onChange={setBill} />
          <Lbl>Tip %</Lbl><Inp value={tipPct} onChange={setTipPct} />
        </Row>
        <Row><Lbl>People</Lbl><Inp value={ppl} onChange={setPpl} /></Row>
      </PctCard>
    </div>
  );
}
