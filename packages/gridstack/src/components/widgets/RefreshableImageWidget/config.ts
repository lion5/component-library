import { WidgetComponentWrapper } from '@/models/widgetComponentWrapper'
import { WidgetSetting } from '@/models/widgetConfiguration'
import RefreshableImageWidget from '@/components/widgets/RefreshableImageWidget/RefreshableImageWidget.vue'
import {
  RefreshableImageSetting,
  RefreshableImageSettingsFormSchema
} from '@/components/widgets/RefreshableImageWidget/settings'

export const REFRESHABLE_IMAGE_WIDGET_WRAPPER = new WidgetComponentWrapper(
  'Auto-Refresh Bild',
  RefreshableImageWidget,
  new Map<string, WidgetSetting>([
    [
      RefreshableImageSetting.SRC,
      'https://www.hnd.bayern.de/webservices/graphik.php?cache=hnd&statnr=24208806&thema=hochwasser.meldestufen&wert=wasserstand&vhs=true&geber=0'
    ],
    [RefreshableImageSetting.REFRESH_INTERVAL_SECONDS, 60],
    [RefreshableImageSetting.TITLE, 'Wasserstand Pettstadt / Regnitz']
  ]),
  RefreshableImageSettingsFormSchema
)
