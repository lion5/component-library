<template>
  <ApprovalModal
    :class="'confirmation-modal ' + variant"
    :title="modalTitle"
    @accept="emit('confirm')"
  >
    <template #trigger="{ openModal }">
      <BaseButton :variant="variant" @click="openModal">
        <slot name="default">{{ triggerButtonLabel }}</slot>
      </BaseButton>
    </template>
    <template #content>
      <slot name="content" />
    </template>
  </ApprovalModal>
</template>

<script lang="ts" setup>
import { ColorVariant } from '@core/models/colorVariants'
import { ApprovalModal } from '@core/atoms'
import BaseButton from '@core/atoms/buttons/BaseButton/BaseButton.vue'

withDefaults(
  defineProps<{
    modalTitle: string
    triggerButtonLabel: string
    confirmButtonLabel?: string
    variant: ColorVariant
  }>(),
  {
    confirmButtonLabel: 'Bestätigen',
    variant: 'danger'
  }
)
const emit = defineEmits<{
  (e: 'confirm'): void
}>()
</script>

<style lang="scss" scoped>
.confirmation-modal {
  &.danger .modal-content {
    background-color: var(--color-danger-surface);
  }
  &.primary .modal-content {
    background-color: var(--color-primary-surface);
  }
  &.neutral .modal-content {
    background-color: var(--color-neutral-100);
  }
  .modal-header h5 {
    width: 100%;
    font-size: 2rem;
    font-weight: bold;
    text-align: center;
  }
  .modal-footer {
    display: flex;
    justify-content: space-between;
  }
}
</style>
