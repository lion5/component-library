<template>
  <!--  TODO: your content here-->
  <h1>Hello {{ greeting }}!</h1>
</template>

<script lang="ts" setup>
import type { WidgetSettings } from '@/atoms/dashboard/models/widgetConfiguration'
import { useWidget } from '@/atoms/dashboard/composables/useWidget'
import { TemplateWidgetSetting } from '@/atoms/dashboard/widgets/TemplateWidget/settings'
import type { ComputedRef } from 'vue'

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
