import { useState } from "react";
import Btn from "./Btn";
import Display from "./Display";
import { fmt, factorial, OP_SYM } from "../utils/helpers";

const FN_BUTTONS = [
  ["sin","sin"], ["cos","cos"], ["tan","tan"], ["asin","sin⁻¹"], ["acos","cos⁻¹"],
  ["atan","tan⁻¹"], ["log","log"], ["ln","ln"], ["sqrt","√"], ["cbrt","∛"],
  ["sq","x²"], ["cube","x³"], ["pow","xʸ"], ["inv","1/x"], ["fact","n!"],
  ["pi","π"], ["e","e"], ["abs","|x|"], ["deg","DEG"], ["exp","EXP"],
];

export default function ScientificPanel({ addHistory }) {
  const [cur, setCur]         = useState("0");
  const [prev, setPrev]       = useState(null);
  const [op, setOp]           = useState(null);
  const [resetNext, setReset] = useState(false);
  const [expr, setExpr]       = useState("");
  const [isDeg, setIsDeg]     = useState(true);

  const pushNum = (n) => { if (resetNext) { setCur(n); setReset(false); } else setCur(c => c === "0" ? n : c + n); };
  const dot     = () => setCur(c => { if (resetNext) { setReset(false); return "0."; } return c.includes(".") ? c : c + "."; });
  const clear   = () => { setCur("0"); setPrev(null); setOp(null); setReset(false); setExpr(""); };
  const bksp    = () => setCur(c => c.length > 1 ? c.slice(0, -1) : "0");
  const sign    = () => setCur(c => fmt(parseFloat(c) * -1));
  const toRad   = (d) => isDeg ? d * Math.PI / 180 : d;
  const toDeg   = (r) => isDeg ? r * 180 / Math.PI : r;

  const pressOp = (o) => {
    if (op && !resetNext) doCalc(true);
    setPrev(parseFloat(cur)); setOp(o); setReset(true);
    setExpr(cur + " " + (OP_SYM[o] || o));
  };

  const doCalc = (chain = false) => {
    if (!op || prev === null) return;
    const a = prev, b = parseFloat(cur);
    let res;
    if (op === "+") res = a + b;
    else if (op === "-") res = a - b;
    else if (op === "*") res = a * b;
    else if (op === "/") res = b === 0 ? NaN : a / b;
    else if (op === "^") res = Math.pow(a, b);
    const sym = OP_SYM[op] || op;
    if (!chain) { addHistory(`${a} ${sym} ${b} = ${fmt(res)}`); setExpr(`${a} ${sym} ${b} =`); }
    setCur(fmt(res)); setOp(null); setPrev(null); setReset(true);
  };

  const applyFn = (fn) => {
    const v = parseFloat(cur);
    const map = {
      sin:  [Math.sin(toRad(v)),   `sin(${cur})`],
      cos:  [Math.cos(toRad(v)),   `cos(${cur})`],
      tan:  [Math.tan(toRad(v)),   `tan(${cur})`],
      asin: [toDeg(Math.asin(v)),  `sin⁻¹(${cur})`],
      acos: [toDeg(Math.acos(v)),  `cos⁻¹(${cur})`],
      atan: [toDeg(Math.atan(v)),  `tan⁻¹(${cur})`],
      log:  [Math.log10(v),        `log(${cur})`],
      ln:   [Math.log(v),          `ln(${cur})`],
      sqrt: [Math.sqrt(v),         `√(${cur})`],
      cbrt: [Math.cbrt(v),         `∛(${cur})`],
      sq:   [v * v,                `(${cur})²`],
      cube: [v * v * v,            `(${cur})³`],
      inv:  [1 / v,                `1/(${cur})`],
      fact: [factorial(v),         `(${cur})!`],
      abs:  [Math.abs(v),          `|${cur}|`],
    };
    if (fn === "pi")  { setCur(fmt(Math.PI)); setReset(false); return; }
    if (fn === "e")   { setCur(fmt(Math.E));  setReset(false); return; }
    if (fn === "exp") { setCur(cur + "e");    setReset(false); return; }
    if (fn === "deg") { setIsDeg(d => !d); return; }
    if (fn === "pow") { pressOp("^"); return; }
    const [res, label] = map[fn];
    addHistory(`${label} = ${fmt(res)}`);
    setCur(fmt(res)); setReset(true); setExpr(`${label} =`);
  };

  return (
    <div className="panel-card">
      <Display expr={expr} result={cur} />

      {/* Scientific function buttons */}
      <div className="grid-5 gap-8">
        {FN_BUTTONS.map(([fn, label]) => (
          <Btn key={fn} label={fn === "deg" ? (isDeg ? "DEG" : "RAD") : label} variant="fn" onClick={() => applyFn(fn)} />
        ))}
      </div>

      {/* Standard number grid */}
      <div className="grid-4">
        <Btn label="AC"  variant="cl" onClick={clear} />
        <Btn label="⌫"   variant="op" onClick={bksp} />
        <Btn label="+/−" variant="op" onClick={sign} />
        <Btn label="÷"   variant="op" onClick={() => pressOp("/")} />
        {["7","8","9"].map(n => <Btn key={n} label={n} onClick={() => pushNum(n)} />)}
        <Btn label="×" variant="op" onClick={() => pressOp("*")} />
        {["4","5","6"].map(n => <Btn key={n} label={n} onClick={() => pushNum(n)} />)}
        <Btn label="−" variant="op" onClick={() => pressOp("-")} />
        {["1","2","3"].map(n => <Btn key={n} label={n} onClick={() => pushNum(n)} />)}
        <Btn label="+" variant="op" onClick={() => pressOp("+")} />
        <Btn label="0" span2 onClick={() => pushNum("0")} />
        <Btn label="." onClick={dot} />
        <Btn label="=" variant="eq" onClick={() => doCalc()} />
      </div>
    </div>
  );
}
