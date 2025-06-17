import type { Preview } from '@storybook/vue3-vite'
import './main.scss';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
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
  },
  tags: ['autodocs']
}

export default preview
