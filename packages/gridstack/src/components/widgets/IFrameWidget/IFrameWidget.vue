<template>
  <div class="iframe-widget">
    <h2 v-if="title">{{ title }}</h2>
    <iframe
      :src="src"
      loading="lazy"
      referrerpolicy="no-referrer"
      sandbox="allow-forms"
    ></iframe>
  </div>
</template>
<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import { useWidget } from '@gridstack/composables/useWidget'
import type { WidgetSettings } from '@gridstack/models/widgetConfiguration'
import { IFrameSetting } from '@gridstack/components/widgets/IFrameWidget/settings'

const props = defineProps<{
  settings: WidgetSettings
  defaultSettings: WidgetSettings
}>()
const { getReactiveSetting } = useWidget(props)
const src = getReactiveSetting(IFrameSetting.SRC) as ComputedRef<string>
const title = getReactiveSetting(IFrameSetting.TITLE) as ComputedRef<string>
</script>

<style lang="scss" scoped>
.iframe-widget {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

iframe {
  object-fit: contain;
  object-position: center;
  width: 100%;
  height: 100%;
  border: none;
}
</style>
