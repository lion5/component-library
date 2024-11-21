import type { Preview } from '@storybook/vue3'
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
      toc: true
    }
  }
}

export default preview
