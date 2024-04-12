<template>
  <div class="invoice-preview">
    <span v-if="invoice?.billingCompanyName" class="billing-company-name">
      {{ toDisplayString(invoice?.billingCompanyName) }}<br />
    </span>
    <span class="company-name">
      {{ toDisplayString(invoice?.companyName, 'Anzeigename') }} </span
    ><br />
    <span v-if="invoice?.contactName" class="contact-name">
      z.Hd. {{ toDisplayString(invoice?.contactName) }}<br />
    </span>
    <span class="address-street">
      {{ toDisplayString(invoice?.address?.street, 'Anschrift') }} </span
    ><br />
    <span class="address-postal-code-city">
      {{ toDisplayString(invoice?.address?.postalCode, 'PLZ') }}
      {{ toDisplayString(invoice?.address?.city, 'Ort') }}
    </span>
  </div>
</template>
<script lang="ts" setup>
import { Invoice } from '@core/components/utils/InvoicePreview/invoice'
import { useTextUtils } from '@core/composables/useTextUtils'

defineProps<{
  invoice?: Invoice
}>()

const { toDisplayString } = useTextUtils()
</script>
<style scoped>
.invoice-preview {
  text-align: end;
}
</style>
