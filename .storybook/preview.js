import { setup } from '@storybook/vue3'
import './main.scss'
import { createRouter, createWebHashHistory } from 'vue-router'


const routes = []
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

setup((app) => {
  app.use(router)
})
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}
