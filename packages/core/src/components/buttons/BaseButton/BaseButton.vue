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
    /**
     * Whether the button is busy, e.g. when a request is in progress.
     *
     * @deprecated Use `busy` instead.
     */
    loading?: boolean
    /**
     * Whether the button is busy, e.g. when a request is in progress.
     */
    busy?: boolean
    /**
     * Defines button color variant
     *
     * @values primary, secondary, info, warning, danger, success and success-without-checkmark
     *
     * If you do not want that the check icon is displayed on success use the 'success-without-checkmark' variant
     */
    variant?:
      | 'primary'
      | 'secondary'
      | 'info'
      | 'warning'
      | 'danger'
      | 'success'
      | 'success-without-checkmark'
      | 'outline-primary'
      | 'outline-neutral'
      | 'outline-success'
      | 'outline-warning'
      | 'outline-danger'
      | 'neutral'
    type?: 'button' | 'submit' | 'reset'
    /**
     * If true the button will be rendered as a label. This is useful for file inputs.
     */
    asLabel?: boolean
  }>(),
  {
    disabled: false,
    loading: false,
    busy: false,
    variant: 'primary',
    type: 'button',
    asLabel: false
  }
)

const localVariant = computed(() => {
  if (props.variant === 'success-without-checkmark') {
    return 'success'
  }
  return props.variant
})

const mergedBusy = computed(() => {
  return props.loading || props.busy
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
  <label
    v-else-if="asLabel"
    v-bind="$attrs"
    :class="['base-button', localVariant, { disabled: disabled || mergedBusy }]"
  >
    <slot name="icon-left" />
    <slot />
  </label>
  <button
    v-else
    :type="type"
    :class="['base-button', localVariant]"
    :disabled="disabled || mergedBusy"
    v-bind="$attrs"
  >
    <IconLoading
      v-if="mergedBusy"
      :class="{ 'loading-icon': true, animate: mergedBusy }"
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
    --color-button-background: var(--color-neutral);
    --color-button-background-hover: var(--color-neutral-hover);
  }

  &.success {
    --color-button-background: var(--color-success);
    --color-button-background-hover: var(--color-success-hover);
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
    --color-button-background: var(--color-neutral);
    --color-button-background-hover: var(--color-neutral);
  }

  &.outline-primary {
    --color-button: var(--color-primary);
    --color-button-background: var(--color-white);
    --color-button-background-hover: var(--color-primary);
    --color-button-hover: var(--color-white);
    --color-button-outline: var(--color-primary);
  }

  &.outline-neutral {
    --color-button: var(--color-neutral);
    --color-button-background: var(--color-white);
    --color-button-background-hover: var(--color-neutral);
    --color-button-hover: var(--color-white);
    --color-button-outline: var(--color-neutral);
  }

  &.outline-success {
    --color-button: var(--color-success);
    --color-button-background: var(--color-white);
    --color-button-background-hover: var(--color-success);
    --color-button-hover: var(--color-white);
    --color-button-outline: var(--color-success);
  }

  &.outline-warning {
    --color-button: var(--color-warning);
    --color-button-background: var(--color-white);
    --color-button-background-hover: var(--color-warning);
    --color-button-hover: var(--color-white);
    --color-button-outline: var(--color-warning);
  }

  &.outline-danger {
    --color-button: var(--color-danger);
    --color-button-background: var(--color-white);
    --color-button-background-hover: var(--color-danger);
    --color-button-hover: var(--color-white);
    --color-button-outline: var(--color-danger);
  }

  &.primary,
  &.secondary,
  &.success,
  &.warning,
  &.danger,
  &.neutral,
  &.outline-primary,
  &.outline-neutral,
  &.outline-success,
  &.outline-warning,
  &.outline-danger {
    background-color: var(--color-button-background);
    border-color: var(--color-button-background);
    color: var(--color-button);

    &:not([disabled], .disabled):hover,
    &:not([disabled], .disabled):active {
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

  &.outline-primary,
  &.outline-neutral,
  &.outline-success,
  &.outline-warning,
  &.outline-danger {
    outline: 1px solid var(--color-button-outline) !important;
    background-color: transparent;

    &:not([disabled], .disabled):hover,
    &:not([disabled], .disabled):active {
      border-color: var(--color-button-outline) !important;
      color: var(--color-button-hover);
    }
  }

  &[disabled],
  &.disabled {
    opacity: 0.6;
    cursor: not-allowed;
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
