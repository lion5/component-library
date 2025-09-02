<script setup lang="ts">
import BasePill from '@core/components/display/BasePill/BasePill.vue'
import IconButton from '@core/components/buttons/IconButton/IconButton.vue'
import ArrowRotateLoadingAnimation from '@core/components/icons/ArrowRotateLoadingAnimation.vue'
import BaseIcon from '@core/components/icons/BaseIcon.vue'

/**
 * A pill that displays a label and an icon.
 */
withDefaults(
  defineProps<{
    /**
     * The label of the pill.
     */
    label: string
    /**
     * Whether the pill is currently busy.
     */
    busy: boolean
    /**
     * The icon class of the pill
     */
    iconCls?: string
    /**
     * Aria-label for the delete button, used for accessibility.
     */
    deleteButtonLabel?: string
  }>(),
  {
    deleteButtonLabel: 'Löschen'
  }
)

const emit = defineEmits<{
  /**
   * Emits when the user wants to delete the pill.
   */
  (e: 'delete'): void
}>()

const onDelete = () => {
  emit('delete')
}
</script>

<template>
  <BasePill
    :label="label"
    :icon-start-cls="iconCls"
  >
    <template #postfix>
      <IconButton
        class="delete-button"
        type="button"
        :disabled="busy"
        :label="deleteButtonLabel"
        @click="onDelete"
      >
        <ArrowRotateLoadingAnimation v-if="busy" />
        <BaseIcon
          v-else
          class="delete-icon"
          icon="bi-x-lg"
        />
      </IconButton>
    </template>
  </BasePill>
</template>

<style scoped lang="scss">
:deep(.base-pill) {
  padding-inline-end: 0;
}
.delete-button {
  --icon-button-bg-hover-color: var(--color-danger-hover);
  --icon-button-radius: var(--border-radius-round);

  background-color: var(--color-primary-700);
  border-radius: var(--border-radius-round);
  color: var(--color-font-inverted);
  line-height: 1;
  aspect-ratio: 1;
  margin-inline-end: calc(-1 * var(--space-400));
  margin-block: calc(-1 * var(--space-300));
}
</style>
