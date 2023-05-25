import { describe, expect, it } from 'vitest'
import { useWidget } from '@/atoms/dashboard/composables/useWidget'

describe('useWidget.ts', () => {
  it('getSettings - returns merged settings', () => {
    const expectedMap = new Map([
      ['test1', 'testValue1'],
      ['test2', 'defaultTestValue2'],
      ['test3', 'testValue3']
    ])
    const settings = new Map([
      ['test1', 'testValue1'],
      ['test3', 'testValue3']
    ])
    const defaultSettings = new Map([
      ['test1', 'defaultTestValue1'],
      ['test2', 'defaultTestValue2'],
      ['test3', 'defaultTestValue3']
    ])
    const props = {
      settings,
      defaultSettings
    }
    const { getSettings } = useWidget(props)
    expect(getSettings()).toStrictEqual(expectedMap)
  })
  it('getSetting - returns setting if exists', () => {
    const settings = new Map([['test1', 'testValue1']])
    const defaultSettings = new Map([['test1', 'defaultTestValue1']])
    const props = {
      settings,
      defaultSettings
    }
    const { getSetting } = useWidget(props)
    expect(getSetting('test1')).toBe('testValue1')
  })
  it('getSetting - returns default setting if setting not exists', () => {
    const settings = new Map()
    const defaultSettings = new Map([['test1', 'defaultTestValue1']])
    const props = {
      settings,
      defaultSettings
    }
    const { getSetting } = useWidget(props)
    expect(getSetting('test1')).toBe('defaultTestValue1')
  })
  it('getReactiveSetting - returns computed wrapped setting', () => {
    const settings = new Map([['test1', 'testValue1']])
    const defaultSettings = new Map([['test1', 'defaultTestValue1']])
    const props = {
      settings,
      defaultSettings
    }
    const { getReactiveSetting } = useWidget(props)
    expect(getReactiveSetting('test1').value).toBe('testValue1')
  })
})
