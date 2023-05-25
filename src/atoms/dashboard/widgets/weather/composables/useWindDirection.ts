const WIND_DIRECTIONS: { [key: number]: string } = Object.freeze({
  0: 'N',
  45: 'NO',
  90: 'O',
  135: 'SO',
  180: 'S',
  225: 'SW',
  270: 'W',
  315: 'NW',
})

export function useWindDirection() {
  const getDirectionName = (degree: number | null) => {
    if (degree == null) return ''
    const directionKeys = Object.keys(WIND_DIRECTIONS).map((key: string) =>
      Number(key)
    )
    const directionKey = directionKeys.reduce(
      (bestDegreeMatch: number, currentDegree: number) => {
        // if degree is 338° or larger it is closer to north, so we need to return zero here
        if (degree > 337.5) {
          return 0
        }
        return Math.abs(currentDegree - degree) <
          Math.abs(bestDegreeMatch - degree)
          ? currentDegree
          : bestDegreeMatch
      }
    )
    return WIND_DIRECTIONS[directionKey]
  }

  return { getDirectionName }
}
