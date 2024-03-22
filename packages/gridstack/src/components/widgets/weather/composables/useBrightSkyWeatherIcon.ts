import { defineComponent } from 'vue'
import {
  IconClearDay,
  IconClearNight,
  IconCloudy,
  IconFog,
  IconHail,
  IconPartlyCloudyDay,
  IconPartlyCloudyNight,
  IconRain,
  IconSleet,
  IconSnow,
  IconThunderstorm,
  IconWind,
  useNumber
} from '@lion5/component-library'

const iconMap: { [key: string]: ReturnType<typeof defineComponent> } =
  Object.freeze({
    'clear-day': IconClearDay,
    'clear-night': IconClearNight,
    'partly-cloudy-day': IconPartlyCloudyDay,
    'partly-cloudy-night': IconPartlyCloudyNight,
    cloudy: IconCloudy,
    fog: IconFog,
    wind: IconWind,
    rain: IconRain,
    sleet: IconSleet,
    snow: IconSnow,
    hail: IconHail,
    thunderstorm: IconThunderstorm
  })

export function useBrightSkyWeatherIcon() {
  const getWeatherIcon = (iconKey: string | null) => {
    if (!iconKey || !(iconKey in iconMap)) {
      return IconCloudy
    }
    return iconMap[iconKey]
  }

  const getFormattedTemperature = (value: number | null | undefined) => {
    const { getFormattedNumber } = useNumber()
    return `${getFormattedNumber(value)}°C`
  }

  return { getWeatherIcon, getFormattedTemperature }
}
