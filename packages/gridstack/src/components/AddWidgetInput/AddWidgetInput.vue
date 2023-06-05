<template>
  <button
    class="widget-card"
    :data-widget-name="widgetWrapper.name"
    @click="$emit('addWidget')"
    v-bind="$attrs"
  >
    <component
      :is="widgetWrapper.component"
      :widget-name="widgetWrapper.name"
      :settings="widgetWrapper.defaultSettings"
      :defaultSettings="widgetWrapper.defaultSettings"
      data-test="widget"
    ></component>
  </button>
</template>

<script lang="ts" setup>
import type { WidgetComponentWrapper } from '@/models/widgetComponentWrapper'

defineProps<{
  /**
   * the component wrapper that contains the component to display and its name
   */
  widgetWrapper: WidgetComponentWrapper
}>()

defineEmits<{
  /**
   * is emitted when user clicks on the widget card
   */
  (e: 'addWidget'): void
}>()
</script>

<style lang="scss" scoped>
.widget-card {
  position: relative;
  background-color: var(--color-surface-1);
  box-shadow: var(--shadow-600);
  border: none;
  border-radius: var(--border-radius-300);
  cursor: pointer !important;
  padding: 0;
  container-type: size;

  &::before {
    position: absolute;
    display: grid;
    place-content: center;
    inset: 0;
    z-index: 2000;
    padding-inline: var(--space-md);
    font-size: var(--font-size-4);
    content: attr(data-widget-name) ' hinzufügen';
    backdrop-filter: brightness(130%) blur(10px);
    border-radius: var(--border-radius-300);
    font-weight: var(--font-weight-bold);
    opacity: 0;
    transition: opacity 50ms linear;
  }

  &:hover,
  &:focus-within {
    outline: 2px solid var(--color-primary);

    &::before {
      opacity: 1;
    }
  }

  & > * {
    user-select: none;
    pointer-events: none;
    object-fit: contain;
    object-position: center;
  }
}
</style>
