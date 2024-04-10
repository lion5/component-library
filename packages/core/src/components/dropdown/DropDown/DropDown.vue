<template>
  <div class="drop-down">
    <IconButton class="trigger" ref="triggerButton" @click="onClick">
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
import IconThreeDotsMenu from '@core/icons/IconThreeDotsMenu.vue'

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
    right: 0;
    top: 0;
    margin-right: var(--font-size-5);
    width: max-content;
    display: none;
    flex-direction: column;
    box-shadow: var(--shadow-600);
    border-radius: var(--border-radius-300);
    background-color: var(--color-surface-1);
    overflow: hidden;

    &:focus-within {
      border: 2px solid var(--color-primary);
    }
  }

  .trigger:focus ~ .dropdown-content,
  &:focus-within .dropdown-content,
  .dropdown-content:focus-within {
    display: flex;
  }
}
</style>
