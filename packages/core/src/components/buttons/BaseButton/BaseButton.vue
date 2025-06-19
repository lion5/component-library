<script setup lang="ts">
import { computed } from 'vue'
import { RouteLocationRaw, RouterLink } from 'vue-router'
import IconLoading from '@core/components/icons/IconLoading.vue'

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
    disabled?: boolean
    loading?: boolean
    /**
     * Defines button color variant
     *
     * @values primary, secondary, info, warning, danger, success and success-without-checkmark
     *
     * If you do not want that the check icon is displayed on success use the 'success-without-checkmark' variant
     */
    variant?: string
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    disabled: false,
    loading: false,
    variant: 'primary',
    type: 'button'
  }
)

const localVariant = computed(() => {
  if (props.variant === 'success-without-checkmark') {
    return 'success'
  }
  return props.variant
})
</script>

<template>
  <RouterLink
    v-if="to"
    :to="to"
    :class="['base-button', localVariant]"
    v-bind="$attrs"
  >
    <slot name="icon-left" />
    <slot />
  </RouterLink>
  <a
    v-else-if="href"
    :href="href"
    :class="['base-button', localVariant]"
    v-bind="$attrs"
  >
    <slot />
  </a>
  <button
    v-else
    :type="type"
    :class="['base-button', localVariant]"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <IconLoading
      v-if="loading"
      :class="{ 'loading-icon': true, animate: loading }"
      data-cy="button-loading"
    />
    <slot
      v-else
      name="icon-left"
    />
    <span class="content">
      <slot />
    </span>
  </button>
</template>

<style scoped lang="scss">
.base-button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--border-radius-300);
  line-height: 100%;
  border: none;
  cursor: pointer;
  text-decoration: none;

  --color-button: var(--color-font-inverted);
  --color-button-background: var(--color-primary);
  --color-button-background-hover: var(--color-primary-hover);

  &.secondary {
    --color-button-background: var(--color-neutral-700);
    --color-button-background-hover: var(--color-neutral-800);
  }

  &.success {
    --color-button-background: var(--color-success-800);
    --color-button-background-hover: var(--color-success-900);
  }

  &.warning {
    --color-button-background: var(--color-warning);
    --color-button-background-hover: var(--color-warning-hover);
  }

  &.danger {
    --color-button-background: var(--color-danger);
    --color-button-background-hover: var(--color-danger-hover);
  }

  &.neutral {
    --color-button: var(--color-font);
    --color-button-background: var(--color-neutral-300);
    --color-button-background-hover: var(--color-neutral-500);
  }

  &.outline-primary {
    --color-button: var(--color-primary);
    --color-button-background: var(--color-white);
    --color-button-background-hover: var(--color-primary);
    --color-button-hover: var(--color-white);
    --color-button-outline: var(--color-primary);
  }

  &.primary,
  &.secondary,
  &.success,
  &.warning,
  &.danger,
  &.outline-primary,
  &.neutral {
    background-color: var(--color-button-background);
    border-color: var(--color-button-background);
    color: var(--color-button);

    &:not([disabled]):hover,
    &:not([disabled]):active {
      background-color: var(--color-button-background-hover) !important;
      border-color: var(--color-button-background-hover) !important;
      box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.4) !important;
    }

    &:focus,
    &:focus-within {
      outline: 1px solid var(--color-button-background-hover) !important;
    }

    .loading-icon {
      color: var(--color-button);

      &.animate {
        animation: scale 0.7s ease-in infinite;
      }
    }
  }

  &.outline-primary {
    outline: 1px solid var(--color-button-outline) !important;
    background-color: transparent;

    &:not([disabled]):hover,
    &:not([disabled]):active {
      border-color: var(--color-button-outline) !important;
      color: var(--color-button-hover);
    }
  }

  &[disabled] {
    opacity: 0.6;
    cursor: default;
  }
}

@keyframes scale {
  0% {
    scale: 0.3;
    opacity: 1;
  }
  100% {
    scale: 1.2;
    opacity: 0.1;
  }
}

.btn {
  box-shadow: none !important;

  &:disabled:hover {
    box-shadow: none !important;
  }
}

.content {
  display: inline;
}

a {
  text-decoration: none;
}
</style>
