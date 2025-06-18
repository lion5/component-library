<script setup lang="ts">
import BaseCard from '@core/components/cards/BaseCard/BaseCard.vue'
import BaseIcon from '@core/components/icons/BaseIcon.vue'
import IconButton from '@core/components/buttons/IconButton/IconButton.vue'

/**
 * Whether the card is in edit mode.
 */
const editMode = defineModel<boolean>({ required: true })

const props = defineProps({
  /**
   * The title of the card (the entity name).
   */
  title: {
    type: String,
    required: true
  },
  /**
   * If true, editing is disabled (the edit pencil icon won't show).
   */
  readOnly: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <BaseCard class="editable-entity-card">
    <h2>{{ props.title }}</h2>
    <div class="top-end-icon">
      <IconButton
        v-if="!editMode && !props.readOnly"
        class="edit-button"
        @click="editMode = true"
        aria-label="Schaltfläche Bearbeiten"
      >
        <BaseIcon icon="bi-pencil" />
      </IconButton>
      <IconButton
        v-if="editMode"
        class="cancel-button"
        @click="editMode = false"
        aria-label="Schaltfläche Abbrechen"
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
