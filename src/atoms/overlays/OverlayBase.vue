<template>
  <div class="base-overlay">
    <div class="background" />
    <div class="content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.base-overlay {
  display: grid;
  width: 100%;
  height: 100%;

  & > * {
    grid-column: 1/2;
    grid-row: 1/2;
  }

  .background {
    background-color: var(--overlay-background-color, var(--color-surface-1));
    opacity: .8;
  }

  & > .content {
    isolation: isolate;
    display: grid;
    place-content: center;
    place-items: center;
    color: var(--overlay-color, var(--color-primary));
    font-size: var(--overlay-font-size, var(--font-size-4));
  }
}
</style>
