import RunoffChart from './components/RunoffChart'
import PortfolioSelector from './components/PortfolioSelector'
import { portfolios } from './data/portfolios'
import ClaimsTable from './components/ClaimsTable'
import MetricCard from './components/MetricCard'
import { useState, useEffect } from 'react'
import SkeletonCard from './components/SkeletonCard'

function App() {
  const [selectedId, setSelectedId] = useState(portfolios[0].id)
  const selectedPortfolio = portfolios.find((p) => p.id === selectedId)
  const [isLoading, setIsLoading] = useState(true)
  const [isSwitching, setIsSwitching] = useState(false)

  const totalPaidToDate = selectedPortfolio.quarters.at(-1).paid
  const outstandingReserves = selectedPortfolio.quarters.at(-1).outstanding
  const capitalReleasedRatio = (totalPaidToDate / selectedPortfolio.initialLiability) * 100

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 900)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isLoading) return
    setIsSwitching(true)
    const timer = setTimeout(() => setIsSwitching(false), 400)
    return () => clearTimeout(timer)
  }, [selectedId])

  return (
    <div className="min-h-screen bg-ink p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-2xl font-bold text-white mb-1">
          Run-Off Tracker
        </h1>

        <PortfolioSelector portfolios={portfolios} selectedId={selectedId} onChange={setSelectedId} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {isLoading || isSwitching ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
              <MetricCard label="Total Initial Liability" value={`R${selectedPortfolio.initialLiability.toLocaleString()}`} />
              <MetricCard label="Total Paid to Date" value={`R${totalPaidToDate.toLocaleString()}`} />
              <MetricCard label="Outstanding Reserves" value={`R${outstandingReserves.toLocaleString()}`}/>
              <MetricCard label="Capital Released Ratio" value={`${capitalReleasedRatio.toFixed(1)}%`} accent />
            </>
          )}
        </div>

        {isLoading || isSwitching ? (
          <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 h-[356px] animate-pulse flex items-center justify-center">
            <p className="text-slate-500 text-sm">Loading trajectory...</p>
          </div>
        ) : (
          <RunoffChart data={selectedPortfolio.quarters} />
        )}

        <div className="mt-8">
          {isLoading || isSwitching ? (
            <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 h-64 animate-pulse flex items-center justify-center">
              <p className="text-slate-500 text-sm">Loading claims...</p>
            </div>
          ) : (
            <ClaimsTable claims={selectedPortfolio.claims} />
          )}
        </div>

      </div>  
    </div>
  )
}

export default App