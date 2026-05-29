import type { Meta, StoryObj } from '@storybook/nextjs'

import { LinkButton } from '../link-button'
import { EmptyState } from './empty-state'

const meta = {
  component: EmptyState,
  title: 'Shared UI/EmptyState',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof EmptyState>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'No articles yet',
    description:
      'В текущем content source пока нет опубликованных материалов для этого сценария.',
  },
}

export const WithAction: Story = {
  args: {
    title: 'Start with a search query',
    description: 'Введите запрос, чтобы найти материалы среди wiki и news.',
    action: <LinkButton href="#" variant="secondary">Open wiki</LinkButton>,
  },
}
