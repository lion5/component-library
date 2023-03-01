<template>
  <transition name="scale">
    <slot />
  </transition>
</template>

<style lang="scss" scoped>
@use "sass:math";

$animation-speed: 1s;
$opacity-animation-duration: $animation-speed * .75;

.scale-enter-active, .scale-leave-active {
  transition: opacity $opacity-animation-duration ease-in-out,
  max-height $animation-speed linear;
}

.scale-enter,
.scale-leave-to {
  opacity: 0;
  max-height: 1px;
  overflow: hidden;
}

.scale-enter-to,
.scale-leave {
  opacity: 1;
  max-height: 2000px;
}

</style>
