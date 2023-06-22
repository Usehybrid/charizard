import type {Preview} from '@storybook/react'

import '../src/components/styles/global.css'
import '../src/components/styles/_variables.css'

const preview: Preview = {
  parameters: {
    actions: {argTypesRegex: '^on[A-Z].*'},
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
