<template>
  <button class="icon-button" v-bind="$attrs">
    <!-- @slot the icon that shall be displayed -->
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.icon-button {
  border: none;
  background: transparent;
  cursor: pointer;
}

.icon-button:hover {
  scale: 1.1;
}

.icon-button:disabled {
  cursor: unset;
  opacity: 0.5;
}
</style>
