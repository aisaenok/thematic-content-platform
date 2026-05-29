import type { Meta, StoryObj } from '@storybook/nextjs'

import { TagList } from '../tag-list'
import { ContentPreviewCard } from './content-preview-card'

const meta = {
  component: ContentPreviewCard,
  title: 'UI Kit/Content/ContentPreviewCard',
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof ContentPreviewCard>

export default meta

type Story = StoryObj<typeof meta>

export const ArticlePreview: Story = {
  args: {
    title: 'Typed content model overview',
    href: '#',
    description:
      'Preview card for a wiki-like article with summary copy, metadata header and tag footer.',
    header: (
      <>
        <span>Wiki article</span>
        <time dateTime="2026-05-01">May 1, 2026</time>
      </>
    ),
    footer: (
      <TagList
        placement="card"
        tags={[
          { id: 'tag-nextjs', slug: 'nextjs', title: 'Next.js' },
          { id: 'tag-typescript', slug: 'typescript', title: 'TypeScript' },
        ]}
      />
    ),
  },
}

export const NewsPreview: Story = {
  args: {
    title: 'Search indexing notes',
    href: '#',
    description:
      'Short news-format preview that demonstrates a second content type built on the same shared UI card.',
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
          { id: 'tag-search', slug: 'search', title: 'Search' },
          { id: 'tag-seo', slug: 'seo', title: 'SEO' },
        ]}
      />
    ),
  },
}

export const WithTags: Story = {
  args: {
    title: 'UI Kit showcase update',
    href: '#',
    description:
      'Example card with a denser tag footer to show how the shared preview layout handles multiple metadata labels.',
    header: (
      <>
        <span>Update</span>
        <time dateTime="2026-05-18">May 18, 2026</time>
      </>
    ),
    footer: (
      <TagList
        placement="card"
        tags={[
          { id: 'tag-ui-kit', slug: 'ui-kit', title: 'UI Kit' },
          { id: 'tag-storybook', slug: 'storybook', title: 'Storybook' },
          { id: 'tag-vercel', slug: 'vercel', title: 'Vercel' },
        ]}
      />
    ),
  },
}
