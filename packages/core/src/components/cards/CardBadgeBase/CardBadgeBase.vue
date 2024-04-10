<template>
  <div class="base-image-card-badge">
    <!-- @slot the badge content   -->
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.base-image-card-badge {
  justify-self: end;
  align-self: end;
  display: flex;
  gap: var(--space-sm);
  align-items: center;
  padding: 0.25rem 1rem;
  border-start-start-radius: var(--border-radius-md);
  color: var(--image-card-badge-color, var(--color-success));
  background-color: var(
    --image-card-badge-background-color,
    var(--color-surface-2)
  );
}
</style>
