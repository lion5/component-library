<template>
  <div class="base-box">
    <!-- @slot box content -->
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.base-box {
  padding: var(--box-padding, var(--space-sm));
  border-radius: var(--box-border-radius, var(--border-radius-300));
  background-color: var(--box-background-color, var(--color-neutral-200));
  color: var(--box-color, var(--color-font-1));
}
</style>
