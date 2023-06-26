<template>
  <WidgetWrapper>
    <!--  TODO: your content here-->
    <h1>Hello {{ greeting }}!</h1>
  </WidgetWrapper>
</template>

<script lang="ts" setup>
import type { WidgetSettings } from '@/models/widgetConfiguration'
import { useWidget } from '@/composables/useWidget'
import { TemplateWidgetSetting } from '@/components/widgets/TemplateWidget/settings'
import type { ComputedRef } from 'vue'
import WidgetWrapper from '@/atoms/dashboard/WidgetWrapper/WidgetWrapper.vue'

/**
 * This is a Widget Template. You can copy this template and start to implement your own widget.
 * Do not forget to add your widget to the {@link availableWidgets} map.
 */

const props = defineProps<{
  settings: WidgetSettings
  defaultSettings: WidgetSettings
}>()
const { getReactiveSetting } = useWidget(props)
const greeting = getReactiveSetting(
  TemplateWidgetSetting.GREETING
) as ComputedRef<string>

// TODO: your content here
</script>

<style lang="scss" scoped></style>
