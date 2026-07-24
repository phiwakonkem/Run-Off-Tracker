function MetricCard({ label, value, accent }) {
  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700">
      <p className="text-sm text-slate-400 uppercase tracking-wide">
        {label}
      </p>
      <p className={`text-2xl font-bold mt-2 ${ accent ? 'text-emerald-400' : 'text-white' }`}>{value}</p>
    </div>
  )
}

export default MetricCard