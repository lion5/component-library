<template>
  <div class="base-card">
    <slot />
  </div>
</template>
<style scoped>
.base-card {
  --local-padding: var(--card-padding, var(--space-sm));
  box-shadow: var(--card-shadow, var(--shadow-300));
  border-radius: var(--card-border-radius, var(--border-radius-300));
  padding: var(--local-padding);
}
</style>
