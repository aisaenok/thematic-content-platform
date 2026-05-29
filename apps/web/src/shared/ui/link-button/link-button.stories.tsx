import type { Meta, StoryObj } from '@storybook/nextjs'

import { LinkButton } from './link-button'

const meta = {
  component: LinkButton,
  title: 'Shared UI/LinkButton',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof LinkButton>

export default meta

type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: {
    href: '#',
    children: 'Open wiki articles',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    href: '#',
    children: 'Explore news',
    variant: 'secondary',
  },
}
