import {Ref, ref} from 'vue'
import {ButtonControl, StateChangeType} from '@/models/leafletButtonControl'

export function useLeafletButtonControl(
  iconKey: string,
  tooltipTitle: string,
  stateChangeHook?: (
    changedState: Ref<boolean>,
    changeType: StateChangeType
  ) => void
) {

  const isActive = ref<boolean>(false)
  const buttonControl = new ButtonControl(isActive, iconKey, tooltipTitle, stateChangeHook)

  return { buttonControl, isActive }
}
