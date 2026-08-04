import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceDot,
} from 'recharts'
import { buildSmoothSeries, findCrossoverPoint, quarterLabel } from '../utils/runoffMath'

function RunoffChart({ data }) {
  const smoothData = buildSmoothSeries(data)
  const crossover = findCrossoverPoint(data)

  return (
    <div className="bg-panel rounded-lg p-5 border border-white/5">
      <h2 className="text-xs text-muted uppercase tracking-wide mb-4 font-medium">
        Run-Off Trajectory
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={smoothData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a3441" />
          <XAxis
            dataKey="t"
            type="number"
            domain={[0, data.length - 1]}
            ticks={data.map((_, i) => i)}
            tickFormatter={(t) => quarterLabel(t, data)}
            stroke="#8a8f98"
            style={{ fontFamily: 'IBM Plex Mono', fontSize: 12 }}
          />
          <YAxis stroke="#8a8f98" style={{ fontFamily: 'IBM Plex Mono', fontSize: 12 }} />
          <Tooltip
            labelFormatter={(t) => quarterLabel(t, data)}
            formatter={(value) => `R${Math.round(value).toLocaleString()}`}
            contentStyle={{
              backgroundColor: '#1b232d',
              border: '1px solid rgba(255,255,255,0.1)',
              fontFamily: 'IBM Plex Mono',
            }}
          />
          <Legend wrapperStyle={{ fontFamily: 'Inter', fontSize: 13 }} />
          <Area
            type="monotone"
            dataKey="paid"
            name="Paid Claims"
            stroke="#4fa8a0"
            fill="#4fa8a0"
            fillOpacity={0.15}
          />
          <Area
            type="monotone"
            dataKey="outstanding"
            name="Outstanding Reserves"
            stroke="#a6614b"
            fill="#a6614b"
            fillOpacity={0.15}
          />
          {crossover && (
            <ReferenceDot
              x={crossover.t}
              y={crossover.value}
              r={5}
              fill="#c9a227"
              stroke="#12181f"
              strokeWidth={2}
              label={{
                value: 'Break-even',
                position: 'top',
                fill: '#c9a227',
                fontSize: 11,
                fontFamily: 'IBM Plex Mono',
              }}
            />
          )}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RunoffChart