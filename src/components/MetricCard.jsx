function MetricCard({ label, value, accent }) {
  return (
    <div className="bg-panel rounded-lg p-5 border-t-2 border-brass/60 border-x border-b border-white/5 relative">
      <span className="absolute top-2 right-3 text-[10px] font-data text-muted uppercase tracking-wider">
        FY-Q4
      </span>
      <p className="text-xs text-muted uppercase tracking-wide font-medium">
        {label}
      </p>
      <p
        className={`text-2xl font-data font-medium mt-2 ${
          accent ? 'text-brass' : 'text-parchment'
        }`}
      >
        {value}
      </p>
    </div>
  )
}

export default MetricCard