import type {
  Article,
  ArticleSummary,
  ContentId,
  Slug,
} from '@thematic-content-platform/content-domain'
import { mockArticles } from './mock/articles.js'

const toArticleSummary = ({
  id,
  slug,
  title,
  description,
  publishedAt,
  category,
  tags,
}: Article): ArticleSummary => ({
  id,
  slug,
  title,
  description,
  publishedAt,
  category,
  tags,
})

export const getArticles = (): ArticleSummary[] =>
  mockArticles
    .filter((article) => article.status === 'published')
    .map(toArticleSummary)

export const getArticleById = (id: ContentId): Article | undefined =>
  mockArticles.find((article) => article.id === id && article.status === 'published')

export const getArticleBySlug = (slug: Slug): Article | undefined =>
  mockArticles.find((article) => article.slug === slug && article.status === 'published')

export const getRelatedArticles = (articleId: ContentId): ArticleSummary[] => {
  const article = getArticleById(articleId)

  if (!article) {
    return []
  }

  const relatedArticleIds = new Set(
    article.related
      .filter((relation) => relation.targetType === 'article')
      .map((relation) => relation.targetId),
  )

  return getArticles().filter((relatedArticle) => relatedArticleIds.has(relatedArticle.id))
}