// Reusable calculator button — variant: "default"|"op"|"fn"|"eq"|"cl"|"mem"
export default function Btn({ label, onClick, variant = "default", span2 = false, small = false }) {
  const cls = [
    "calc-btn",
    `calc-btn-${variant}`,
    small  ? "calc-btn-sm"    : "",
    span2  ? "calc-btn-span2" : "",
  ].filter(Boolean).join(" ");

  return (
    <button className={cls} onClick={onClick}>
      {label}
    </button>
  );
}
