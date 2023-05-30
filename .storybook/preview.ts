import { Preview, setup } from '@storybook/vue3'
import './main.scss'
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = []
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

setup((app) => {
  app.use(router)
})
export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}

const preview: Preview = {
  parameters
}
export default preview
