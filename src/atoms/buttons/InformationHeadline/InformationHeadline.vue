<template>
  <div class="info-headline">
    <h1>{{ title }}</h1>
    <InformationButton
      v-if="infoModalTitle"
      :title="infoModalTitle"
    >
      <slot name="information" />
    </InformationButton>
  </div>
</template>

<script lang="ts" setup>

import InformationButton from '@/components/InformationButton/InformationButton.vue'

defineProps<{ title: string, infoModalTitle: string }>()
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
