<script setup lang="ts">
import { RouteLocationRaw, RouterLink } from 'vue-router'
import IconLoading from '@core/components/icons/IconLoading.vue'
import { ButtonLevel, ButtonColor } from '@core/components/navigational/BaseButton/buttonVariants'

const props = withDefaults(
  defineProps<{
    /**
     * If set the button will be rendered as a link
     */
    href?: string
    /**
     * If set the button will be rendered as a router-link
     */
    to?: RouteLocationRaw
    /**
     * If true the button will be rendered as a label. This is useful for file inputs.
     */
    asLabel?: boolean
  }>(),
  {
    asLabel: false
  }
)
</script>

<template>
  <RouterLink
    v-if="to"
    :to="to"
  >
    <slot />
  </RouterLink>
  <a
    v-else-if="href"
    :href="href"
  >
    <slot />
  </a>
  <label
    v-else-if="asLabel"
  >
    <slot />
  </label>
  <button
    v-else
    :type="type"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
</style>
