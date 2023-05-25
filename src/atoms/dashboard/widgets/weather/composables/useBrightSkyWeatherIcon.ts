import { defineComponent } from 'vue'
import IconClearDay from '@/icons/weather/IconClearDay.vue'
import IconClearNight from '@/icons/weather/IconClearNight.vue'
import IconPartlyCloudyDay from '@/icons/weather/IconPartlyCloudyDay.vue'
import IconPartlyCloudyNight from '@/icons/weather/IconPartlyCloudyNight.vue'
import IconCloudy from '@/icons/weather/IconCloudy.vue'
import IconFog from '@/icons/weather/IconFog.vue'
import IconWind from '@/icons/weather/IconWind.vue'
import IconRain from '@/icons/weather/IconRain.vue'
import IconSleet from '@/icons/weather/IconSleet.vue'
import IconSnow from '@/icons/weather/IconSnow.vue'
import IconHail from '@/icons/weather/IconHail.vue'
import IconThunderstorm from '@/icons/weather/IconThunderstorm.vue'
import { useNumber } from '@/composables'

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
