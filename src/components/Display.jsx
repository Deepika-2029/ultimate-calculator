// Calculator display — shows expression (top) and current value (bottom)
export default function Display({ expr, result }) {
  return (
    <div className="display">
      <div className="display-expr">{expr || "\u00a0"}</div>
      <div className="display-result">{result}</div>
    </div>
  );
}
