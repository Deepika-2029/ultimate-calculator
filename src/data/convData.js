const CONV_DATA = {
  length:   { units: ["m","km","cm","mm","mi","yd","ft","in","nm"],       toBase: { m:1, km:1000, cm:.01, mm:.001, mi:1609.34, yd:.9144, ft:.3048, in:.0254, nm:1e-9 } },
  weight:   { units: ["kg","g","mg","lb","oz","t","st"],                  toBase: { kg:1, g:.001, mg:1e-6, lb:.453592, oz:.0283495, t:1000, st:6.35029 } },
  temp:     { units: ["°C","°F","K"], special: true },
  area:     { units: ["m²","km²","cm²","ha","acre","ft²","in²"],          toBase: { "m²":1, "km²":1e6, "cm²":1e-4, ha:1e4, acre:4046.86, "ft²":.0929, "in²":.000645 } },
  volume:   { units: ["L","mL","m³","cm³","gal","qt","pt","fl oz","cup"], toBase: { L:1, mL:.001, "m³":1000, "cm³":.001, gal:3.78541, qt:.946353, pt:.473176, "fl oz":.0295735, cup:.236588 } },
  speed:    { units: ["m/s","km/h","mph","knot","ft/s"],                  toBase: { "m/s":1, "km/h":1/3.6, mph:0.44704, knot:0.514444, "ft/s":0.3048 } },
  time:     { units: ["s","min","hr","day","wk","mo","yr"],               toBase: { s:1, min:60, hr:3600, day:86400, wk:604800, mo:2629800, yr:31557600 } },
  data:     { units: ["B","KB","MB","GB","TB","PB","bit"],                toBase: { B:1, KB:1024, MB:1048576, GB:1073741824, TB:1.1e12, PB:1.1259e15, bit:0.125 } },
  energy:   { units: ["J","kJ","cal","kcal","Wh","kWh","BTU"],           toBase: { J:1, kJ:1000, cal:4.184, kcal:4184, Wh:3600, kWh:3600000, BTU:1055.06 } },
  pressure: { units: ["Pa","kPa","MPa","bar","atm","psi","mmHg"],        toBase: { Pa:1, kPa:1000, MPa:1e6, bar:1e5, atm:101325, psi:6894.76, mmHg:133.322 } },
};

export default CONV_DATA;
