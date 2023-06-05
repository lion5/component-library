import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import { ErrorMessage, useField } from 'vee-validate'
import * as useNominatimExports from '@/composables/useNominatim'
import LocationCoordinateSelect from './LocationCoordinateSelect.vue'
import { NamedLocation } from '@/models/namedLocation'
import { GpsLocation } from '@/models/gpsLocation'

vi.spyOn(useNominatimExports, 'useNominatim').mockReturnValue({
  getLocations: vi.fn().mockResolvedValue({})
})

vi.mock('vee-validate', async () => {
  const actual = await vi.importActual('vee-validate')
  return {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ...actual,
    useField: vi.fn().mockReturnValue({
      setValue: vi.fn(),
      value: vi.fn()
    })
  }
})

describe('LocationCoordinateSelect.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    vi.useFakeTimers()
    wrapper = mount(LocationCoordinateSelect, {
      props: {
        name: 'name',
        label: 'label'
      }
    })
  })
  afterEach(() => {
    vi.useRealTimers()
  })

  describe(':props', () => {
    it(':name - is applied to useField', async () => {
      const expectedName = 'expectedName'
      wrapper = mount(LocationCoordinateSelect, {
        props: {
          name: expectedName,
          label: 'label'
        }
      })
      expect(useField).toHaveBeenCalledWith(expectedName)
    })
    it(':name - is applied to ErrorMessage', async () => {
      const expectedName = 'expectedFieldName'
      await wrapper.setProps({ name: expectedName })
      expect(wrapper.findComponent(ErrorMessage).vm.name).toBe(expectedName)
    })
    it(':label - is rendered as label', async () => {
      const expectedLabel = 'Expected Label'
      await wrapper.setProps({ label: expectedLabel })
      expect(wrapper.find('label').text()).toBe(expectedLabel)
    })
  })
  it('getLocation is called on text input', async () => {
    const expectedLocationName = 'Test'

    const input = wrapper.find('input')
    input.setValue(expectedLocationName)
    await input.trigger('keydown', { key: 'any' })
    vi.runAllTimers()

    expect(
      useNominatimExports.useNominatim().getLocations
    ).toHaveBeenCalledWith(expectedLocationName)
  })
  it('setValue is called on text input', async () => {
    const expectedLocation = new NamedLocation(new GpsLocation(44, 10), 'Test')
    const mockGetLocations = useNominatimExports.useNominatim()
      .getLocations as ReturnType<typeof vi.fn>
    mockGetLocations.mockResolvedValue([expectedLocation])
    const input = wrapper.find('input')
    input.setValue('Test2')
    await input.trigger('keydown', { key: 'any' })
    vi.runAllTimers()
    await flushPromises()

    input.setValue('Test')

    expect(useField('').setValue).toHaveBeenCalledWith(expectedLocation)
  })
})
