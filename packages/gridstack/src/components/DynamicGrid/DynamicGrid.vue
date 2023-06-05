<template>
  <div class="grid-stack" @change="onChange">
    <BaseWidget
      v-for="widgetConfig in widgetConfigs"
      :key="widgetConfig.id"
      :widget-config="widgetConfig"
      :components="components"
      :editMode="editMode"
      @delete-widget="deleteWidget(widgetConfig.id)"
      @update-settings="
        (settings) => onUpdateWidgetSettings(widgetConfig.id, settings)
      "
    />
  </div>
</template>

<script lang="ts" setup>
import { WidgetConfiguration } from '@/atoms/dashboard/models/widgetConfiguration'
import { WidgetComponentWrapper } from '@/atoms/dashboard/models/widgetComponentWrapper'
import { useGridStack } from '@/atoms/dashboard/composables/useGridStack'
import BaseWidget from '@/atoms/dashboard/BaseWidget/BaseWidget.vue'

/**
 * this component wraps the [gridstack.js]{@link https://gridstackjs.com/} lib functions and integrate its functionality into the vue framework.
 */

const props = defineProps<{
  /**
   * Is used to enable and disable gridStacks edit functions see {@link useGridStack}
   */
  editMode: boolean
  /**
   * The configuration of the widgets that shall be rendered on the grid
   */
  widgetConfigs: WidgetConfiguration[]
  /**
   * the components that are available for componentId resolution.
   */
  components: Map<string, WidgetComponentWrapper>
}>()

const emit = defineEmits<{
  /**
   * emitted when gridStack detects a change (user dropped element or resized element).
   *
   * @param widgetConfigurations the new widget configurations after user made change
   */
  (e: 'update:widgetConfigs', widgetConfigurations: WidgetConfiguration[]): void
}>()

const { onChange, deleteWidget, onUpdateWidgetSettings } = useGridStack(
  props,
  emit
)
</script>
