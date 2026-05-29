import type { Tag } from '@thematic-content-platform/content-domain'
import type { Meta, StoryObj } from '@storybook/nextjs'

import { TagList } from './tag-list'

const mockTags: Tag[] = [
  {
    id: 'tag-alien',
    slug: 'alien',
    title: 'Alien',
  },
  {
    id: 'tag-xenomorph',
    slug: 'xenomorph',
    title: 'Xenomorph',
  },
  {
    id: 'tag-facehugger',
    slug: 'facehugger',
    title: 'Facehugger',
  },
]

const meta = {
  component: TagList,
  title: 'Shared UI/TagList',
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
