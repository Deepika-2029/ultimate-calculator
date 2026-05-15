// Format a number cleanly — removes float noise like 0.30000000000000004
export const fmt = (n) => {
  if (isNaN(n) || !isFinite(n)) return "Error";
  return String(+parseFloat(n.toFixed(10)));
};

// n! — iterative, supports up to 170
export const factorial = (n) => {
  n = Math.round(n);
  if (n < 0 || n > 170) return NaN;
  if (n <= 1) return 1;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
};

// Temperature conversion (special-cased because it's not multiplicative)
export const convertTemp = (val, from, to) => {
  if (from === to) return val;
  let celsius;
  if (from === "°C")      celsius = val;
  else if (from === "°F") celsius = (val - 32) * 5 / 9;
  else                    celsius = val - 273.15; // Kelvin
  if (to === "°C")      return celsius;
  if (to === "°F")      return celsius * 9 / 5 + 32;
  return celsius + 273.15; // Kelvin
};

// Operator symbol display map
export const OP_SYM = { "+": "+", "-": "−", "*": "×", "/": "÷", "^": "ˣ" };
