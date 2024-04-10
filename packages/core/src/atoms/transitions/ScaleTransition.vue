<template>
  <Transition name="scale">
    <slot />
  </Transition>
</template>

<style lang="scss" scoped>
@use 'sass:math';

$animation-speed: 0.5s;
$opacity-animation-duration: $animation-speed * 0.1;

.scale-enter-active,
.scale-leave-active {
  transition:
    opacity $opacity-animation-duration ease-in-out,
    max-height $animation-speed linear;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  max-height: 1px;
  overflow: hidden;
}

.scale-enter-to,
.scale-leave-from {
  opacity: 1;
  max-height: 2000px;
  overflow: hidden;
}
</style>
