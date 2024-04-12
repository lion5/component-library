import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import InvoicePreview from '@core/components/utils/InvoicePreview/InvoicePreview.vue'
import { Invoice } from '@core/components/utils/InvoicePreview/invoice'
import { Address } from '@core/models/address'

describe('PortalInvoicePreview', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(InvoicePreview)
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe('Component', () => {
    it('renders empty values correctly', () => {
      const billingCompanyName = wrapper.find('.billing-company-name').exists()
      const companyName = wrapper.find('.company-name')
      const contactName = wrapper.find('.contact-name').exists()
      const addressStreet = wrapper.find('.address-street')
      const addressPostalCodeCity = wrapper.find('.address-postal-code-city')

      expect(billingCompanyName).toBeFalsy()
      expect(companyName.text()).toBe('Anzeigename')
      expect(contactName).toBeFalsy()
      expect(addressStreet.text()).toBe('Anschrift')
      expect(addressPostalCodeCity.text()).toBe('PLZ Ort')
    })

    it('renders billing company name if it exists on merchant', async () => {
      const invoice = new Invoice(
        'testBillingCompanyName',
        undefined,
        undefined,
        undefined
      )
      await wrapper.setProps({ invoice })
      const billingCompanyName = wrapper.find('.billing-company-name')

      expect(billingCompanyName.text()).toBe('testBillingCompanyName')
    })
    it('renders contact name if it exists on merchant', async () => {
      const invoice = new Invoice(
        undefined,
        undefined,
        'testContactName',
        undefined
      )
      await wrapper.setProps({ invoice })
      const contactName = wrapper.find('.contact-name')

      expect(contactName.text()).toBe('z.Hd. testContactName')
    })

    it('renders company address if it exists on merchant', async () => {
      const invoice = new Invoice(
        undefined,
        undefined,
        undefined,
        new Address('companyStreet', 'companyPostalCode', 'companyCity')
      )
      await wrapper.setProps({ invoice })

      const addressStreet = wrapper.find('.address-street')
      const addressPostalCodeCity = wrapper.find('.address-postal-code-city')

      expect(addressStreet.text()).toBe('companyStreet')
      expect(addressPostalCodeCity.text()).toBe('companyPostalCode companyCity')
    })
  })
})
