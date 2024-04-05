<template>
  <div class="info-headline">
    <h1>{{ title }}</h1>
    <InformationButton v-if="infoModalTitle" :title="infoModalTitle">
      <slot name="information" />
    </InformationButton>
  </div>
</template>

<script lang="ts" setup>
import InformationButton from '@core/atoms/buttons/InformationButton/InformationButton.vue'

defineProps<{
  /**
   * The headline text
   */
  title: string
  /**
   * The modals headline text
   */
  infoModalTitle: string
}>()
</script>

<style scoped>
.info-headline {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: var(--font-size-h1);
}

.info-headline > * {
  margin-bottom: 0;
}
</style>
