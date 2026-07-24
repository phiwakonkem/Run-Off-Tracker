function PortfolioSelector({ portfolios, selectedId, onChange }) {
  return (
    <div className="mb-6">
      <label className="block text-sm text-slate-400 uppercase tracking-wide mb-2">
        Portfolio
      </label>
      <select
        value={selectedId}
        onChange={(e) => onChange(e.target.value)}
        className="bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-400"
      >
        {portfolios.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default PortfolioSelector