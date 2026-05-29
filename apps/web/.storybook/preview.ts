import type { Preview } from '@storybook/nextjs'

import '../src/app/global.css'

const preview: Preview = {
  parameters: {
    controls: {
      expanded: true,
    },
    backgrounds: {
      default: 'Light',
      values: [
        {
          name: 'Light',
          value: '#ffffff',
        },
        {
          name: 'Muted',
          value: '#fafafa',
        },
      ],
    },
    layout: 'centered',
  },
}

export default preview
