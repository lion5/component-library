<template>
  <div class="portal-date-picker-wrapper">
    <div class="portal-date-picker">
      <label :for="id">{{ label }}</label>
      <b-form-datepicker
        :id="id"
        v-model="attribute"
        v-bind="$attrs"
        placeholder="Kein Datum ausgewählt"
        :data-cy="dataCy"
        :value-as-date="true"
      />
      <span
        v-if="postfix"
        class="postfix"
      >{{ postfix }}</span>
    </div>
    <small
      v-if="error"
      class="error"
    >{{ error | errorKeyToText }}</small>
    <small
      v-if="infoText"
      class="info"
    >{{ infoText }}</small>
  </div>
</template>
<script>
import { merchantMixin } from '@/merchant/mixins'
import { BFormDatepicker } from 'bootstrap-vue'

export default {
  name: 'PortalDatePickerInputGroup',
  components: {
    BFormDatepicker
  },
  mixins: [merchantMixin],
  props: {
    value: {
      type: [Date],
      required: false,
      default: null
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    error: {
      type: String,
      default: ''
    },
    infoText: {
      type: String,
      default: ''
    },
    postfix: {
      type: String,
      default: ''
    },
    dataCy: {
      type: String,
      default: ''
    }
  },
  computed: {
    attribute: {
      get () {
        return this.value
      },
      set (attribute) {
        this.$emit('input', attribute)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@use "@/assets/styles/_variables.scss" as variables;

.portal-date-picker {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  label {
    font-size: 1.2rem;
    margin: 0;
  }
}

.info, .error {
  display: block;
}

input.failed ~ .info {
  color: var(--color-danger);
}

.error {
  color: var(--color-danger);
}
</style>
