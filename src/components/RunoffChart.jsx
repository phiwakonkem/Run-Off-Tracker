import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

function RunoffChart({ data }) {
  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
      <h2 className="text-sm text-slate-400 uppercase tracking-wide mb-4">
        Run-Off Trajectory
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="quarter" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{ backgroundColor: '#1e293b', border: 'none' }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="paid"
            name="Paid Claims"
            stroke="#34d399"
            fill="#34d399"
            fillOpacity={0.2}
          />
          <Area
            type="monotone"
            dataKey="outstanding"
            name="Outstanding Reserves"
            stroke="#f87171"
            fill="#f87171"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RunoffChart