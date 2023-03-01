<template>
  <div class="portal-radio-button-group">
    <input
      :id="id"
      v-model="input"
      type="radio"
      :value="value"
      :checked="checked"
    >
    <label :for="id">
      <span :class="{title: labelDescription}">{{ label }}</span>
      <span
        v-if="labelDescription"
        class="description"
      >{{ labelDescription }}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: 'PortalRadioButtonGroup',
  model: {
    prop: 'modelValue',
    event: 'input'
  },
  props: {
    value: {
      type: [Object, String, Number],
      required: true
    },
    modelValue: {
      type: [Object, String, Number],
      default: undefined
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    labelDescription: {
      type: String,
      default: undefined
    },
    checked: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    input: {
      get () {
        return this.modelValue
      },
      set (newValue) {
        this.$emit('input', newValue)
      }
    }
  }
}
</script>

<style lang="scss">
.portal-radio-button-group {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: .5rem;

  input {
    vertical-align: top;
  }

  label {
    display: flex;
    flex-direction: column;
    line-height: 1;
    gap: .5rem;
  }

  .title {
    font-weight: bold;
  }

}

</style>
