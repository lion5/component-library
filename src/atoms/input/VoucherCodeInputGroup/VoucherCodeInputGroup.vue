<template>
  <div class="voucher-input-group">
    <VoucherCodeTextInput
      :default-value="defaultVoucherCode"
      validation-rules="required"
      @input="emitInput"
      @input-finished="emitInputFinished"
    />
    <span>oder</span>
    <VoucherScanButton
      class="qr-scan-button"
      @input-finished="emitVoucherScanInput"
    />
  </div>
</template>
<script lang="ts" setup>
import VoucherScanButton from '@/voucher/components/VoucherScanButton/VoucherScanButton.vue'
import VoucherCodeTextInput from '@/voucher/components/voucher_scan/VoucherCodeTextInput/VoucherCodeTextInput.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router/composables'

const emit = defineEmits<{
  /**
   * emits the current entered voucher code part
   */
  (e: 'input', value: string): void
  /**
   * is triggered when the voucher code is completely entered.
   * emits the entered voucher code
   */
  (e: 'input-finished', value: string): void
}>()

const route = useRoute()
/**
 * the defaultVoucherCode overwrites the current set voucher code
 */
const defaultVoucherCode = ref<string>(route.query.voucherCode as string | undefined || '')

const emitVoucherScanInput = (newVoucherCode: string) => {
  defaultVoucherCode.value = newVoucherCode
  emitInput(newVoucherCode)
}

const emitInput = (newVoucherCode: string) => {
  emit('input', newVoucherCode)
}

const emitInputFinished = (newVoucherCode: string) => {
  emit('input-finished', newVoucherCode)
}

</script>
<style lang="scss" scoped>
.voucher-input-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-sm);
}

// TODO: can be removed after new button spec is implemented. See design flaws https://github.com/lion5/bonista-coupons/issues/2789
.qr-scan-button {
  flex: 1;
}
</style>
