<template>
  <div class="save-dashboard-modal">
    <h3 class="header1">Konfigurationsname eingeben</h3>
    <div class="header2">
      Bitte wählen Sie den Dashboard-Konfigurationsnamen
    </div>
    <BaseInputV2
      v-model="name"
      label="Name"
      :validation-rules="required"
      name="name"
      class="base-input"
    />
    <BaseButton :disabled="!name" @click="submitAndClose" class="save-button">
      Speichern
    </BaseButton>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import BaseInputV2 from '@/atoms/inputs/BaseInputV2/BaseInputV2.vue'
import BaseButton from '@/atoms/buttons/BaseButton/BaseButton.vue'

const name = ref('')
const required = computed(() => ({
  required: (value) => !!value || 'Erforderlich'
}))

const emit = defineEmits(['save'])

const submitAndClose = () => {
  emit('save', name.value)
}
</script>

<style lang="scss" scoped>
.save-dashboard-modal {
  padding-top: 0rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
}
.save-button {
  max-width: unset;
  width: 100%;
}
.header1,
.header2 {
  max-width: 250px;
}
</style>
