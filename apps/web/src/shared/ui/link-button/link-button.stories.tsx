import type { Meta, StoryObj } from '@storybook/nextjs'

import { LinkButton } from './link-button'

const meta = {
  component: LinkButton,
  title: 'UI Kit/Primitives/LinkButton',
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

export const Variants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: '16px',
        flexWrap: 'wrap',
      }}
    >
      <LinkButton href="#">Primary action</LinkButton>
      <LinkButton href="#" variant="secondary">
        Secondary action
      </LinkButton>
    </div>
  ),
}
