<template>
  <div
    class="grid-stack-item"
    :id="widgetConfig.id"
    :gs-id="widgetConfig.id"
    :gs-x="widgetConfig.position.x"
    :gs-y="widgetConfig.position.y"
    :gs-w="widgetConfig.position.width"
    :gs-h="widgetConfig.position.height"
  >
    <div class="grid-stack-item-content widget-card">
      <component
        v-if="!editMode"
        :is="widgetWrapper.component"
        :settings="widgetConfig.settings"
        :defaultSettings="widgetWrapper.defaultSettings"
        :widgetName="widgetWrapper.name"
        data-test="widget"
      ></component>
      <BaseWidgetEditMode
        v-if="editMode"
        :widget-name="widgetWrapper.name"
        :settings="widgetConfig.settings"
        :defaultSettings="widgetWrapper.defaultSettings"
        :formSchema="widgetWrapper.formSchema"
        @delete-widget="$emit('deleteWidget')"
        @update-settings="(settings) => $emit('updateSettings', settings)"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { WidgetComponentWrapper } from '@gridstack/models/widgetComponentWrapper'
import {
  WidgetConfiguration,
  WidgetSettings
} from '@gridstack/models/widgetConfiguration'
import NotFoundWidget from '@gridstack/components/widgets/NotFoundWidget/NotFoundWidget.vue'
import { FormSchema } from '@gridstack/models/formSchema'
import BaseWidgetEditMode from '@gridstack/components/BaseWidgetEditMode/BaseWidgetEditMode.vue'

const props = defineProps<{
  /**
   * the widget's configuration to display
   */
  widgetConfig: WidgetConfiguration
  /**
   * if true the {@link widgetComponent} is hidden and an edit overlay is displayed.
   */
  editMode: boolean
  /**
   * the component map to resolve the componentId given in {@link widgetConfig}
   */
  components: Map<string, WidgetComponentWrapper>
}>()

defineEmits<{
  (e: 'deleteWidget'): void
  (e: 'updateSettings', settings: WidgetSettings): void
}>()

const widgetWrapper = computed(
  () =>
    props.components.get(props.widgetConfig.componentId) ||
    new WidgetComponentWrapper(
      props.widgetConfig.componentId,
      NotFoundWidget,
      new Map(),
      new FormSchema([])
    )
)
</script>
<style lang="scss">
.grid-stack > .grid-stack-item > .ui-resizable-se {
  right: 0.5rem !important;
  bottom: 0.5rem !important;
}
</style>
<style lang="scss" scoped>
.widget-card {
  box-shadow: var(--shadow-300);
  background-color: var(--color-surface-1);
  border-radius: var(--border-radius-300);
  scroll-behavior: smooth;
  scroll-padding-block: var(--space-md);
}
</style>
