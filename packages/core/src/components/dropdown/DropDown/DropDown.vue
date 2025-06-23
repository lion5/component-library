<template>
  <div class="drop-down">
    <IconButton ref="triggerButton" class="trigger" @click="onClick" :label="dropdownButtonLabel">
      <slot name="dropDownIcon">
        <IconThreeDotsMenu />
      </slot>
    </IconButton>
    <div class="dropdown-content">
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
const onClick = () => {
  // Fix to be able to set focus even if the icon is clicked. Otherwise, the dropdown does not appear
  triggerButton.value.$el.focus()
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

  .trigger:focus ~ .dropdown-content,
  &:focus-within .dropdown-content,
  .dropdown-content:focus-within,
  .dropdown-content:active {
    display: flex;
  }
}
</style>
