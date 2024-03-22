<template>
  <div class="stack">
    <slot />
  </div>
</template>

<!--<script>-->
<!--/**-->
<!-- * Use this Layout to stack multiple elements on top of each other.-->
<!-- */-->
<!--</script>-->

<style lang="scss" scoped>
.stack {
  display: grid;

  & > :deep(*) {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }
}
</style>
