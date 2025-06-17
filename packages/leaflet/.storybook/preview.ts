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
    }
  },
  tags: ['autodocs']
}

export default preview
