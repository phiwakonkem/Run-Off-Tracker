function SkeletonCard() {
  return (
    <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 animate-pulse">
      <div className="h-3 w-24 bg-slate-700 rounded mb-3"></div>
      <div className="h-6 w-32 bg-slate-700 rounded"></div>
    </div>
  )
}

export default SkeletonCard