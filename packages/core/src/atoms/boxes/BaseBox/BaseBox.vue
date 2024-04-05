<template>
  <div class="base-box">
    <!-- @slot box content -->
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.base-box {
  --_box-background-color: var(
    --box-background-color,
    var(--color-neutral-200)
  );
  --_box-border-radius: var(--box-border-radius, var(--border-radius-300));
  --_box-padding: var(--box-padding, var(--space-sm));

  padding: var(--space-sm);
  border-radius: var(--_box-border-radius);
  background-color: var(--_box-background-color);
}
</style>
