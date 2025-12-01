import { describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { TimelineEvent } from '@core/components/display/Timeline/timelineEvent'
import TimelineComponent from '@core/components/display/Timeline/Timeline.vue'
import TimelineItem from '@core/components/display/Timeline/TimelineItem.vue'

describe('Timeline.vue', () => {
  const events = [
    new TimelineEvent(
      new Date('2025-10-11T12:30:00Z'),
      '',
      '',
      '',
      true
    ),
    new TimelineEvent(
      new Date('2025-10-11T12:31:00Z'),
      '',
      '',
      '',
      true
    )
  ]

  function mountComponent() {
    return shallowMount(TimelineComponent, {
      props: {
        events: events
      }
    })
  }

  describe(':props', () => {
    it(':events - renders events', async () => {
      const wrapper = mountComponent()
      const timelineItems = wrapper.findAllComponents(TimelineItem)

      for (let i = 0; i < timelineItems.length; i++) {
        expect(timelineItems.at(i)?.props().event).toStrictEqual(events.at(i))
      }
    })
    it(':orientation - default is vertical', async () => {
      const wrapper = mountComponent()

      expect(wrapper.classes()).toContain('vertical')
    })
    it(':orientation - applied as class', async () => {
      const wrapper = mountComponent()

      await wrapper.setProps({ orientation: 'horizontal' })
      expect(wrapper.classes()).toContain('horizontal')

      await wrapper.setProps({ orientation: 'vertical' })
      expect(wrapper.classes()).toContain('vertical')
    })
    it(':orientation - applied to TimelineItem', async () => {
      const wrapper = mountComponent()
      const timelineItems = wrapper.findAllComponents(TimelineItem)

      for (let i = 0; i < timelineItems.length; i++) {
        expect(timelineItems.at(i)?.props().orientation).toBe('vertical')
      }
    })
    it(':timeFormat - applied to "dd.mm.YYYY HH:MM', async () => {
      const wrapper = mountComponent()
      const timelineItems = wrapper.findAllComponents(TimelineItem)

      for (let i = 0; i < timelineItems.length; i++) {
        expect(timelineItems.at(i)?.props().timeFormat).toBe('dd.mm.YYYY HH:MM')
      }

      await wrapper.setProps({ timeFormat: 'dd.mm.YYYY' })
      for (let i = 0; i < timelineItems.length; i++) {
        expect(timelineItems.at(i)?.props().timeFormat).toBe('dd.mm.YYYY')
      }
    })
    it(':reverse - reverse the event order', async () => {
      const wrapper = mountComponent()
      await wrapper.setProps({ reverse: true })
      const timelineItems = wrapper.findAllComponents(TimelineItem)

      for (let i = 0; i < timelineItems.length; i++) {
        expect(timelineItems.at(i)?.props().event).toStrictEqual(events.at(timelineItems.length - i - 1))
      }
    })
  })
})
