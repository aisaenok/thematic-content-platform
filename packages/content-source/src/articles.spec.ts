import type { Article } from '@thematic-content-platform/content-domain'
import { createArticleQueries } from './articles'

const testArticles: Article[] = [
  {
    id: 'article-published',
    slug: 'published-article',
    title: 'Published article',
    description: 'Published article description',
    body: 'Published article body',
    status: 'published',
    publishedAt: '2026-05-26T10:00:00.000Z',
    category: {
      id: 'category-test',
      slug: 'test',
      title: 'Test',
    },
    tags: [],
    related: [
      {
        id: 'relation-to-related',
        targetId: 'article-related',
        targetSlug: 'related-article',
        targetType: 'article',
        title: 'Related article',
      },
    ],
  },
  {
    id: 'article-related',
    slug: 'related-article',
    title: 'Related article',
    description: 'Related article description',
    body: 'Related article body',
    status: 'published',
    publishedAt: '2026-05-26T10:10:00.000Z',
    category: {
      id: 'category-test',
      slug: 'test',
      title: 'Test',
    },
    tags: [],
    related: [],
  },
  {
    id: 'article-draft',
    slug: 'draft-article',
    title: 'Draft article',
    description: 'Draft article description',
    body: 'Draft article body',
    status: 'draft',
    publishedAt: '2026-05-26T10:20:00.000Z',
    category: {
      id: 'category-test',
      slug: 'test',
      title: 'Test',
    },
    tags: [],
    related: [],
  },
]

const queries = createArticleQueries(testArticles)

describe('article queries', () => {
  it('returns only published article summaries', () => {
    const articles = queries.getArticles()

    expect(articles).toHaveLength(2)
    expect(articles).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'article-published' }),
        expect.objectContaining({ id: 'article-related' }),
      ]),
    )
    expect(articles).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ id: 'article-draft' }),
      ]),
    )
  })

  it('does not expose full article fields in summaries', () => {
    const [article] = queries.getArticles()

    expect(article).not.toHaveProperty('body')
    expect(article).not.toHaveProperty('related')
    expect(article).not.toHaveProperty('status')
  })

  it('returns article by slug', () => {
    expect(queries.getArticleBySlug('published-article')).toEqual(
      expect.objectContaining({
        id: 'article-published',
      }),
    )
  })

  it('does not return draft article by slug', () => {
    expect(queries.getArticleBySlug('draft-article')).toBeUndefined()
  })

  it('returns related article summaries', () => {
    expect(queries.getRelatedArticles('article-published')).toEqual([
      expect.objectContaining({
        id: 'article-related',
        slug: 'related-article',
      }),
    ])
  })
})