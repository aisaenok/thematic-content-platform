import type {
  Article,
  ArticleSummary,
  Category,
  ContentId,
  NewsItem,
  NewsSummary,
  Slug,
  Tag,
} from '@thematic-content-platform/content-domain'

import type { ContentSearchResult } from './search'

export type ContentSource = {
  getArticles: () => ArticleSummary[]
  getArticleById: (id: ContentId) => Article | undefined
  getArticleBySlug: (slug: Slug) => Article | undefined
  getRelatedArticles: (articleId: ContentId) => ArticleSummary[]

  getCategories: () => Category[]
  getCategoryBySlug: (slug: Slug) => Category | undefined
  getArticlesByCategorySlug: (slug: Slug) => ArticleSummary[]

  getTags: () => Tag[]
  getTagBySlug: (slug: Slug) => Tag | undefined
  getArticlesByTagSlug: (slug: Slug) => ArticleSummary[]

  getNewsItems: () => NewsSummary[]
  getNewsItemById: (id: ContentId) => NewsItem | undefined
  getNewsItemBySlug: (slug: Slug) => NewsItem | undefined
  getRelatedNewsItems: (newsItemId: ContentId) => NewsSummary[]

  searchContent: (query: string) => ContentSearchResult[]
}
