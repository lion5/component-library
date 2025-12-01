import { describe, expect, it } from 'vitest'
import TimelineItemComponent from '@core/components/display/Timeline/TimelineItem.vue'
import { shallowMount } from '@vue/test-utils'
import { TimelineEvent } from '@core/components/display/Timeline/timelineEvent'

describe('TimelineItem.vue', () => {
  function mountComponent() {
    return shallowMount(TimelineItemComponent, {
      props: {
        event: new TimelineEvent(
          new Date('2025-10-11T12:30:00Z'),
          '',
          '',
          '',
          true
        ),
        timeFormat: 'dd.mm.YYYY HH:MM',
        orientation: 'horizontal'
      }
    })
  }

  describe(':props', () => {
    it(':event.active - set "is-active" class if true', async () => {
      const wrapper = mountComponent()

      expect(wrapper.classes()).toContain('is-active')
    })
    it(':event.active - remove "is-active" class if false', async () => {
      const wrapper = mountComponent()
      await wrapper.setProps({ event: new TimelineEvent(new Date(), '', '', '', false) })

      expect(wrapper.classes()).not.toContain('is-active')
    })
    it(':orientation - applied as class', async () => {
      const wrapper = mountComponent()
      expect(wrapper.classes()).toContain('horizontal')

      await wrapper.setProps({ orientation: 'vertical' })
      expect(wrapper.classes()).toContain('vertical')
    })
    it(':timeFormat - defines date time format', async () => {
      const wrapper = mountComponent()
      expect(wrapper.find('.time').text()).toBe('11.10.2025, 12:30')

      await wrapper.setProps({ timeFormat: 'dd.mm.YYYY' })
      expect(wrapper.find('.time').text()).toBe('11.10.2025')
    })
  })
})
