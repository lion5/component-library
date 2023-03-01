<template>
  <div class="base-card">
    <slot />
  </div>
</template>
<style scoped>
.base-card {
  --local-padding: var(--card-padding, var(--space-sm));
  box-shadow: .05rem .05rem .4rem hsl(12deg, 20%, 30%);
  border-radius: .5rem;
  padding: var(--local-padding);
}
</style>
