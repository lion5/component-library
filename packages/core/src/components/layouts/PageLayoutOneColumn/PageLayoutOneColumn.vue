<template>
  <LayoutOneColumn class="page-single-column">
    <slot />
  </LayoutOneColumn>
</template>

<script lang="ts" setup>
import LayoutOneColumn from '@core/components/layouts/LayoutOneColumn/LayoutOneColumn.vue'
</script>

<style lang="scss" scoped>
.page-single-column {
  max-width: 1100px;
  margin-inline: auto;
  padding-inline: var(--space-md);
}
</style>
