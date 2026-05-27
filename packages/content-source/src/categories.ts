import type {
  Article,
  ArticleSummary,
  Category,
  Slug,
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

export const createCategoryQueries = (articles: Article[]) => {
  const articleQueries = createArticleQueries(articles)

  const getCategories = (): Category[] => {
    const categories = articleQueries
      .getArticles()
      .map((article) => article.category)

    return uniqueById(categories)
  }

  const getCategoryBySlug = (slug: Slug): Category | undefined => {
    return getCategories().find((category) => category.slug === slug)
  }

  const getArticlesByCategorySlug = (slug: Slug): ArticleSummary[] => {
    return articleQueries
      .getArticles()
      .filter((article) => article.category.slug === slug)
  }

  return {
    getCategories,
    getCategoryBySlug,
    getArticlesByCategorySlug,
  }
}

export const {
  getCategories,
  getCategoryBySlug,
  getArticlesByCategorySlug,
} = createCategoryQueries(mockArticles)