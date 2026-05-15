import { useState, useEffect, useCallback } from "react";
import Btn from "./Btn";
import Display from "./Display";
import { fmt, OP_SYM } from "../utils/helpers";

export default function BasicPanel({ addHistory }) {
  const [cur, setCur]             = useState("0");
  const [prev, setPrev]           = useState(null);
  const [op, setOp]               = useState(null);
  const [resetNext, setReset]     = useState(false);
  const [expr, setExpr]           = useState("");
  const [mem, setMem]             = useState(0);
  const [memActive, setMemActive] = useState(false);

  const pushNum = (n) => {
    if (resetNext) { setCur(n); setReset(false); }
    else setCur(c => c === "0" ? n : c + n);
  };

  const dot   = () => setCur(c => { if (resetNext) { setReset(false); return "0."; } return c.includes(".") ? c : c + "."; });
  const clear = () => { setCur("0"); setPrev(null); setOp(null); setReset(false); setExpr(""); };
  const bksp  = () => setCur(c => c.length > 1 ? c.slice(0, -1) : "0");
  const sign  = () => setCur(c => fmt(parseFloat(c) * -1));

  const pressOp = (o) => {
    if (op && !resetNext) doCalc(true);
    setPrev(parseFloat(cur));
    setOp(o);
    setReset(true);
    setExpr(cur + " " + (OP_SYM[o] || o));
  };

  const doCalc = useCallback((chain = false) => {
    if (!op || prev === null) return;
    const a = prev, b = parseFloat(cur);
    let res;
    if (op === "+") res = a + b;
    else if (op === "-") res = a - b;
    else if (op === "*") res = a * b;
    else if (op === "/") res = b === 0 ? NaN : a / b;
    const sym = OP_SYM[op] || op;
    if (!chain) { addHistory(`${a} ${sym} ${b} = ${fmt(res)}`); setExpr(`${a} ${sym} ${b} =`); }
    setCur(fmt(res));
    setOp(null); setPrev(null); setReset(true);
  }, [op, prev, cur, addHistory]);

  // Keyboard support
  useEffect(() => {
    const handler = (e) => {
      if ("0123456789".includes(e.key)) pushNum(e.key);
      else if (e.key === ".")           dot();
      else if (e.key === "+")           pressOp("+");
      else if (e.key === "-")           pressOp("-");
      else if (e.key === "*")           pressOp("*");
      else if (e.key === "/")           { e.preventDefault(); pressOp("/"); }
      else if (e.key === "Enter" || e.key === "=") doCalc();
      else if (e.key === "Escape")      clear();
      else if (e.key === "Backspace")   bksp();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  return (
    <div className="panel-card">
      {memActive && <div className="mem-indicator">M</div>}

      <Display expr={expr} result={cur} />

      {/* Memory row */}
      <div className="grid-5 gap-8">
        <Btn label="MC" variant="mem" small onClick={() => { setMem(0); setMemActive(false); }} />
        <Btn label="MR" variant="mem" small onClick={() => { setCur(fmt(mem)); setReset(false); }} />
        <Btn label="M+" variant="mem" small onClick={() => { setMem(m => m + parseFloat(cur)); setMemActive(true); }} />
        <Btn label="M−" variant="mem" small onClick={() => { setMem(m => m - parseFloat(cur)); setMemActive(true); }} />
        <Btn label="MS" variant="mem" small onClick={() => { setMem(parseFloat(cur)); setMemActive(true); }} />
      </div>
      <div style={{ height: "8px" }} />

      {/* Number + operator grid */}
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
