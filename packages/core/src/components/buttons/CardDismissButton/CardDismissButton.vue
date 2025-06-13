<template>
  <!--
    triggered on button click
    @event remove
  -->
  <button
    class="delete-badge"
    type="button"
    aria-label="Delete Button"
    @click.capture="$emit('dismiss')"
  >
    <slot name="icon">
      <IconX />
    </slot>
  </button>
</template>
<script lang="ts">
/**
 * This is a card dismiss button to close or delete a card. It places automatically to the upper right corner when it is placed inside a grid container.
 */
import { defineComponent } from 'vue'
import IconX from '@core/components/icons/IconX.vue'

export default defineComponent({
  name: 'CardDismissButton',
  components: {
    IconX
  },
  emits: ['dismiss']
})
</script>
<style lang="scss" scoped>
.delete-badge {
  justify-self: end;
  align-self: start;

  display: grid;
  place-content: center;

  width: 2rem;
  height: 2rem;
  padding: 0;
  margin: 0;
  border-color: transparent;
  border-radius: 50%;
  font-size: var(--font-size-3);
  cursor: pointer;
  color: var(--color-font);
  line-height: 1;

  &:hover {
    mix-blend-mode: unset;
    background-color: var(--dismiss-button-background-color, var(--color-danger));
    color: var(--dismiss-button-color, var(--light));
  }
}
</style>
