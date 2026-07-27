import { useState } from 'react'

function statusStyles(status) {
  if (status === 'Settled') return 'bg-teal/10 text-teal'
  if (status === 'Disputed') return 'bg-clay/10 text-clay'
  return 'bg-brass/10 text-brass'
}

function ClaimsTable({ claims }) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const filteredClaims = claims.filter((claim) => {
    const matchesSearch =
      claim.claimId.toLowerCase().includes(search.toLowerCase()) ||
      claim.policyNumber.toLowerCase().includes(search.toLowerCase())

    const matchesStatus = statusFilter === 'All' || claim.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 pt-5 pb-3">
        <h2 className="text-sm text-slate-400 uppercase tracking-wide">
          Claims Detail
        </h2>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search claim ID or policy..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-900 border border-slate-700 text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          >
            <option value="All">All statuses</option>
            <option value="Settled">Settled</option>
            <option value="Open">Open</option>
            <option value="Disputed">Disputed</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-slate-400 border-b border-slate-700">
              <th className="px-5 py-3 font-medium">Claim ID</th>
              <th className="px-5 py-3 font-medium">Policy</th>
              <th className="px-5 py-3 font-medium">Quarter</th>
              <th className="px-5 py-3 font-medium">Paid</th>
              <th className="px-5 py-3 font-medium">Outstanding</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredClaims.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-8 text-center text-slate-500">
                  No claims match your search.
                </td>
              </tr>
            ) : (
              filteredClaims.map((claim) => (
                <tr
                  key={claim.claimId}
                  className="border-b border-slate-700/50 last:border-0 hover:bg-slate-700/30 transition-colors"
                >
                  <td className="px-5 py-3 text-white font-mono text-xs">{claim.claimId}</td>
                  <td className="px-5 py-3 text-slate-300">{claim.policyNumber}</td>
                  <td className="px-5 py-3 text-slate-300">{claim.quarter}</td>
                  <td className="px-5 py-3 text-slate-300">
                    {claim.paid > 0 ? `R${claim.paid.toLocaleString()}` : '—'}
                  </td>
                  <td className="px-5 py-3 text-slate-300">
                    {claim.outstanding > 0 ? `R${claim.outstanding.toLocaleString()}` : '—'}
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${statusStyles(claim.status)}`}>
                      {claim.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ClaimsTable