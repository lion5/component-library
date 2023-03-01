<template>
  <div class="base-box">
    <slot />
  </div>
</template>
<style lang="scss" scoped>
.base-box {
  padding: var(--space-sm) var(--space-md);
  background-color: var(--box-background-color, var(--color-primary-surface));
  color: var(--box-color, var(--color-font-1));
}
</style>
