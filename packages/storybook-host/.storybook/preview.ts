import { Preview, setup } from '@storybook/vue3-vite'
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
  },
  options: {
    storySort: {
      order: ['Welcome', 'Guide', '*', 'Pages']
    }
  },
  docs: {
    toc: true,
    codePanel: true,
    source: {
      type: 'dynamic',
    },
  },
  a11y: {
    context: {
      include: ['body'],
      exclude: ['#__vue-devtools-container__'],
    },
    test: 'error'
  }
}

const preview: Preview = {
  parameters
}
export default preview
