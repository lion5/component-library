<template>
  <div class="refreshable-image-widget">
    <h2 v-if="title">{{ title }}</h2>
    <img :src="reactiveSource" alt="Regen Radar" />
  </div>
</template>
<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import { computed, ref, watch } from 'vue'
import { WidgetSettings } from '@/models/widgetConfiguration'
import { useWidget } from '@/composables/useWidget'
import { RefreshableImageSetting } from '@/components/widgets/RefreshableImageWidget/settings'
import { useInterval } from '@lion5/component-library'

const props = defineProps<{
  settings: WidgetSettings
  defaultSettings: WidgetSettings
}>()
const { getReactiveSetting } = useWidget(props)
const src = getReactiveSetting(
  RefreshableImageSetting.SRC
) as ComputedRef<string>
const title = getReactiveSetting(
  RefreshableImageSetting.TITLE
) as ComputedRef<string>
const intervalInSeconds = getReactiveSetting(
  RefreshableImageSetting.REFRESH_INTERVAL_SECONDS
) as ComputedRef<number>

const lastUpdated = ref<number>(Date.now())

const { createIntervalSeconds } = useInterval()

const reactiveSource = computed(() => `${src.value}?v=${lastUpdated.value}`)
watch(
  () => intervalInSeconds,
  (newIntervalInSeconds) => {
    createIntervalSeconds(() => {
      lastUpdated.value = Date.now()
    }, newIntervalInSeconds.value)
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.refreshable-image-widget {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  h2 {
    padding-inline: var(--space-sm);
  }

  img {
    object-fit: scale-down;
    object-position: center;
    width: 100%;
    height: 100%;
  }
}
</style>
