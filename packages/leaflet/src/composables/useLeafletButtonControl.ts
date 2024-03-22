import { ref } from 'vue'
import { ButtonControl } from '@leaflet/models/leafletButtonControl'

export function useLeafletButtonControl(iconKey: string, tooltipTitle: string) {
  const isActive = ref<boolean>(false)
  const buttonControl = new ButtonControl(isActive, iconKey, tooltipTitle)

  return { buttonControl, isActive }
}
