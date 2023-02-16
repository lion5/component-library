<template>
  <button
    class="icon-button"
    v-bind="$attrs"
  >
    <!-- @slot the icon that shall be displayed -->
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.icon-button {
  border: none;
  background: transparent;
}
</style>
