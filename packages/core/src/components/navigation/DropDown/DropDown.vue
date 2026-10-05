<template>
  <div
    class="drop-down"
    :class="{ 'is-open': isOpen }"
    @focusout="onFocusOut"
  >
    <IconButton
      ref="triggerButton"
      class="trigger"
      @click="onTriggerClick"
      @focus="open"
      :label="dropdownButtonLabel"
    >
      <slot name="dropDownIcon">
        <IconThreeDotsMenu />
      </slot>
    </IconButton>
    <div
      class="dropdown-content"
      @click.capture="close"
    >
      <slot name="dropDownContent" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import IconButton from '@core/components/buttons/IconButton/IconButton.vue'
import IconThreeDotsMenu from '@core/components/icons/IconThreeDotsMenu.vue'

withDefaults(
  defineProps<{
    /**
     * The label for the dropdown button, used for accessibility.
     */
    dropdownButtonLabel?: string
  }>(),
  {
    dropdownButtonLabel: 'Kontextmenü öffnen'
  }
)

const triggerButton = ref()
const isOpen = ref(false)

const open = () => {
  isOpen.value = true
}

const close = () => {
  isOpen.value = false
}

const onTriggerClick = () => {
  // Fix to be able to set focus even if the icon is clicked. Otherwise, the dropdown does not appear
  triggerButton.value.$el.focus()
}

// Closes the dropdown once focus leaves it entirely, e.g. via click outside.
const onFocusOut = (event: FocusEvent) => {
  const root = event.currentTarget as HTMLElement
  const relatedTarget = event.relatedTarget as Node | null

  if (!relatedTarget || !root.contains(relatedTarget)) {
    close()
  }
}
</script>

<style lang="scss" scoped>
.drop-down {
  position: relative;

  .trigger {
    cursor: pointer;
    font-size: var(--font-size-3);
    line-height: 1;

    &:focus-within {
      outline-color: var(--color-primary);
    }
  }

  .dropdown-content {
    position: absolute;
    right: var(--anchor-right, 0);
    top: var(--anchor-top, calc(100% + var(--space-300)));
    bottom: var(--anchor-bottom, unset);
    left: var(--anchor-left, unset);
    width: max-content;
    display: none;
    flex-direction: column;
    box-shadow: var(--shadow-600);
    border-radius: var(--border-radius-300);
    background-color: var(--color-surface-1);
    overflow: hidden;
    z-index: 1;

    &:focus-within {
      border: 2px solid var(--color-primary);
    }
  }

  &.is-open .dropdown-content {
    display: flex;
  }
}
</style>
