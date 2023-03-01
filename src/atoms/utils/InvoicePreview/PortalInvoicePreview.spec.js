import { createLocalVue, mount } from '@vue/test-utils'
import PortalInvoicePreview from '@/base/components/PortalInvoicePreview.vue'
import { Merchant } from '@/merchant/models/merchant'
import { Address } from '@/base/models/address'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

const localVue = createLocalVue()

describe('PortalInvoicePreview', () => {
  let wrapper

  beforeEach(() => {
    const merchant = new Merchant()
    wrapper = mount(
      PortalInvoicePreview,
      {
        propsData: {
          merchant
        },
        localVue
      }
    )
  })

  afterEach(() => {
    wrapper.destroy()
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
      const merchant = new Merchant(
        1,
        undefined,
        undefined,
        true,
        '',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        'testBillingCompanyName',
        undefined,
        undefined,
        undefined
      )
      await wrapper.setProps({ merchant })
      const billingCompanyName = wrapper.find('.billing-company-name')

      expect(billingCompanyName.text()).toBe('testBillingCompanyName')
    })
    it('renders contact name if it exists on merchant', async () => {
      const merchant = new Merchant(
        1,
        undefined,
        undefined,
        true,
        '',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        'testContactName',
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      )
      await wrapper.setProps({ merchant })
      const contactName = wrapper.find('.contact-name')

      expect(contactName.text()).toBe('z.Hd. testContactName')
    })

    it('renders company address if it exists on merchant', async () => {
      const merchant = new Merchant(
        1,
        undefined,
        undefined,
        true,
        '',
        undefined,
        undefined,
        undefined,
        undefined,
        new Address('companyStreet', 'companyPostalCode', 'companyCity'),
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined
      )
      await wrapper.setProps({ merchant })

      const addressStreet = wrapper.find('.address-street')
      const addressPostalCodeCity = wrapper.find('.address-postal-code-city')

      expect(addressStreet.text()).toBe('companyStreet')
      expect(addressPostalCodeCity.text()).toBe('companyPostalCode companyCity')
    })

    it('renders billing address instead of company address if it exists on merchant', async () => {
      const merchant = new Merchant(
        1,
        undefined,
        undefined,
        true,
        '',
        undefined,
        undefined,
        undefined,
        undefined,
        new Address('companyStreet', 'companyPostalCode', 'companyCity'),
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        new Address('billingStreet', 'billingPostalCode', 'billingCity'),
        undefined
      )
      await wrapper.setProps({ merchant })

      const addressStreet = wrapper.find('.address-street')
      const addressPostalCodeCity = wrapper.find('.address-postal-code-city')

      expect(addressStreet.text()).toBe('billingStreet')
      expect(addressPostalCodeCity.text()).toBe('billingPostalCode billingCity')
    })
  })
})
