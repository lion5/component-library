<template>
  <RefreshableImageWidget
    :settings="refreshableImageWidgetSettings"
    :default-settings="refreshableImageWidgetSettings"
  />
</template>
<script lang="ts" setup>
import { computed, ComputedRef } from 'vue'
import {
  WidgetSetting,
  WidgetSettings
} from '@/atoms/dashboard/models/widgetConfiguration'
import { useWidget } from '@/atoms/dashboard/composables/useWidget'
import RefreshableImageWidget from '@/atoms/dashboard/widgets/RefreshableImageWidget/RefreshableImageWidget.vue'
import { RefreshableImageSetting } from '@/atoms/dashboard/widgets/RefreshableImageWidget/settings'
import { DWDWarnGermanyByCriteriaSetting } from '@/atoms/dashboard/widgets/weather/widgets/DWDWarnMapWidget/settings'

const props = defineProps<{
  settings: WidgetSettings
  defaultSettings: WidgetSettings
}>()

const { getReactiveSetting, getSettings } = useWidget(props)
const criteria = getReactiveSetting(
  DWDWarnGermanyByCriteriaSetting.CRITERIA
) as ComputedRef<string>

const federalState = getReactiveSetting(
  DWDWarnGermanyByCriteriaSetting.FEDERAL_STATE
) as ComputedRef<string>

const refreshableImageWidgetSettings = computed(
  () =>
    new Map([
      ...getSettings(),
      [RefreshableImageSetting.SRC, getUrl()],
      [
        RefreshableImageSetting.REFRESH_INTERVAL_SECONDS,
        15 * 60 // 15 minutes
      ]
    ]) as Map<string, WidgetSetting>
)

const getUrl = () => {
  const federalStateParam = federalState.value || 'de'
  if (!criteria.value) {
    return `https://www.dwd.de/DWD/warnungen/warnapp_gemeinden/json/warnungen_gemeinde_map_${federalStateParam}.png`
  }
  return `https://www.dwd.de/DWD/warnungen/warnapp_gemeinden/json/warnungen_gemeinde_map_${federalStateParam}_${criteria.value}.png`
}
</script>

<style lang="scss" scoped></style>
