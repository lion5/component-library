<template>
  <div class="delete-dashboard-modal">
    <h3 class="header1">Dashboard-Konfiguration löschen</h3>
    <div class="header2">
      Möchten Sie die Dashboard-Konfiguration
      {{ localConfigurationName }} wirklich löschen?
    </div>
    <BaseButton @click="$emit('confirmDelete')" class="delete-button">
      Löschen
    </BaseButton>
  </div>
</template>

<script lang="ts" setup>
import { BaseButton } from '@lion5/component-library'
import { toRef, watch } from 'vue'

defineEmits(['confirmDelete'])
const props = defineProps({
  configurationName: String
})

const localConfigurationName = toRef(props.configurationName)

watch(
  () => props.configurationName,
  (newValue) => {
    localConfigurationName.value = newValue
  },
  { immediate: true }
)
</script>
<style scoped lang="scss">
.delete-dashboard-modal {
  padding: 0 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
}
.delete-button {
  max-width: unset;
  width: 100%;
}
.header1,
.header2 {
  min-width: 300px;
}
</style>
