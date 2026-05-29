import type { Tag } from '@thematic-content-platform/content-domain'
import type { Meta, StoryObj } from '@storybook/nextjs'

import { TagList } from './tag-list'

const mockTags: Tag[] = [
  {
    id: 'tag-nextjs',
    slug: 'nextjs',
    title: 'Next.js',
  },
  {
    id: 'tag-typescript',
    slug: 'typescript',
    title: 'TypeScript',
  },
  {
    id: 'tag-seo',
    slug: 'seo',
    title: 'SEO',
  },
]

const meta = {
  component: TagList,
  title: 'UI Kit/Primitives/TagList',
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof TagList>

export default meta

type Story = StoryObj<typeof meta>

export const CardPlacement: Story = {
  args: {
    tags: mockTags,
    placement: 'card',
    getTagHref: (tag) => `/wiki/tags/${tag.slug}`,
  },
}

export const DetailsPlacement: Story = {
  args: {
    tags: mockTags,
    placement: 'details',
    getTagHref: (tag) => `/wiki/tags/${tag.slug}`,
  },
}

export const WithoutLinks: Story = {
  args: {
    tags: mockTags,
    placement: 'card',
  },
}
