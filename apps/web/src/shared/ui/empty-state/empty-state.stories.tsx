import type { Meta, StoryObj } from '@storybook/nextjs'

import { LinkButton } from '../link-button'
import { EmptyState } from './empty-state'

const meta = {
  component: EmptyState,
  title: 'UI Kit/Feedback/EmptyState',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof EmptyState>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'No content yet',
    description: 'Content source returned an empty collection for this route.',
  },
}

export const WithAction: Story = {
  args: {
    title: 'No content yet',
    description: 'Content source returned an empty collection for this route.',
    action: (
      <LinkButton href="#" variant="secondary">
        Open wiki
      </LinkButton>
    ),
  },
}
