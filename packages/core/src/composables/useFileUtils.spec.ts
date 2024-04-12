import { describe, expect, it } from 'vitest'
import { useFileUtils } from '@core/composables/useFileUtils'

describe('useFileUtils.ts', () => {
  describe('displayFileSize', () => {
    it('shall return 0 B if amount is 0', () => {
      const { displayFileSize } = useFileUtils()
      const decimalString = displayFileSize(0)
      expect(decimalString).toBe('0,00\u00A0B')
    })

    it('shall return 1 B if amount is 1', () => {
      const { displayFileSize } = useFileUtils()
      const decimalString = displayFileSize(1)
      expect(decimalString).toBe('1,00\u00A0B')
    })

    it('shall return 1,00 KiB if amount is 1024', () => {
      const { displayFileSize } = useFileUtils()
      const decimalString = displayFileSize(1024)
      expect(decimalString).toBe('1,00\u00A0KiB')
    })

    it('shall return 1,00 MiB if amount is 1,049e+6', () => {
      const { displayFileSize } = useFileUtils()
      const decimalString = displayFileSize(1.049e6)
      expect(decimalString).toBe('1,00\u00A0MiB')
    })

    it('shall return 3,34 MiB if amount is 3502244', () => {
      const { displayFileSize } = useFileUtils()
      const decimalString = displayFileSize(3502244)
      expect(decimalString).toBe('3,34\u00A0MiB')
    })
  })
})
