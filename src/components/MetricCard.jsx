function MetricCard({ label, value }) {
  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
      <p className="text-sm text-slate-400 uppercase tracking-wide">
        {label}
      </p>
      <p className="text-2xl font-bold text-white mt-2">{value}</p>
    </div>
  )
}

export default MetricCard