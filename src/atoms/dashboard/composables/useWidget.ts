import type { WidgetProps } from '@/dashboard/models/widgetProps'
import { computed } from 'vue'
import type { WidgetSetting } from '@/dashboard/models/widgetConfiguration'

export function useWidget(props: Readonly<WidgetProps>) {
  const getSetting = (key: string) => {
    return props.settings.get(key) || props.defaultSettings.get(key)
  }

  const getReactiveSetting = (key: string) => {
    return computed(() => getSetting(key))
  }

  const getSettings = () => {
    return new Map<string, WidgetSetting>([
      ...props.defaultSettings,
      ...props.settings,
    ])
  }

  return { getReactiveSetting, getSetting, getSettings }
}
