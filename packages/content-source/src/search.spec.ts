import type {
  Article,
  NewsItem,
} from '@thematic-content-platform/content-domain'

import { createSearchQueries } from './search'

const testArticles: Article[] = [
  {
    id: 'article-xenomorph',
    slug: 'xenomorph-life-cycle',
    title: 'Xenomorph life cycle',
    description: 'Article about facehugger and xenomorph lifecycle.',
    body: 'Article body',
    status: 'published',
    publishedAt: '2026-05-26T10:00:00.000Z',
    category: {
      id: 'category-xenomorphs',
      slug: 'xenomorphs',
      title: 'Xenomorphs',
    },
    tags: [
      {
        id: 'tag-facehugger',
        slug: 'facehugger',
        title: 'Facehugger',
      },
    ],
    related: [],
  },
  {
    id: 'article-draft',
    slug: 'draft-article',
    title: 'Draft article',
    description: 'Draft article description.',
    body: 'Draft body',
    status: 'draft',
    publishedAt: '2026-05-26T10:10:00.000Z',
    category: {
      id: 'category-drafts',
      slug: 'drafts',
      title: 'Drafts',
    },
    tags: [],
    related: [],
  },
]

const testNewsItems: NewsItem[] = [
  {
    id: 'news-platform',
    slug: 'platform-notes',
    title: 'Platform notes',
    description: 'News about second content type.',
    body: 'News body',
    status: 'published',
    publishedAt: '2026-05-27T10:00:00.000Z',
    category: {
      id: 'category-platform',
      slug: 'platform',
      title: 'Platform',
    },
    tags: [
      {
        id: 'tag-platform',
        slug: 'platform',
        title: 'Platform',
      },
    ],
    related: [],
  },
]

describe('search queries', () => {
  const queries = createSearchQueries({
    articles: testArticles,
    newsItems: testNewsItems,
  })

  it('returns empty array for empty query', () => {
    expect(queries.searchContent('')).toEqual([])
    expect(queries.searchContent('   ')).toEqual([])
  })

  it('searches articles by title', () => {
    expect(queries.searchContent('xenomorph')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'article-xenomorph',
          contentType: 'article',
        }),
      ]),
    )
  })

  it('searches news by title', () => {
    expect(queries.searchContent('platform')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'news-platform',
          contentType: 'news',
        }),
      ]),
    )
  })

  it('searches by tag title', () => {
    expect(queries.searchContent('facehugger')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'article-xenomorph',
        }),
      ]),
    )
  })

  it('does not return draft content', () => {
    expect(queries.searchContent('draft')).toEqual([])
  })

  it('sorts results by publication date descending', () => {
    const results = queries.searchContent('type')

    expect(results[0]).toEqual(
      expect.objectContaining({
        id: 'news-platform',
      }),
    )
  })
})
