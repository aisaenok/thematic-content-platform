import type {
  ContentId,
  NewsItem,
  NewsSummary,
  Slug,
} from '@thematic-content-platform/content-domain'

import { mockNewsItems } from './mock/news'

const toNewsSummary = ({
  id,
  slug,
  title,
  description,
  publishedAt,
  category,
  tags,
}: NewsItem): NewsSummary => ({
  id,
  slug,
  title,
  description,
  publishedAt,
  category,
  tags,
})

export const createNewsQueries = (newsItems: NewsItem[]) => {
  const getNewsItems = (): NewsSummary[] =>
    newsItems
      .filter((newsItem) => newsItem.status === 'published')
      .map(toNewsSummary)

  const getNewsItemById = (id: ContentId): NewsItem | undefined =>
    newsItems.find((newsItem) => newsItem.id === id && newsItem.status === 'published')

  const getNewsItemBySlug = (slug: Slug): NewsItem | undefined =>
    newsItems.find(
      (newsItem) => newsItem.slug === slug && newsItem.status === 'published',
    )

  const getRelatedNewsItems = (newsItemId: ContentId): NewsSummary[] => {
    const newsItem = getNewsItemById(newsItemId)

    if (!newsItem) {
      return []
    }

    const relatedNewsIds = new Set(
      newsItem.related
        .filter((relation) => relation.targetType === 'news')
        .map((relation) => relation.targetId),
    )

    return getNewsItems().filter((relatedNewsItem) =>
      relatedNewsIds.has(relatedNewsItem.id),
    )
  }

  return {
    getNewsItems,
    getNewsItemById,
    getNewsItemBySlug,
    getRelatedNewsItems,
  }
}

export const {
  getNewsItems,
  getNewsItemById,
  getNewsItemBySlug,
  getRelatedNewsItems,
} = createNewsQueries(mockNewsItems)
