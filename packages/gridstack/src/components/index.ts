import AddWidgetButton from '@/components/AddWidgetButton/AddWidgetButton.vue'
import AddWidgetInput from '@/components/AddWidgetInput/AddWidgetInput.vue'
import BaseWidget from '@/components/BaseWidget/BaseWidget.vue'
import BaseWidgetEditMode from '@/components/BaseWidgetEditMode/BaseWidgetEditMode.vue'
import { useGridStack } from '@/composables/useGridStack'
import { useWidget } from '@/composables/useWidget'
import ConfigurableDashboard from '@/components/ConfigurableDashboard/ConfigurableDashboard.vue'
import DashboardBar from '@/components/DashboardBar/DashboardBar.vue'
import DynamicGrid from '@/components/DynamicGrid/DynamicGrid.vue'
import EditButton from '@/components/EditButton/EditButton.vue'
import { FormField, FormSchema } from '@/models/formSchema'
import { GridWidget } from '@/models/gridWidget'
import { WidgetComponentWrapper } from '@/models/widgetComponentWrapper'
import {
  WidgetConfiguration,
  WidgetSetting,
  WidgetSettings
} from '@/models/widgetConfiguration'
import WidgetHeadline from '@/components/WidgetHeadline/WidgetHeadline.vue'
import NotFoundWidget from '@/components/widgets/NotFoundWidget/NotFoundWidget.vue'
import TemplateWidget from '@/components/widgets/TemplateWidget/TemplateWidget.vue'
import WidgetSettingsForm from '@/components/WidgetSettingsForm/WidgetSettingsForm.vue'
import WidgetSettingsModal from '@/components/WidgetSettingsModal/WidgetSettingsModal.vue'
import WidgetWrapper from '@/components/WidgetWrapper/WidgetWrapper.vue'
import { IFRAME_WIDGET_WRAPPER } from '@/components/widgets/IFrameWidget/config'
import { REFRESHABLE_IMAGE_WIDGET_WRAPPER } from '@/components/widgets/RefreshableImageWidget/config'
import { TWITTER_WIDGET_WRAPPER } from '@/components/widgets/TwitterWidget/config'
import { WEATHER_WIDGET_WRAPPER } from '@/components/widgets/weather/widgets/WeatherWidget/config'
import { WEATHER_FORECAST_WIDGET_WRAPPER } from '@/components/widgets/weather/widgets/WeatherForcastWidget/config'
import { DWD_WARN_WIDGET_WRAPPER } from '@/components/widgets/weather/widgets/DWDWarnMapWidget/config'
import { DWD_RAIN_RADAR_WIDGET_WRAPPER } from '@/components/widgets/weather/widgets/DWDRainRadarWidget/config'
import { WEATHER_WARN_FEED_WIDGET_WRAPPER } from '@/components/widgets/weather/widgets/DWDWarnFeedWidget/config'

export {
  AddWidgetButton,
  AddWidgetInput,
  BaseWidget,
  BaseWidgetEditMode,
  useGridStack,
  useWidget,
  ConfigurableDashboard,
  DashboardBar,
  DynamicGrid,
  EditButton,
  FormSchema,
  FormField,
  GridWidget,
  WidgetComponentWrapper,
  WidgetConfiguration,
  WidgetHeadline,
  WidgetSettingsForm,
  NotFoundWidget,
  TemplateWidget,
  WidgetSettingsModal,
  WidgetWrapper,
  IFRAME_WIDGET_WRAPPER,
  REFRESHABLE_IMAGE_WIDGET_WRAPPER,
  TWITTER_WIDGET_WRAPPER,
  WEATHER_WIDGET_WRAPPER,
  WEATHER_FORECAST_WIDGET_WRAPPER,
  DWD_WARN_WIDGET_WRAPPER,
  WEATHER_WARN_FEED_WIDGET_WRAPPER,
  DWD_RAIN_RADAR_WIDGET_WRAPPER
}
export type { WidgetSettings, WidgetSetting }
