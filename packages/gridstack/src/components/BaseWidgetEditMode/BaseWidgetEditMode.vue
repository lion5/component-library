<template>
  <LayoutStack class="edit-content">
    <h2 class="widget-name">{{ widgetName }}</h2>
    <i class="move-icon bi-arrows-move"></i>
    <DropDown class="settings">
      <template #dropDownIcon>
        <IconThreeDotsMenu />
      </template>
      <template #dropDownContent>
        <DropDownItem
          v-if="!FormSchema.isEmpty(formSchema)"
          label="Einstellungen"
          @click="settingsOpened = true"
          data-test="settings-button"
        >
          <template #icon><i class="bi-pen"></i></template>
        </DropDownItem>
        <DropDownItem
          label="Widget löschen"
          @click="$emit('deleteWidget')"
          data-test="delete-button"
        >
          <template #icon><i class="bi-trash2"></i></template>
        </DropDownItem>
      </template>
    </DropDown>
    <WidgetSettingsModal
      v-if="settingsOpened"
      v-model:modal-displayed="settingsOpened"
      :widgetName="widgetName"
      :settings="settings"
      :defaultSettings="defaultSettings"
      :formSchema="formSchema"
      @update:settings="onUpdateSettings"
    />
  </LayoutStack>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  DropDown,
  DropDownItem,
  IconThreeDotsMenu,
  LayoutStack
} from '@lion5/component-library'
import { WidgetSettings } from '@/models/widgetConfiguration'
import { FormSchema } from '@/models/formSchema'
import WidgetSettingsModal from '@/components/WidgetSettingsModal/WidgetSettingsModal.vue'

defineProps<{
  /**
   * The widgets name that is displayed instead of the widget itself during edit mode
   */
  widgetName: string
  /**
   * The user changed settings of the widget
   */
  settings: WidgetSettings
  /**
   * The default settings of the widget
   */
  defaultSettings: WidgetSettings
  /**
   * The form schema of the settings form
   */
  formSchema: FormSchema
}>()

const emit = defineEmits<{
  /**
   * is emitted if user clicks on the delete dropdown item
   */
  (e: 'deleteWidget'): void
  /**
   * is emitted if user submits new or updated settings
   */
  (e: 'updateSettings', settings: WidgetSettings): void
}>()

const settingsOpened = ref<boolean>(false)
const onUpdateSettings = (settings: WidgetSettings) => {
  emit('updateSettings', settings)
  settingsOpened.value = false
}
</script>

<style lang="scss" scoped>
.edit-content {
  height: 100%;
  cursor: move;

  .widget-name {
    justify-self: start;
    padding: var(--space-sm);
    margin: 0;
    font-size: var(--font-size-4);
  }

  .move-icon {
    place-self: center;
    font-size: var(--font-size-7);
  }

  .settings {
    padding: var(--space-sm);
    place-self: start end;
    margin-inline-end: -8px;
  }
}
</style>
