<template>
  <div class="item-card">
    <slot />
  </div>
</template>
<style scoped>
.item-card {
  box-shadow: .125rem .125rem .5rem hsl(0, 0%, 75%);
  border-radius: var(--border-radius-md);
}
</style>
