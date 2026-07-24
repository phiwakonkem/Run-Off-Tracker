# Xitus Legacy Portfolio Run-Off Tracker

A dashboard for portfolio managers and actuaries to monitor the financial
contraction of discontinued insurance books over time.

## The problem

When an insurance portfolio enters "run-off," the goal is to settle all
remaining claims until outstanding liability reaches zero. This tool
visualizes that trajectory — paid claims rising, outstanding reserves
falling — across two acquired legacy books.

## Features

- **Metric cards** — Total Initial Liability, Total Paid to Date,
  Outstanding Reserves, and Capital Released Ratio, all calculated live
  from the selected portfolio's quarterly data
- **Run-off trajectory chart** — an area chart showing paid claims and
  outstanding reserves across a 4-quarter timeline
- **Portfolio selector** — switch between "2018 European Motor Book" and
  "2020 Marine Cargo Run-off"; all metrics and the chart update instantly

## Tech stack

- React (Vite)
- TailwindCSS v4
- Recharts

## Running locally

\`\`\`bash
npm install
npm run dev
\`\`\`

## Project structure

\`\`\`
src/
├── data/portfolios.js       # mock portfolio data
├── components/
│   ├── MetricCard.jsx
│   ├── PortfolioSelector.jsx
│   └── RunoffChart.jsx
└── App.jsx                  # holds selected-portfolio state
\`\`\`

## Design notes

Portfolio data is kept separate from the mock data, with all displayed
metrics calculated at render time from `quarters` rather than pre-computed
and stored — so displayed values can never drift out of sync with the
source data. Swapping the mock `portfolios.js` for a real API call later
would only require changing one file.
