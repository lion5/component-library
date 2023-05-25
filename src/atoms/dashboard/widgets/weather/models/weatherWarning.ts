export interface WeatherWarning {
  warnId: string
  type: number
  level: number
  start: number
  end: number
  regions: { polygon: number[] }[]
  isVorabInfo: boolean
  description: string
  headLine: string
  instruction: string
  event: string
  descriptionText: string
  urls: string
}
