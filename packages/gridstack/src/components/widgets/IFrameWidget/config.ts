import IFrameWidget from '@/components/widgets/IFrameWidget/IFrameWidget.vue'
import { WidgetComponentWrapper } from '@/models/widgetComponentWrapper'
import {
  IFrameSetting,
  IFrameSettingsFormSchema
} from '@/components/widgets/IFrameWidget/settings'

export const IFRAME_WIDGET_WRAPPER = new WidgetComponentWrapper(
  'Websiteintegration',
  IFrameWidget,
  new Map([
    [
      IFrameSetting.SRC,
      'https://www.ivena-mittelfranken.de/leitstellenansicht.php?si=bce97606a5979f72fcacacbc777db9c4_01&bereich_id=126001&fb_id=56392e3cdbca6_01'
    ]
  ]),
  IFrameSettingsFormSchema
)
