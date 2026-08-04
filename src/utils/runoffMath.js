export function buildSmoothSeries(quarters, stepsPerSegment = 8) {
  const points = []

  for (let i = 0; i < quarters.length - 1; i++) {
    const start = quarters[i]
    const end = quarters[i + 1]

    for (let step = 0; step < stepsPerSegment; step++) {
      const fraction = step / stepsPerSegment
      points.push({
        t: i + fraction,
        paid: start.paid + (end.paid - start.paid) * fraction,
        outstanding:
          start.outstanding + (end.outstanding - start.outstanding) * fraction,
      })
    }
  }

  const last = quarters[quarters.length - 1]
  points.push({ t: quarters.length - 1, paid: last.paid, outstanding: last.outstanding })

  return points
}

export function findCrossoverPoint(quarters) {
  for (let i = 0; i < quarters.length - 1; i++) {
    const a = quarters[i]
    const b = quarters[i + 1]
    const diffA = a.paid - a.outstanding
    const diffB = b.paid - b.outstanding

    const signChanged = (diffA < 0 && diffB >= 0) || (diffA > 0 && diffB <= 0)
    if (signChanged && diffA !== diffB) {
      const fraction = diffA / (diffA - diffB)
      return {
        t: i + fraction,
        value: a.paid + (b.paid - a.paid) * fraction,
      }
    }
  }
  return null
}

export function quarterLabel(t, quarters) {
  if (Number.isInteger(t)) {
    return quarters[t]?.quarter ?? quarters[quarters.length - 1].quarter
  }
  const index = Math.floor(t)
  return `${quarters[index].quarter} → ${quarters[index + 1].quarter}`
}