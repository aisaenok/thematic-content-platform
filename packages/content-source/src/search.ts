import type {
  Article,
  ArticleSummary,
  Category,
  ContentId,
  ContentType,
  DateISOString,
  NewsItem,
  NewsSummary,
  Slug,
  Tag,
} from '@thematic-content-platform/content-domain'

import { createArticleQueries } from './articles'
import { mockArticles } from './mock/articles'
import { mockNewsItems } from './mock/news'
import { createNewsQueries } from './news'

export type ContentSearchResult = {
  id: ContentId
  contentType: Extract<ContentType, 'article' | 'news'>
  slug: Slug
  title: string
  description: string
  publishedAt: DateISOString
  category: Category
  tags: Tag[]
}

type CreateSearchQueriesParams = {
  articles: Article[]
  newsItems: NewsItem[]
}

const normalizeSearchValue = (value: string): string => {
  return value.trim().toLowerCase()
}

const getSearchableText = (result: ContentSearchResult): string => {
  return [
    result.title,
    result.description,
    result.category.title,
    result.category.slug,
    ...result.tags.map((tag) => tag.title),
    ...result.tags.map((tag) => tag.slug),
  ].join(' ')
}

const toArticleSearchResult = (
  article: ArticleSummary,
): ContentSearchResult => ({
  id: article.id,
  contentType: 'article',
  slug: article.slug,
  title: article.title,
  description: article.description,
  publishedAt: article.publishedAt,
  category: article.category,
  tags: article.tags,
})

const toNewsSearchResult = (newsItem: NewsSummary): ContentSearchResult => ({
  id: newsItem.id,
  contentType: 'news',
  slug: newsItem.slug,
  title: newsItem.title,
  description: newsItem.description,
  publishedAt: newsItem.publishedAt,
  category: newsItem.category,
  tags: newsItem.tags,
})

export const createSearchQueries = ({
  articles,
  newsItems,
}: CreateSearchQueriesParams) => {
  const articleQueries = createArticleQueries(articles)
  const newsQueries = createNewsQueries(newsItems)

  const searchContent = (query: string): ContentSearchResult[] => {
    const normalizedQuery = normalizeSearchValue(query)

    if (!normalizedQuery) {
      return []
    }

    const articleResults = articleQueries.getArticles().map(toArticleSearchResult)

    const newsResults = newsQueries.getNewsItems().map(toNewsSearchResult)

    return [...articleResults, ...newsResults]
      .filter((result) =>
        normalizeSearchValue(getSearchableText(result)).includes(normalizedQuery),
      )
      .sort(
        (left, right) =>
          new Date(right.publishedAt).getTime() -
          new Date(left.publishedAt).getTime(),
      )
  }

  return {
    searchContent,
  }
}

export const { searchContent } = createSearchQueries({
  articles: mockArticles,
  newsItems: mockNewsItems,
})
