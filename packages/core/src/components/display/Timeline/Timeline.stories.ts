import { Meta, StoryObj } from '@storybook/vue3-vite'
import Timeline from './Timeline.vue'
import { TimelineEvent } from './timelineEvent'
import { BaseCard } from '../../index'
import { BaseIcon } from '../../icons'

export default {
  component: Timeline,
  title: 'Display Components/Timeline',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/YfCTIcFmFgKBCICwrlq2Cu/Lion5---Component-Library?node-id=141-313&t=G5uiRP9qCJCWrnJ1-1'
    }
  }
} as Meta<typeof Timeline>
type Story = StoryObj<typeof Timeline>

export const Default: Story = {
  args: {
    events: [
      new TimelineEvent(
        new Date('2025-10-01'),
        'Placed',
        'You\'ve successfully created an order.'
      ),
      new TimelineEvent(
        new Date('2025-10-10'),
        'Dispatched',
        'The order leaved the warehouse.'
      ),
      new TimelineEvent(
        new Date('2025-10-11T00:10:00.000Z'),
        'Completed',
        'The order successfully shipped.'
      )
    ]
  }
}

/**
 * Preview events by setting the `active` flag to false
 */
export const PartialActive: Story = {
  args: {
    events: [
      new TimelineEvent(
        new Date('2025-10-01'),
        'Placed',
        'You\'ve successfully created an order.'
      ),
      new TimelineEvent(
        new Date('2025-10-02'),
        'Dispatched',
        'The order leaved the warehouse.'
      ),
      new TimelineEvent(
        new Date('2025-10-03'),
        'Completed',
        'The order successfully shipped.',
        undefined,
        false
      )
    ]
  }
}

/**
 * You can change the event icon (Only Bootstrap Icons are supported)
 */
export const CustomIcons: Story = {
  args: {
    events: [
      new TimelineEvent(
        new Date('2025-10-01'),
        'Placed',
        'You\'ve successfully created an order.',
        'bi-cart-check-fill'
      ),
      new TimelineEvent(
        new Date('2025-10-02'),
        'Dispatched',
        'The order leaved the warehouse.',
        'bi-truck'
      ),
      new TimelineEvent(
        new Date('2025-10-03'),
        'Completed',
        'The order successfully shipped.',
        'bi-check-lg'
      )
    ]
  }
}

export const WithoutTime: Story = {
  args: {
    events: [
      new TimelineEvent(
        undefined,
        'Placed',
        'You\'ve successfully created an order.'
      ),
      new TimelineEvent(
        undefined,
        'Dispatched',
        'The order leaved the warehouse.'
      ),
      new TimelineEvent(
        undefined,
        'Completed',
        'The order successfully shipped.'
      )
    ]
  }
}

export const WithCustomSlots: Story = {
  render: (args) => ({
    components: { Timeline, BaseCard, BaseIcon },
    setup() {
      return { args }
    },
    template: `
      <Timeline v-bind="args">
        <template #marker>
          <img src="https://picsum.photos/32/32" alt="Marker" width="32" style="border-radius: var(--border-radius-round);">
        </template>
        <template #title="{ title, event }">
          <strong>{{ title }}</strong>
        </template>
        <template #dateTime="{ dateTime, dateTimeFormatted, event }">
          <small>{{ dateTimeFormatted }}</small>
        </template>
        <template #description="{ description, event }">
          <BaseCard>{{ description }}</BaseCard>
        </template>
      </Timeline>`
  }),
  args: {
    ...Default.args
  }
}

/**
 * A Storybook story configuration for rendering the Timeline component
 * with custom colors applied via CSS variables.
 *
 * The following css custom props can be used to customize the timline colors:
 * - `--timeline-color-active`: Defines the color for active timeline states.
 * - `--timeline-color-inactive`: Defines the color for inactive timeline states.
 * - `--timeline-font-color`: Defines the font color for the timeline.
 */
export const WithCustomColors: Story = {
  render: (args) => ({
    components: { Timeline, BaseCard },
    setup() {
      return { args }
    },
    template: `
      <Timeline v-bind="args" style="--timeline-color-active: #0d9488; --timeline-color-inactive: #f5f5f4; --timeline-font-color: #64748b;"/>`
  }),
  args: {
    ...PartialActive.args
  }
}

/**
 * You can change the event icon (Only Bootstrap Icons are supported)
 */
export const Horizontal: Story = {
  args: {
    events: [
      new TimelineEvent(
        new Date('2025-10-01'),
        'Placed',
        'You\'ve successfully created an order.',
        'bi-cart-check-fill'
      ),
      new TimelineEvent(
        new Date('2025-10-02'),
        'Dispatched',
        'The order leaved the warehouse.',
        'bi-truck'
      ),
      new TimelineEvent(
        new Date('2025-10-03'),
        'Completed',
        'The order successfully shipped.',
        'bi-check-lg'
      )
    ],
    orientation: 'horizontal'
  }
}

export const HorizontalPartialActive: Story = {
  args: {
    events: [
      new TimelineEvent(
        new Date('2025-10-01'),
        'Placed',
        'You\'ve successfully created an order.',
        'bi-cart-check-fill'
      ),
      new TimelineEvent(
        new Date('2025-10-02'),
        'Dispatched',
        'The order leaved the warehouse.',
        'bi-truck'
      ),
      new TimelineEvent(
        new Date('2025-10-03'),
        'Completed',
        'The order successfully shipped.',
        'bi-check-lg',
        false
      )
    ],
    orientation: 'horizontal'
  }
}

export const HorizontalWithoutTime: Story = {
  args: {
    events: [
      new TimelineEvent(
        undefined,
        'Placed',
        'You\'ve successfully created an order.'
      ),
      new TimelineEvent(
        undefined,
        'Dispatched',
        'The order leaved the warehouse.'
      ),
      new TimelineEvent(
        undefined,
        'Completed',
        'The order successfully shipped.'
      )
    ],
    orientation: 'horizontal'
  }
}
