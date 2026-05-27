import type { Article } from '@thematic-content-platform/content-domain'

import { createTagQueries } from './tags'

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
    tags: [
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
    ],
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
    tags: [
      {
        id: 'tag-alien',
        slug: 'alien',
        title: 'Alien',
      },
      {
        id: 'tag-facehugger',
        slug: 'facehugger',
        title: 'Facehugger',
      },
    ],
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
    tags: [
      {
        id: 'tag-weyland-yutani',
        slug: 'weyland-yutani',
        title: 'Weyland-Yutani',
      },
    ],
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
    tags: [
      {
        id: 'tag-draft-only',
        slug: 'draft-only',
        title: 'Draft Only',
      },
    ],
    related: [],
  },
]

describe('tag queries', () => {
  const queries = createTagQueries(testArticles)

  describe('getTags', () => {
    it('returns unique tags from published articles', () => {
      const tags = queries.getTags()

      expect(tags).toHaveLength(4)

      expect(tags).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: 'tag-alien',
            slug: 'alien',
            title: 'Alien',
          }),
          expect.objectContaining({
            id: 'tag-xenomorph',
            slug: 'xenomorph',
            title: 'Xenomorph',
          }),
          expect.objectContaining({
            id: 'tag-facehugger',
            slug: 'facehugger',
            title: 'Facehugger',
          }),
          expect.objectContaining({
            id: 'tag-weyland-yutani',
            slug: 'weyland-yutani',
            title: 'Weyland-Yutani',
          }),
        ]),
      )
    })

    it('does not return tags from draft articles', () => {
      const tags = queries.getTags()

      expect(tags).not.toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: 'tag-draft-only',
          }),
        ]),
      )
    })
  })

  describe('getTagBySlug', () => {
    it('returns tag by slug', () => {
      const tag = queries.getTagBySlug('facehugger')

      expect(tag).toEqual(
        expect.objectContaining({
          id: 'tag-facehugger',
          slug: 'facehugger',
          title: 'Facehugger',
        }),
      )
    })

    it('returns undefined for unknown slug', () => {
      const tag = queries.getTagBySlug('unknown-tag')

      expect(tag).toBeUndefined()
    })

    it('does not return tag that only belongs to draft articles', () => {
      const tag = queries.getTagBySlug('draft-only')

      expect(tag).toBeUndefined()
    })
  })

  describe('getArticlesByTagSlug', () => {
    it('returns published article summaries by tag slug', () => {
      const articles = queries.getArticlesByTagSlug('alien')

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

    it('returns empty array for unknown tag slug', () => {
      const articles = queries.getArticlesByTagSlug('unknown-tag')

      expect(articles).toEqual([])
    })

    it('does not expose full article fields in tag article summaries', () => {
      const [article] = queries.getArticlesByTagSlug('alien')

      expect(article).not.toHaveProperty('body')
      expect(article).not.toHaveProperty('related')
      expect(article).not.toHaveProperty('status')
    })
  })
})
