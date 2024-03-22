<template>
  <div class="item-card">
    <slot />
  </div>
</template>
<style scoped>
.item-card {
  box-shadow: 0.125rem 0.125rem 0.5rem hsl(0, 0%, 75%);
  border-radius: var(--border-radius-md);
}
</style>
