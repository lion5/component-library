<template>
  <div class="toggle-container">
    <label class="toggle" :for="name">
      <input
        type="checkbox"
        :name="name"
        :id="name"
        v-bind="$attrs"
        :value="props.modelValue"
        :checked="props.modelValue"
        @change="emitValue"
      />
      <span class="slider round"></span>
      <span class="text-after">{{ label }}</span>
    </label>
    <slot name="after">
      <InformationButton v-if="infoTitle && infoBody" :title="infoTitle">
        {{ infoBody }}
      </InformationButton>
    </slot>
  </div>
</template>

<script setup lang="ts">
import InformationButton from '@/atoms/buttons/InformationButton/InformationButton.vue'

defineOptions({ inheritAttrs: false })

const props = withDefaults(
  defineProps<{
    /**
     * @model
     * Whether the slider is toggled or not. Changes will be emitted as 'update:modelValue'.
     */
    modelValue?: boolean
    /**
     * Used to identify this field via the HTML input.
     */
    name: string
    /**
     * The text to be displayed after the slider toggle.
     */
    label: string
    /**
     * Unique identifier of the input element itself, used for testing (e.g., with Cypress).
     */
    dataCy?: string
    /**
     * The text to be displayed in an information popup (title), triggered by an info button after the label.
     */
    infoTitle?: string
    /**
     * The text to be displayed in an information popup (body), triggered by an info button after the label.
     */
    infoBody?: string
  }>(),
  {
    modelValue: false
  }
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void
}>()

const emitValue = (e: Event) => {
  const checked = (e.target as HTMLInputElement).checked
  emit('update:modelValue', checked)
}
</script>
<style scoped lang="scss">
.toggle-container {
  display: flex;
  gap: var(--space-xs);

  :slotted(:deep(.information-button)) {
    font-size: var(--font-size-2);
    color: var(--color-neutral-600);
  }
  :slotted(:deep(.information-modal)) {
    h2 {
      font-size: var(--font-size-3);
      font-weight: var(--font-weight-normal);
      margin-bottom: var(--space-sm);
    }

    padding: var(--space-sm);
  }
}

.toggle {
  --_toggle-width: 58px;

  position: relative;
  display: flex;
  align-items: center;
  height: var(--font-size-5);
}

.toggle input {
  display: none;
}

.slider {
  width: var(--_toggle-width);

  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-neutral-400);
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: '';
  height: calc(var(--font-size-5) - var(--space-sm));
  width: calc(var(--font-size-5) - var(--space-sm));
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: var(--color-primary);
}

input:focus + .slider {
  box-shadow: 0 0 1px var(--color-primary);
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

.slider.round {
  border-radius: var(--border-radius-700);
}

.slider.round:before {
  border-radius: 50%;
}

.text-after {
  padding-inline-start: calc(var(--_toggle-width) + var(--space-sm));
  white-space: nowrap;
}
</style>
