import type { Meta, StoryObj } from '@storybook/nextjs'

import { TagList } from '../tag-list'
import { ContentPreviewCard } from './content-preview-card'

const meta = {
  component: ContentPreviewCard,
  title: 'Shared UI/ContentPreviewCard',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof ContentPreviewCard>

export default meta

type Story = StoryObj<typeof meta>

export const ArticlePreview: Story = {
  args: {
    title: 'Xenomorph life cycle',
    href: '#',
    description:
      'Overview of the parasite stages, host dependency and lifecycle progression in the demo content model.',
    header: (
      <>
        <span>Xenomorphs</span>
        <time dateTime="2026-05-01">May 1, 2026</time>
      </>
    ),
    footer: (
      <TagList
        placement="card"
        tags={[
          { id: 'tag-alien', slug: 'alien', title: 'Alien' },
          { id: 'tag-xenomorph', slug: 'xenomorph', title: 'Xenomorph' },
        ]}
      />
    ),
  },
}

export const NewsPreview: Story = {
  args: {
    title: 'Platform notes',
    href: '#',
    description:
      'Short news-format content preview that demonstrates a second content type on the same shared UI.',
    header: (
      <>
        <span>News</span>
        <time dateTime="2026-05-12">May 12, 2026</time>
      </>
    ),
    footer: (
      <TagList
        placement="card"
        tags={[
          { id: 'tag-platform', slug: 'platform', title: 'Platform' },
          { id: 'tag-demo', slug: 'demo', title: 'Demo' },
        ]}
      />
    ),
  },
}
