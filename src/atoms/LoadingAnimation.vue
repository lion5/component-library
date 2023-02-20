<template>
  <div class="loading-animation">
    <IconLogo
        class="spinner"
        type="grow"
        label="Spinning"
    />
    <p v-if="msg">
      {{ msg }}
    </p>
  </div>
</template>

<script lang="ts" setup>
import IconLogo from '@/components/icons/IconLogo.vue'

defineProps<{msg?: string }>()
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
  filter: hue-rotate(0deg);
  animation: rotateHue 2.5s infinite linear;
}

@keyframes rotateHue {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}
</style>
