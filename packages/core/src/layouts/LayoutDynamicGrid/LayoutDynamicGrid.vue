<template>
  <div class="grid">
    <slot />
  </div>
</template>
<style lang="scss" scoped>
@use '@core/assets/style/breakpoints.scss' as grid;

.grid {
  display: grid;
  grid-template-columns: 100%;
  gap: var(--space-md);
}

@include grid.media-breakpoint-up(sm) {
  .grid {
    grid-template-columns: repeat(
      var(--grid-repeat-strategy, auto-fit),
      minmax(var(--grid-min-width, 200px), 1fr)
    );
  }
}
</style>
