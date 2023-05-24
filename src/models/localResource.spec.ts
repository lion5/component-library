import { describe, expect, it } from 'vitest'
import { TacticalSign } from './localResource'

describe('LocalResource', () => {
  describe('TacticalSign', () => {
    it('is created with correct path and relativePath', () => {
      const tacticalSignPath =
        'Katastrophenschutz_Einheiten/Tier_Dekon_und_Transportgruppe.svg'

      const tacticalSign = new TacticalSign(tacticalSignPath)

      expect(tacticalSign.path).toBe(
        TacticalSign.PATH_PREFIX + tacticalSignPath
      )
      expect(tacticalSign.relativePath).toBe(tacticalSignPath)
      expect(tacticalSign.name).toBe('Tier Dekon und Transportgruppe')
    })

    it('throws error if path already includes prefix', () => {
      const tacticalSignPath =
        TacticalSign.PATH_PREFIX +
        'Katastrophenschutz_Einheiten/Tier_Dekon_und_Transportgruppe.svg'

      expect(() => new TacticalSign(tacticalSignPath)).toThrowError(
        'tacticalSignPath already includes prefix'
      )
    })

    it('throws error if path starts with leading forward-slash', () => {
      const tacticalSignPath =
        '/Katastrophenschutz_Einheiten/Tier_Dekon_und_Transportgruppe.svg'

      expect(() => new TacticalSign(tacticalSignPath)).toThrowError(
        'tacticalSignPath must not contain a leading "/"'
      )
    })

    it('withPrefix creates tactical sign via path that already contains prefix', () => {
      const tacticalSignPath =
        TacticalSign.PATH_PREFIX +
        'Katastrophenschutz_Einheiten/Tier_Dekon_und_Transportgruppe.svg'

      const tacticalSign = TacticalSign.withPrefix(tacticalSignPath)

      expect(tacticalSign.path).toBe(tacticalSignPath)
      expect(tacticalSign.relativePath).toBe(
        'Katastrophenschutz_Einheiten/Tier_Dekon_und_Transportgruppe.svg'
      )
      expect(tacticalSign.name).toBe('Tier Dekon und Transportgruppe')
    })

    it('withPrefix throws error if path does not contain prefix', () => {
      const tacticalSignPath =
        'Katastrophenschutz_Einheiten/Tier_Dekon_und_Transportgruppe.svg'

      expect(() => TacticalSign.withPrefix(tacticalSignPath)).toThrowError(
        'pathWithPrefix must include prefix'
      )
    })
  })
})
