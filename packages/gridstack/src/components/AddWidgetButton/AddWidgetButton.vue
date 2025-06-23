<template>
  <BaseButton variant="success" @click="modalDisplayed = !modalDisplayed">
    <i class="bi-plus-lg" />
    Widget hinzufügen
  </BaseButton>
  <DismissibleModal
    v-if="modalDisplayed"
    class="add-widget-modal"
    v-model:modal-displayed="modalDisplayed"
    dismiss-button-label="Abbrechen"
  >
    <h1 class="headline">Widget-Auswahl</h1>
    <div class="available-widgets">
      <AddWidgetInput
        v-for="([key, widgetWrapper], index) in availableWidgets"
        :key="key"
        :widget-wrapper="widgetWrapper"
        :tabindex="index + 1"
        @add-widget="onSubmit(key)"
      />
    </div>
  </DismissibleModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { BaseButton, DismissibleModal } from '@lion5/component-library'
import { WidgetComponentWrapper } from '@/models/widgetComponentWrapper'
import AddWidgetInput from '@/components/AddWidgetInput/AddWidgetInput.vue'

const modalDisplayed = ref<boolean>(false)

defineProps<{
  availableWidgets: Map<string, WidgetComponentWrapper>
}>()
const emit = defineEmits<{
  /**
   * emitted if a widget input is triggered by the user
   *
   * @param widgetKey the widgets component key (see {@link availableWidgets} for all available widget component keys)
   */
  (e: 'addWidget', widgetKey: string): void
}>()
const onSubmit = (key: string) => {
  modalDisplayed.value = false
  emit('addWidget', key)
}
</script>

<style lang="scss" scoped>
.add-widget-modal {
  width: 100%;
}

.headline {
  padding: var(--space-sm) var(--space-md);
}

.available-widgets {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--space-md);
  padding: 50px var(--space-md);

  & > * {
    aspect-ratio: 16 / 9;
    max-height: 250px !important;
    overflow: hidden;
    object-fit: contain;
    object-position: center;
  }
}
</style>
