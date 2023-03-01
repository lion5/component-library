import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import VoucherCodeInputGroup from '@/base/components/input/VoucherCodeInputGroup/VoucherCodeInputGroup.vue'
import { useRoute } from 'vue-router/composables'
import VoucherCodeTextInput from '@/voucher/components/voucher_scan/VoucherCodeTextInput/VoucherCodeTextInput.vue'
import flushPromises from 'flush-promises'
import VoucherScanButton from '@/voucher/components/VoucherScanButton/VoucherScanButton.vue'

describe('VoucherCodeInputGroup.vue', () => {
  let wrapper

  beforeEach(() => {
    vi.mock('vue-router/composables', () => ({
      useRoute: vi.fn(),
    }))
    useRoute.mockReturnValue({ query: {} })
    wrapper = mount(VoucherCodeInputGroup)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('mounted', () => {
    it('emits input on mounted', async () => {
      const expectedVoucherCode = 'WXYZZYXW'
      useRoute.mockReturnValue({ query: { voucherCode: expectedVoucherCode } })
      wrapper = mount(VoucherCodeInputGroup)
      await flushPromises()

      expect(wrapper.emitted('input').at(-1)).toStrictEqual([expectedVoucherCode])
      expect(wrapper.emitted('input-finished').at(-1)).toStrictEqual([expectedVoucherCode])
      expect(wrapper.emitted('input-finished').length).toBe(1)
    })
  })

  describe('route', () => {
    it('voucherCode - is applied to VoucherCodeTextInput defaultValue', async () => {
      const expectedVoucherCode = 'WXYZZYXW'
      useRoute.mockReturnValue({ query: { voucherCode: expectedVoucherCode } })
      wrapper = mount(VoucherCodeInputGroup)

      expect(wrapper.findComponent(VoucherCodeTextInput).vm.defaultValue).toBe(expectedVoucherCode)
    })
  })

  describe(':emits', () => {
    it('input(VoucherCodeTextInput) - trigger input event', async () => {
      const expectedVoucherCode = 'ABCD1234'
      wrapper.findComponent(VoucherCodeTextInput).vm.$emit('input', expectedVoucherCode)
      await flushPromises()

      expect(wrapper.emitted('input').at(-1)).toStrictEqual([expectedVoucherCode])
    })
    it('input-finished(VoucherCodeTextInput) - trigger input-finished event once', async () => {
      const expectedVoucherCode = '1234ABCD'
      wrapper.findComponent(VoucherCodeTextInput).vm.$emit('input-finished', expectedVoucherCode)
      await flushPromises()

      expect(wrapper.emitted('input-finished').at(0)).toStrictEqual([expectedVoucherCode])
      // Critical part. Input finished should only be emitted once. It can trigger finish actions multiple times.
      expect(wrapper.emitted('input-finished').length).toBe(1)
    })
    it('input(VoucherScanButton) - trigger input-finished event', async () => {
      const expectedVoucherCode = 'A1B2C3D4'
      wrapper.findComponent(VoucherScanButton).vm.$emit('input-finished', expectedVoucherCode)
      await flushPromises()

      expect(wrapper.emitted('input').at(-1)).toStrictEqual([expectedVoucherCode])
    })
    it('input-finished(VoucherScanButton) - trigger input-finished event once', async () => {
      const expectedVoucherCode = '1A2B3C4D'
      wrapper.findComponent(VoucherScanButton).vm.$emit('input-finished', expectedVoucherCode)
      await flushPromises()

      expect(wrapper.emitted('input-finished').at(-1)).toStrictEqual([expectedVoucherCode])
      // Critical part. Input finished should only be emitted once. It can trigger finish actions multiple times.
      expect(wrapper.emitted('input-finished').length).toBe(1)
    })
    it('input-finished(VoucherScanButton) - set defaultVoucherCode', async () => {
      const expectedVoucherCode = '1A2B3C4D'
      wrapper.findComponent(VoucherScanButton).vm.$emit('input-finished', expectedVoucherCode)
      await flushPromises()

      expect(wrapper.findComponent(VoucherCodeTextInput).vm.defaultValue).toBe(expectedVoucherCode)
    })
  })
})
