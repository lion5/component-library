<template>
  <div class="loading-animation">
    <IconLoading
      :class="{
        spinner: true,
        grow: type === 'grow',
        'rotate-hue': type === 'hueRotate'
      }"
      label="Spinning"
    />
    <p v-if="msg">
      {{ msg }}
    </p>
  </div>
</template>
<script lang="ts" setup>
import IconLoading from '@core/components/icons/IconLoading.vue'

type AnimationType = 'grow' | 'hueRotate'

withDefaults(
  defineProps<{
    /**
     * Additional loading information. Displayed below the loading animation.
     */
    msg?: string
    /**
     * The used animation. Defaults to grow animation.
     * @values grow, hueRotate
     */
    type?: AnimationType
  }>(),
  {
    type: 'grow'
  }
)
</script>
<style scoped>
.loading-animation {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.spinner {
  width: var(--size, 10rem);
  height: var(--size, 10rem);
  font-size: var(--size, 10rem);
  color: var(--color, var(--color-primary));
  filter: hue-rotate(0deg);
  opacity: 1;
}

.rotate-hue {
  animation: rotateHue 2.5s infinite linear;
}

.grow {
  animation: grow 0.8s infinite linear;
}

@keyframes rotateHue {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

@keyframes grow {
  0% {
    scale: 0.3;
    opacity: 1;
  }
  80% {
    opacity: 0.3;
  }
  100% {
    scale: 1;
    opacity: 0.1;
  }
}
</style>
