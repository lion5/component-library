<template>
  <div class="save-dashboard-modal">
    <BaseInputV2
      v-model="name"
      label="Name"
      :validation-rules="required"
      name="name"
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
  padding-top: 3rem;
  padding-right: 1rem;
  padding-bottom: 1rem;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
}
.base-input,
.save-button {
  width: 100%; /* Makes both input and button span full width of their parent */
}
</style>
