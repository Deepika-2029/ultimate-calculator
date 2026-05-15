# Ultimate Calculator

A full-featured React calculator with 5 tabs.

## Setup

```bash
npm install
npm run dev
```

## Folder structure

```
ultimate-calculator/
├── src/
│   ├── data/
│   │   └── convData.js          # All unit conversion factors
│   ├── utils/
│   │   └── helpers.js           # fmt(), factorial(), convertTemp(), OP_SYM
│   ├── components/
│   │   ├── Btn.jsx              # Reusable button (variant prop controls color)
│   │   ├── Display.jsx          # Calculator screen (expr + result)
│   │   ├── BasicPanel.jsx       # Standard calculator + memory
│   │   ├── ScientificPanel.jsx  # Trig, log, powers, constants
│   │   ├── ConverterPanel.jsx   # 10-category unit converter
│   │   ├── PercentPanel.jsx     # 4 percentage tools + tip calculator
│   │   └── HistoryPanel.jsx     # Shared calculation history
│   └── App.jsx                  # Root — tab bar + panel switching
├── package.json
└── README.md
```

## Features

- **Basic** — arithmetic, memory (MC/MR/M+/M−/MS), keyboard support, backspace
- **Scientific** — sin/cos/tan (+ inverse), log, ln, √, ∛, x², x³, xʸ, 1/x, n!, |x|, π, e, DEG/RAD toggle
- **Units** — length, weight, temperature, area, volume, speed, time, data, energy, pressure
- **%** — percentage of, what % is X of Y, % change, tip calculator
- **History** — last 30 calculations saved, clearable
