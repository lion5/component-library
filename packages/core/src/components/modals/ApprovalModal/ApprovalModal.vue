<template>
  <!--
    @slot place to define a trigger that opens the modal. Can be a button, icon, link, ...
      @binding {function} openModal triggers open
  -->
  <slot
    :open-modal="openModal"
    name="trigger"
  />
  <DismissibleModal
    v-model:modal-displayed="localModalDisplayed"
    class="approval-modal"
    v-bind="$attrs"
  >
    <div class="content">
      <h2>{{ title }}</h2>
      <!-- @slot place for why and/or what will be approved -->
      <slot name="content" />
      <BaseButton
        class="approve-button"
        @click="approve"
      >
        {{ buttonLabel }}
      </BaseButton>
    </div>
  </DismissibleModal>
</template>

<script lang="ts" setup>
import DismissibleModal from '@core/components/modals/DismissibleModal/DismissibleModal.vue'
import BaseButton from '@core/components/buttons/BaseButton/BaseButton.vue'

const props = withDefaults(
  defineProps<{
    /**
     * The title is displayed at the top of the modal
     */
    title: string
    /**
     * The button label of the approval button inside the modal
     */
    buttonLabel?: string
  }>(),
  {
    buttonLabel: 'Bestätigen'
  }
)

const emit = defineEmits<{
  /**
   * @deprecated Use the [approve] event instead
   *
   * Is triggered when approve button is clicked
   */
  (e: 'accept'): void
  /**
   * Is triggered when approve button is clicked
   */
  (e: 'approve'): void
}>()

/**
 * Open and closes modal (true => open, false => close)
 * @model
 */
const localModalDisplayed = defineModel<boolean>('modalDisplayed', { default: false })

const openModal = () => {
  localModalDisplayed.value = true
}

const approve = () => {
  emit('accept')
  emit('approve')
  localModalDisplayed.value = false
}
</script>
<style lang="scss" scoped>
.approval-modal .content {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  padding: var(--space-sm);

  .approve-button {
    align-self: start;
  }
}


h2 {
  margin: 0;
}
</style>
