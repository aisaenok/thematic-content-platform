import type {
  Article,
  ArticleSummary,
  Slug,
  Tag,
} from '@thematic-content-platform/content-domain'

import { createArticleQueries } from './articles'
import { mockArticles } from './mock/articles'

const uniqueById = <T extends { id: string }>(items: T[]): T[] => {
  const map = new Map<string, T>()

  items.forEach((item) => {
    map.set(item.id, item)
  })

  return Array.from(map.values())
}

export const createTagQueries = (articles: Article[]) => {
  const articleQueries = createArticleQueries(articles)

  const getTags = (): Tag[] => {
    const tags = articleQueries
      .getArticles()
      .flatMap((article) => article.tags)

    return uniqueById(tags)
  }

  const getTagBySlug = (slug: Slug): Tag | undefined => {
    return getTags().find((tag) => tag.slug === slug)
  }

  const getArticlesByTagSlug = (slug: Slug): ArticleSummary[] => {
    return articleQueries
      .getArticles()
      .filter((article) => article.tags.some((tag) => tag.slug === slug))
  }

  return {
    getTags,
    getTagBySlug,
    getArticlesByTagSlug,
  }
}

export const { getTags, getTagBySlug, getArticlesByTagSlug } =
  createTagQueries(mockArticles)
