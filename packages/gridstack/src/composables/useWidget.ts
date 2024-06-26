import { computed } from 'vue'
import { WidgetSetting } from '@/models/widgetConfiguration'
import type { WidgetProps } from '@/models/widgetProps'

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
      ...props.settings
    ])
  }

  return { getReactiveSetting, getSetting, getSettings }
}
