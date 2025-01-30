<script setup lang="ts">
import BaseCard from '@core/components/cards/BaseCard/BaseCard.vue'
import BaseIcon from '@core/components/icons/BaseIcon.vue'
import IconButton from '@core/components/buttons/IconButton/IconButton.vue'

/**
 * Whether the card is in edit mode.
 */
const editMode = defineModel<boolean>({ required: true })

defineProps<{
  /**
   * The title of the card (the entity name).
   */
  title: string
}>()


</script>

<template>
  <BaseCard class="editable-entity-card">
    <h2>{{ title }}</h2>
    <div class="top-end-icon">
      <IconButton
        v-if="!editMode"
        class="edit-button"
        @click="editMode = true"
      >
        <BaseIcon icon="bi-pencil" />
      </IconButton>
      <IconButton
        v-if="editMode"
        class="cancel-button"
        @click="editMode = false"
      >
        <BaseIcon icon="bi-x-lg" />
      </IconButton>
    </div>
    <div class="card-content">
      <slot
        v-if="!editMode"
        name="info-content"
      />
      <slot
        v-else
        name="form-content"
      />
    </div>
  </BaseCard>
</template>

<style scoped lang="scss">
.editable-entity-card {
  display: grid;
  grid-template-columns: 1fr min-content;
  --card-padding: var(--space-400) var(--space-500);
  --card-shadow: var(--shadow-500);

  h2 {
    margin: 0;
  }

  .top-end-icon {
    place-self: center;
  }

  .card-content {
    grid-column: span 2;
  }
}
</style>
