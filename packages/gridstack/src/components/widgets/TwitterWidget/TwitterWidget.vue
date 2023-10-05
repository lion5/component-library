<template>
  <IFrameWidget :settings="localSettings" :default-settings="localSettings" />
</template>
<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import { computed } from 'vue'
import { TwitterWidgetSetting } from '@gridstack/components/widgets/TwitterWidget/settings'
import { IFrameSetting } from '@gridstack/components/widgets/IFrameWidget/settings'
import IFrameWidget from '@gridstack/components/widgets/IFrameWidget/IFrameWidget.vue'
import { WidgetSettings } from '@gridstack/models/widgetConfiguration'
import { useWidget } from '@gridstack/composables/useWidget'

const props = defineProps<{
  settings: WidgetSettings
  defaultSettings: WidgetSettings
}>()
const localSettings = computed(() => {
  const { getReactiveSetting } = useWidget(props)
  const hashTag = getReactiveSetting(
    TwitterWidgetSetting.TAG
  ) as ComputedRef<string>
  const title = getReactiveSetting(
    TwitterWidgetSetting.TITLE
  ) as ComputedRef<string>

  return new Map([
    [IFrameSetting.SRC, getUrl(hashTag)],
    [IFrameSetting.TITLE, title.value]
  ])
})

const getUrl = (hashTag: ComputedRef<string>) => {
  const url = new URL('https://nitter.it/search')
  url.searchParams.set('f', 'tweet')
  url.searchParams.set('q', hashTag.value)
  // Twitter does not allow embedding their site
  // const url = new URL('https://twitter.com/search?q=%23bamberg&src=typed_query')
  // url.searchParams.set('src', 'typed_query')
  // url.searchParams.set('q', hashTag.value)
  return url.toString()
}
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
