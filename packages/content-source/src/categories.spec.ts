import type { Article } from '@thematic-content-platform/content-domain'

import { createCategoryQueries } from './categories'

const testArticles: Article[] = [
  {
    id: 'article-published-1',
    slug: 'published-article-1',
    title: 'Published article 1',
    description: 'Published article 1 description',
    body: 'Published article 1 body',
    status: 'published',
    publishedAt: '2026-05-26T10:00:00.000Z',
    category: {
      id: 'category-xenomorphs',
      slug: 'xenomorphs',
      title: 'Xenomorphs',
      description: 'Xenomorph category description',
    },
    tags: [],
    related: [],
  },
  {
    id: 'article-published-2',
    slug: 'published-article-2',
    title: 'Published article 2',
    description: 'Published article 2 description',
    body: 'Published article 2 body',
    status: 'published',
    publishedAt: '2026-05-26T10:10:00.000Z',
    category: {
      id: 'category-xenomorphs',
      slug: 'xenomorphs',
      title: 'Xenomorphs',
      description: 'Xenomorph category description',
    },
    tags: [],
    related: [],
  },
  {
    id: 'article-published-3',
    slug: 'published-article-3',
    title: 'Published article 3',
    description: 'Published article 3 description',
    body: 'Published article 3 body',
    status: 'published',
    publishedAt: '2026-05-26T10:20:00.000Z',
    category: {
      id: 'category-alien-universe',
      slug: 'alien-universe',
      title: 'Alien Universe',
      description: 'Alien universe category description',
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
    publishedAt: '2026-05-26T10:30:00.000Z',
    category: {
      id: 'category-drafts',
      slug: 'drafts',
      title: 'Drafts',
      description: 'Draft category description',
    },
    tags: [],
    related: [],
  },
]

describe('category queries', () => {
  const queries = createCategoryQueries(testArticles)

  describe('getCategories', () => {
    it('returns unique categories from published articles', () => {
      const categories = queries.getCategories()

      expect(categories).toHaveLength(2)

      expect(categories).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: 'category-xenomorphs',
            slug: 'xenomorphs',
            title: 'Xenomorphs',
          }),
          expect.objectContaining({
            id: 'category-alien-universe',
            slug: 'alien-universe',
            title: 'Alien Universe',
          }),
        ]),
      )
    })

    it('does not return categories from draft articles', () => {
      const categories = queries.getCategories()

      expect(categories).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: 'category-drafts',
          }),
        ]),
      )
    })
  })

  describe('getCategoryBySlug', () => {
    it('returns category by slug', () => {
      const category = queries.getCategoryBySlug('xenomorphs')

      expect(category).toEqual(
        expect.objectContaining({
          id: 'category-xenomorphs',
          slug: 'xenomorphs',
          title: 'Xenomorphs',
        }),
      )
    })

    it('returns undefined for unknown slug', () => {
      const category = queries.getCategoryBySlug('unknown-category')

      expect(category).toBeUndefined()
    })

    it('does not return category that only belongs to draft articles', () => {
      const category = queries.getCategoryBySlug('drafts')

      expect(category).toBeUndefined()
    })
  })

  describe('getArticlesByCategorySlug', () => {
    it('returns published article summaries by category slug', () => {
      const articles = queries.getArticlesByCategorySlug('xenomorphs')

      expect(articles).toHaveLength(2)

      expect(articles).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: 'article-published-1',
            slug: 'published-article-1',
          }),
          expect.objectContaining({
            id: 'article-published-2',
            slug: 'published-article-2',
          }),
        ]),
      )
    })

    it('returns empty array for unknown category slug', () => {
      const articles = queries.getArticlesByCategorySlug('unknown-category')

      expect(articles).toEqual([])
    })

    it('does not expose full article fields in category article summaries', () => {
      const [article] = queries.getArticlesByCategorySlug('xenomorphs')

      expect(article).not.toHaveProperty('body')
      expect(article).not.toHaveProperty('related')
      expect(article).not.toHaveProperty('status')
    })
  })
})