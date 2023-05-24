import { describe, expect, it } from 'vitest'
import { WidgetConfiguration } from '@/dashboard/models/widgetConfiguration'
import { GridWidget } from '@/dashboard/models/gridWidget'
import type { GridStackWidget } from 'gridstack'

describe('widgetConfiguration.ts', () => {
  it('fromGridStackWidget - returns widgetConfig', () => {
    const expectedSettings = new Map([['testKey', 'testValue']])
    const expectedWidget = new WidgetConfiguration(
      'testId',
      new GridWidget(1, 2, 3, 4),
      'testComponentKey',
      expectedSettings
    )
    const gridStackWidget: GridStackWidget = {
      id: expectedWidget.id,
      x: expectedWidget.position.x,
      y: expectedWidget.position.y,
      w: expectedWidget.position.width,
      h: expectedWidget.position.height,
    }

    expect(
      WidgetConfiguration.fromGridStackWidget(
        gridStackWidget,
        expectedWidget.componentId,
        expectedSettings
      )
    ).toStrictEqual(expectedWidget)
  })
})
