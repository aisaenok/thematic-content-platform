import type { ContentSource } from './content-source'
import { createArticleQueries } from './articles'
import { createCategoryQueries } from './categories'
import { mockArticles } from './mock/articles'
import { mockNewsItems } from './mock/news'
import { createNewsQueries } from './news'
import { createSearchQueries } from './search'
import { createTagQueries } from './tags'

const articleQueries = createArticleQueries(mockArticles)
const categoryQueries = createCategoryQueries(mockArticles)
const tagQueries = createTagQueries(mockArticles)
const newsQueries = createNewsQueries(mockNewsItems)
const searchQueries = createSearchQueries({
  articles: mockArticles,
  newsItems: mockNewsItems,
})

export const mockContentSource: ContentSource = {
  getArticles: articleQueries.getArticles,
  getArticleById: articleQueries.getArticleById,
  getArticleBySlug: articleQueries.getArticleBySlug,
  getRelatedArticles: articleQueries.getRelatedArticles,
  getCategories: categoryQueries.getCategories,
  getCategoryBySlug: categoryQueries.getCategoryBySlug,
  getArticlesByCategorySlug: categoryQueries.getArticlesByCategorySlug,
  getTags: tagQueries.getTags,
  getTagBySlug: tagQueries.getTagBySlug,
  getArticlesByTagSlug: tagQueries.getArticlesByTagSlug,
  getNewsItems: newsQueries.getNewsItems,
  getNewsItemById: newsQueries.getNewsItemById,
  getNewsItemBySlug: newsQueries.getNewsItemBySlug,
  getRelatedNewsItems: newsQueries.getRelatedNewsItems,
  searchContent: searchQueries.searchContent,
}
