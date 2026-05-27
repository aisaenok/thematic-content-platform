import type { NewsItem } from '@thematic-content-platform/content-domain'

import { createNewsQueries } from './news'

const testNewsItems: NewsItem[] = [
  {
    id: 'news-published',
    slug: 'published-news',
    title: 'Published news',
    description: 'Published news description',
    body: 'Published news body',
    status: 'published',
    publishedAt: '2026-05-27T09:00:00.000Z',
    category: {
      id: 'category-test',
      slug: 'test',
      title: 'Test',
    },
    tags: [],
    related: [
      {
        id: 'relation-to-related-news',
        targetId: 'news-related',
        targetSlug: 'related-news',
        targetType: 'news',
        title: 'Related news',
      },
      {
        id: 'relation-to-article',
        targetId: 'article-related',
        targetSlug: 'related-article',
        targetType: 'article',
        title: 'Related article',
      },
    ],
  },
  {
    id: 'news-related',
    slug: 'related-news',
    title: 'Related news',
    description: 'Related news description',
    body: 'Related news body',
    status: 'published',
    publishedAt: '2026-05-27T09:10:00.000Z',
    category: {
      id: 'category-test',
      slug: 'test',
      title: 'Test',
    },
    tags: [],
    related: [],
  },
  {
    id: 'news-draft',
    slug: 'draft-news',
    title: 'Draft news',
    description: 'Draft news description',
    body: 'Draft news body',
    status: 'draft',
    publishedAt: '2026-05-27T09:20:00.000Z',
    category: {
      id: 'category-test',
      slug: 'test',
      title: 'Test',
    },
    tags: [],
    related: [],
  },
]

const queries = createNewsQueries(testNewsItems)

describe('news queries', () => {
  it('returns only published news summaries', () => {
    const newsItems = queries.getNewsItems()

    expect(newsItems).toHaveLength(2)
    expect(newsItems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'news-published' }),
        expect.objectContaining({ id: 'news-related' }),
      ]),
    )
    expect(newsItems).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'news-draft' }),
      ]),
    )
  })

  it('does not expose full news fields in summaries', () => {
    const [newsItem] = queries.getNewsItems()

    expect(newsItem).not.toHaveProperty('body')
    expect(newsItem).not.toHaveProperty('related')
    expect(newsItem).not.toHaveProperty('status')
  })

  it('returns news item by id', () => {
    expect(queries.getNewsItemById('news-published')).toEqual(
      expect.objectContaining({
        id: 'news-published',
      }),
    )
  })

  it('returns news item by slug', () => {
    expect(queries.getNewsItemBySlug('published-news')).toEqual(
      expect.objectContaining({
        id: 'news-published',
      }),
    )
  })

  it('does not return draft news item by slug', () => {
    expect(queries.getNewsItemBySlug('draft-news')).toBeUndefined()
  })

  it('returns related news summaries', () => {
    expect(queries.getRelatedNewsItems('news-published')).toEqual([
      expect.objectContaining({
        id: 'news-related',
        slug: 'related-news',
      }),
    ])
  })
})
