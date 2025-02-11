<template>
  <BaseCard class="entity-card">
    <!-- @slot the cards title section. Overwrites the title set via the title prop -->
    <slot name="title">
      <h2 v-if="title" data-cy="entity-card-title">
        {{ title }}
      </h2>
    </slot>
    <EntityWrapper
      :busy="busy"
      :busy-msg="busyMsg"
      :error="error"
      :show-content-on-error="showContentOnError"
    >
      <!-- @slot the cards content -->
      <slot v-if="!busy && (showContentOnError || !error)" />
    </EntityWrapper>
  </BaseCard>
</template>

<script lang="ts" setup>
import EntityWrapper from '@core/components/utils/EntityWrapper/EntityWrapper.vue'
import BaseCard from '@core/components/cards/BaseCard/BaseCard.vue'

withDefaults(
  defineProps<{
    /**
     * The cards title (h2)
     */
    title?: string
    /**
     * Sets the cards busy state.
     * If card is in busy state the entity section will not be displayed.
     */
    busy?: boolean
    /**
     * Message that is displayed when card is in busy state
     */
    busyMsg?: string
    /**
     * Error that is displayed
     * if error is set the entity section will not be displayed as long as the <code>showContentOnError</code> is false
     */
    error?: Error
    /**
     * Show content on error or not
     */
    showContentOnError?: boolean
  }>(),
  {
    title: undefined,
    busy: false,
    busyMsg: undefined,
    error: undefined,
    showContentOnError: false
  }
)
</script>

<style lang="scss">
</style>
