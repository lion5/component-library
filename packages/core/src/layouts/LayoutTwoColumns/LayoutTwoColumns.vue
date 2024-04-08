<template>
  <div class="two-columns">
    <slot />
  </div>
</template>
<style lang="scss" scoped>
@use '@core/assets/style/breakpoints.scss' as grid;

.two-columns {
  display: grid;
  grid-template-rows: max-content;
  grid-template-columns: 100%;
  gap: var(--space, var(--space-md));
}

@include grid.media-breakpoint-up(sm) {
  .two-columns {
    grid-template-columns: var(--first-column-width, 50%) auto;
  }
}
</style>
