<template>
  <div class="base-page-layout">
    <!-- @slot the headline of the page -->
    <slot name="headline" />
    <!-- @slot the page content -->
    <slot name="content" />
  </div>
</template>
<style lang="scss" scoped>
.base-page-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--layout-space, var(--space-md));
  padding-inline: var(--layout-space-inline, var(--space-sm));
  padding-top: var(--layout-space-block-start, var(--space-sm));
  padding-bottom: var(--layout-space-block-end, var(--space-lg));

  & > * {
    max-width: 60ch;
  }
}
</style>
