import RunoffChart from './components/RunoffChart'
import PortfolioSelector from './components/PortfolioSelector'
import { useState } from 'react'
import { portfolios } from './data/portfolios'
import MetricCard from './components/MetricCard'

function App() {
  const [selectedId, setSelectedId] = useState(portfolios[0].id)
  const selectedPortfolio = portfolios.find((p) => p.id === selectedId)

  const totalPaidToDate = selectedPortfolio.quarters.at(-1).paid
  const outstandingReserves = selectedPortfolio.quarters.at(-1).outstanding
  const capitalReleasedRatio = (totalPaidToDate / selectedPortfolio.initialLiability) * 100

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-2xl font-bold text-white mb-1">
          Run-Off Tracker
        </h1>

        <PortfolioSelector portfolios={portfolios} selectedId={selectedId} onChange={setSelectedId} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard label="Total Initial Liability" value={`R${selectedPortfolio.initialLiability.toLocaleString()}`} />
          <MetricCard label="Total Paid to Date" value={`R${totalPaidToDate.toLocaleString()}`} />
          <MetricCard label="Outstanding Reserves" value={`R${outstandingReserves.toLocaleString()}`} />
          <MetricCard label="Capital Released Ratio" value={`${capitalReleasedRatio.toFixed(1)}%`} />
          <MetricCard label="Capital Released Ratio" value={`${capitalReleasedRatio.toFixed(1)}%`} accent />
        </div>

        <RunoffChart data={selectedPortfolio.quarters} />
      </div>  
    </div>
  )
}

export default App