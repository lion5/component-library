<template>
  <portal-input-group
    :id="id"
    v-model="iban"
    validation-rules="iban"
    type="text"
    v-bind="$attrs"
    :data-cy="dataCy"
    :upper-case="true"
    api-error-id="iban"
    :label="label"
  />
</template>
<script>
import { merchantMixin } from '@/merchant/mixins'
import PortalInputGroup from '@/base/components/input/InputGroup/PortalInputGroup.vue'

export default {
  name: 'PortalIbanInputGroup',
  components: { PortalInputGroup },
  mixins: [merchantMixin],
  props: {
    value: {
      type: [String, Number],
      required: false,
      default: null
    },
    id: {
      type: String,
      required: true
    },
    dataCy: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: 'IBAN'
    }
  },
  computed: {
    iban: {
      get () {
        return this.value ? this.value.match(/.{1,4}/g).join(' ') : this.value
      },
      set (iban) {
        const clearedIban = iban.replaceAll(/\s/g, '')
        this.$emit('input', clearedIban)
      }
    }
  }
}
</script>
