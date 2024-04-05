<template>
  <!--  TODO: remove Boostrap here. Do not miss the :to router prop feature-->
  <button
    :class="['portal-button', oldStyle ? 'old-button-style' : '', localVariant]"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <IconLoading
      v-if="loading"
      :class="{ 'loading-icon': true, animate: loading }"
      data-cy="button-loading"
    />
    <slot v-else name="icon-left" />
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import IconLoading from '@core/icons/IconLoading.vue'

export default defineComponent({
  components: {
    IconLoading
  },
  inheritAttrs: false,
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    /**
     * Used to match the new component style with the old portal design (Merchant Portal Space not Admin Portal Space)
     */
    oldStyle: {
      type: Boolean,
      default: false
    },
    /**
     * Defines button color variant
     *
     * @values primary, secondary, info, warning, danger, success and success-without-checkmark
     *
     * If you do not want that the check icon is displayed on success use the 'success-without-checkmark' variant
     */
    variant: {
      type: String,
      default: 'primary'
    }
  },
  computed: {
    success() {
      return this.variant === 'success'
    },
    localVariant() {
      if (this.variant === 'success-without-checkmark') {
        return 'success'
      }
      return this.variant
    }
  }
})
</script>

<style lang="scss" scoped>
.portal-button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--space-sm);
  max-width: 250px;
  padding: var(--space-sm) var(--space-md);
  border-radius: var(--border-radius-700);
  line-height: 1;
  border: none;
  cursor: pointer;

  --color-button: var(--color-font-inverted);
  --color-button-background: var(--color-primary);
  --color-button-background-hover: var(--color-primary-hover);

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

  &.primary,
  &.success,
  &.warning,
  &.danger {
    background-color: var(--color-button-background);
    border-color: var(--color-button-background);
    color: var(--color-button);

    &:not([disabled]):hover,
    &:not([disabled]):active {
      background-color: var(--color-button-background-hover) !important;
      border-color: var(--color-button-background-hover) !important;
      box-shadow: inset 0.1rem 0.3rem 0.4rem rgba(0, 0, 0, 0.6) !important;
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

.old-button-style {
  border-radius: 0;
}
</style>
