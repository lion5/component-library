<script setup lang="ts">
import { computed } from 'vue'
import ArrowRotateLoadingAnimation from '@core/components/icons/ArrowRotateLoadingAnimation.vue'
import { RouteLocationRaw, RouterLink } from 'vue-router'

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
     * Whether the button is disabled.
     */
    disabled?: boolean
    /**
     * Whether the button is busy.
     */
    busy?: boolean
    /**
     * Whether the button is filled.
     */
    filled?: boolean
    /**
     * The aria-label for the button, used for accessibility.
     */
    label: string
    /**
     * Whether to display the label below the icon.
     */
    displayLabel?: boolean
    /**
     * Defines button color variant
     *
     * @values primary, neutral, info, warning, danger, success
     */
    variant?: 'primary' | 'neutral' | 'info' | 'warning' | 'danger' | 'success'
  }>(),
  {
    disabled: false,
    busy: false,
    filled: false,
    displayLabel: false,
    variant: 'neutral'
  }
)

const disabled = computed(() => props.disabled || props.busy)
</script>

<template>
  <RouterLink
    v-if="to"
    :to="to"
    class="icon-button"
    :class="{ filled, [props.variant]: props.variant }"
    v-bind="$attrs"
    :aria-label="label"
  >
    <slot />
    <small
      v-if="displayLabel"
      class="label"
      >{{ label }}</small
    >
  </RouterLink>
  <a
    v-else-if="href"
    :href="href"
    class="icon-button"
    :class="{ filled, [props.variant]: props.variant }"
    v-bind="$attrs"
    :aria-label="label"
  >
    <slot />
    <small
      v-if="displayLabel"
      class="label"
      >{{ label }}</small
    >
  </a>
  <button
    v-else
    class="icon-button"
    :class="{ busy, filled, [props.variant]: props.variant }"
    type="button"
    v-bind="$attrs"
    :disabled="disabled || busy"
    :aria-label="label"
  >
    <ArrowRotateLoadingAnimation v-if="busy" />
    <!-- @slot the icon that shall be displayed -->
    <slot v-else />
    <small
      v-if="displayLabel"
      class="label"
      >{{ label }}</small
    >
  </button>
</template>
<style lang="scss" scoped>
.icon-button {
  // Base properties
  --_icon-button-color: var(--icon-button-color, var(--color-font-1));
  --_icon-button-bg-color: var(--icon-button-bg-color, transparent);
  --_icon-button-bg-hover-color: var(--icon-button-bg-hover-color, var(--color-neutral-300));
  --_icon-button-font-size: var(--icon-button-font-size, unset);
  --_icon-button-radius: var(--icon-button-radius, var(--border-radius-300));
  --_icon-button-padding: var(--icon-button-padding, var(--space-sm));

  // Variant-specific unfilled states
  &.primary {
    --_icon-button-color: var(--color-primary);
    --_icon-button-bg-hover-color: var(--color-primary-200);
  }

  &.neutral {
    --_icon-button-color: var(--color-font-1);
    --_icon-button-bg-hover-color: var(--color-neutral-300);
  }

  &.info {
    --_icon-button-color: var(--color-info);
    --_icon-button-bg-hover-color: var(--color-info-200);
  }

  &.warning {
    --_icon-button-color: var(--color-warning);
    --_icon-button-bg-hover-color: var(--color-warning-200);
  }

  &.danger {
    --_icon-button-color: var(--color-danger);
    --_icon-button-bg-hover-color: var(--color-danger-200);
  }

  &.success {
    --_icon-button-color: var(--color-success);
    --_icon-button-bg-hover-color: var(--color-success-200);
  }

  // Filled variant overrides
  &.filled {
    --_icon-button-color: var(--color-white);

    &.primary {
      --_icon-button-bg-color: var(--color-primary);
      --_icon-button-bg-hover-color: var(--color-primary-hover);
    }

    &.neutral {
      --_icon-button-bg-color: var(--color-font-1);
      --_icon-button-bg-hover-color: var(--color-neutral-hover);
    }

    &.info {
      --_icon-button-bg-color: var(--color-info);
      --_icon-button-bg-hover-color: var(--color-info-hover);
    }

    &.warning {
      --_icon-button-bg-color: var(--color-warning);
      --_icon-button-bg-hover-color: var(--color-warning-hover);
    }

    &.danger {
      --_icon-button-bg-color: var(--color-danger);
      --_icon-button-bg-hover-color: var(--color-danger-hover);
    }

    &.success {
      --_icon-button-bg-color: var(--color-success);
      --_icon-button-bg-hover-color: var(--color-success-hover);
    }
  }

  // Apply the properties
  display: grid;
  place-content: center;
  gap: var(--space-sm);
  border: none;
  border-radius: var(--_icon-button-radius);
  font-size: var(--_icon-button-font-size);
  line-height: 0.5;
  transition: transform 0.04s ease-in-out;
  padding: var(--_icon-button-padding);
  cursor: pointer;
  color: var(--_icon-button-color);
  background-color: var(--_icon-button-bg-color);
  text-decoration: none;
  text-align: center;

  &:hover:not(:disabled) {
    background-color: var(--_icon-button-bg-hover-color);
  }

  &:disabled {
    cursor: unset;
    opacity: 0.5;
  }

  label {
    display: block;
    font-size: var(--icon-button-label-font-size, var(--font-size-xs));
    color: var(--icon-button-color, var(--color-neutral-100));
  }
}
</style>
