<template>
  <div class="one-column">
    <slot />
  </div>
</template>
<style lang="scss" scoped>
.one-column {
  display: flex;
  flex-direction: column;
  gap: var(--space, 0);
}
</style>
